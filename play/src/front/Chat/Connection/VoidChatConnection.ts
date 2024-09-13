import { readable, Readable, writable } from "svelte/store";
import { MapStore } from "@workadventure/store-utils";
import { AvailabilityStatus } from "@workadventure/messages";
import {
    ChatConnectionInterface,
    ChatRoom,
    CreateRoomOptions,
    RoomFolder,
    ConnectionStatus,
    ChatUser,
} from "./ChatConnection";

export class VoidChatConnection implements ChatConnectionInterface {
    directRoomsUsers: Readable<ChatUser[]> = readable([]);
    connectionStatus: Readable<ConnectionStatus> = writable("OFFLINE");
    directRooms: Readable<ChatRoom[]> = writable([]);
    rooms: Readable<ChatRoom[]> = writable([]);
    invitations: Readable<ChatRoom[]> = writable([]);
    roomFolders: MapStore<RoomFolder["id"], RoomFolder> = new MapStore();
    roomCreationInProgress: Readable<boolean> = writable(false);
    isEncryptionRequiredAndNotSet: Readable<boolean> = writable(false);
    isGuest: Readable<boolean> = writable(false);
    hasUnreadMessages: Readable<boolean> = writable(false);

    createRoom(roomOptions: CreateRoomOptions): Promise<{ room_id: string }> {
        throw new Error("VoidChatConnection: createRoom is not implemented.");
    }

    createFolder(roomOptions: CreateRoomOptions): Promise<{ room_id: string }> {
        throw new Error("VoidChatConnection: createFolder is not implemented.");
    }

    createDirectRoom(userChatId: string): Promise<ChatRoom | undefined> {
        throw new Error("VoidChatConnection: createDirectRoom is not implemented.");
    }

    getDirectRoomFor(userChatId: string): ChatRoom | undefined {
        return undefined;
    }

    searchAccessibleRooms(searchText: string): Promise<{ id: string; name: string | undefined }[]> {
        return Promise.resolve([]);
    }

    joinRoom(roomId: string): Promise<ChatRoom | undefined> {
        return Promise.resolve(undefined);
    }

    destroy(): Promise<void> {
        return Promise.resolve();
    }

    searchChatUsers(searchText: string): Promise<{ id: string; name: string | undefined }[] | undefined> {
        return Promise.resolve(undefined);
    }

    initEndToEndEncryption(): Promise<void> {
        return Promise.resolve();
    }

    setPresence(status: AvailabilityStatus): void {}
    clearListener(): void {}
}
