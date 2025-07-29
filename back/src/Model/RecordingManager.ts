import {SpaceUser} from "@workadventure/messages";
import {ICommunicationManager} from "./Interfaces/ICommunicationManager";
import {ICommunicationSpace} from "./Interfaces/ICommunicationSpace";
import {ICommunicationState, IRecordableState} from "./Interfaces/ICommunicationState";
import {LivekitState} from "./States/LivekitState";
import * as Sentry from "@sentry/node";

export interface IRecordingManager {
    startRecording(user: SpaceUser, userUuid: string): Promise<void>;
    stopRecording(user: SpaceUser): Promise<void>;
    handleAddUser(user: SpaceUser): void;
    handleRemoveUser(user: SpaceUser): Promise<void>;
    isRecording: boolean;
    destroy(): void;
}

export class RecordingManager implements IRecordingManager {
    private _isRecording: boolean = false;
    private _user: SpaceUser | undefined;
    // private _pendingRecording: boolean = false;


    constructor(private readonly communicationManager: ICommunicationManager, private readonly space: ICommunicationSpace) {}

    public async startRecording(user: SpaceUser, userUuid: string): Promise<void> {
        console.log("➡️➡️➡️ RecordingManager.ts => startRecording()", user);
        if (this._isRecording) {
            throw new Error("Recording already started");
        }
        this._isRecording = true;
        const currentState = this.communicationManager.currentState;
        this._user = user;


        if (this.isRecordableState(currentState)) {
            // L'état actuel peut enregistrer, lancer directement
            await this.executeRecording(currentState, user, userUuid);
        } else {
            // L'état actuel ne peut pas enregistrer, switch vers LiveKit
            await this.switchToLivekitAndRecord(user, userUuid);
        }

        // if (this.isRecordableState(currentState)) {
        //     await currentState.handleStartRecording();
        // } else {
        //     // If the current state is not recordable, switch to LivekitState
        //     console.log("🍪🍪🍪 Switching to LivekitState for recording");
        //     const livekitState = new LivekitState(this.space, this.communicationManager);
        //     this.communicationManager.setState(livekitState);
        //     try {
        //         this.communicationManager.currentState
        //         setTimeout(async () => {
        //             await livekitState.handleStartRecording();
        //         }, 5000);
        //     } catch (error) {
        //         console.error("❌ RecordingManager.ts => startRecording() - Error starting recording: ", error);
        //         throw error; // Re-throw the error to be handled by the caller
        //     }
        // }

        this._isRecording = true;
    }

    private async executeRecording(recordableState: IRecordableState, user: SpaceUser, userUuid: string): Promise<void> {
        try {
            this._isRecording = true;
            await recordableState.handleStartRecording(user, userUuid);
            console.log("✅ Recording started successfully");
        } catch (error) {
            this._isRecording = false;
            this._user = undefined;
            console.error("❌ RecordingManager.ts => executeRecording() - Error starting recording: ", error);
            throw error;
        }
    }

    private async switchToLivekitAndRecord(user: SpaceUser, userUuid: string): Promise<void> {
        console.log("🍪🍪🍪 Switching to LivekitState for recording");

        // Marquer qu'on a un enregistrement en attente
        // this._pendingRecording = true;


        const livekitState = await LivekitState.create(this.space, this.communicationManager) // await is for roomcreation
        // const livekitState = new LivekitState(this.space, this.communicationManager);
        this.communicationManager.setState(livekitState);

        livekitState.handleUserAdded(user);

        const allUsers = this.space.getAllUsers();
        allUsers.forEach(spaceUser => {
            if (spaceUser.spaceUserId !== user.spaceUserId) {
                livekitState.handleUserAdded(spaceUser);
            }
        });


        await this.executeRecording(livekitState, user, userUuid);

        // Attendre la fin du switch et lancer l'enregistrement
        // setTimeout(async () => {
        //     if (this._pendingRecording && this._user) {
        //         try {
        //             await this.executeRecording(livekitState, user, userUuid);
        //         } catch (error) {
        //             console.error("❌ Error starting recording after switch: ", error);
        //             throw error;
        //         } finally {
        //             this._pendingRecording = false;
        //         }
        //     }
        // }, 6000);
        // Délai légèrement supérieur au timeout du switch
    }

    public async stopRecording(user: SpaceUser): Promise<void> {
        if (!this._isRecording) {
            console.warn("No recording is currently active.");
            // this._pendingRecording = false;
            // throw new Error("No recording to stop");
        }

        if (this._user?.spaceUserId !== user.spaceUserId) {
            console.log("this._user", this._user, "user", user);
            // throw new Error("User is not the one recording");
        }

        const currentState = this.communicationManager.currentState;

        if (this.isRecordableState(currentState)) {
            await currentState.handleStopRecording();
        }

        this._isRecording = false;
        this._user = undefined;
        // this._pendingRecording = false;
    }

    public handleAddUser(user: SpaceUser): void {
        if(!this._isRecording) {
            return;
        }
        //TODO : send event to the space to notify that a user has been added to the recording
        //this.space.dispatchPrivateEvent(
//
        //      )
    }

    public async handleRemoveUser(user: SpaceUser): Promise<void> {
        if (!this._isRecording) {
            return;
        }

        if (this._user === user) {
            console.log("🐞🐞🐞 User left the recording, stopping recording for user:", user);
            //TODO : stop recording if the user is the one recording
            await this.stopRecording(user);
            this.space.dispatchPrivateEvent({
                spaceName: this.space.getSpaceName(),
                senderUserId: user.spaceUserId,
                receiverUserId: user.spaceUserId,
                spaceEvent: {
                    event: {
                        $case: "stopRecordingResultMessage",
                        stopRecordingResultMessage: {
                            success: true,
                        },
                    },
                },
            })

        }
    }

    public get isRecording(): boolean {
        return this._isRecording;
    }

    public destroy(): void {
        if(this._isRecording && this._user) {
            this.stopRecording(this._user).catch((error) => {
                console.error(error);
                Sentry.captureException(error);
            });
        }
    }

    //TODO : voir si on a un autre moyen de faire ça
    private isRecordableState(state: ICommunicationState): state is IRecordableState {
        return 'handleStartRecording' in state && 'handleStopRecording' in state;
    }
}