import { Readable } from "svelte/store";
import { AvailabilityStatus } from "@workadventure/messages";
import { MapStore } from "@workadventure/store-utils";
import { RoomConnection } from "../../Connection/RoomConnection";

export interface ChatUser {
    chatId: string;
    uuid?: string;
    availabilityStatus: Readable<AvailabilityStatus>;
    username: string | undefined;
    avatarUrl: string | undefined;
    roomName: string | undefined;
    playUri: string | undefined;
    isAdmin?: boolean;
    isMember?: boolean;
    visitCardUrl?: string;
    color: string | undefined;
    id: number | undefined;
}

export type PartialChatUser = Partial<ChatUser> & { chatId: string };

export type ChatRoomMembership = "ban" | "join" | "knock" | "leave" | "invite" | string;

export interface ChatRoom {
    readonly id: string;
    readonly name: Readable<string>;
    readonly type: "direct" | "multiple";
    readonly hasUnreadMessages: Readable<boolean>;
    readonly avatarUrl: string | undefined;
    readonly messages: Readable<readonly ChatMessage[]>;
    readonly messageReactions: MapStore<string, MapStore<string, ChatMessageReaction>>;
    readonly sendMessage: (message: string) => void;
    readonly sendFiles: (files: FileList) => Promise<void>;
    readonly myMembership: ChatRoomMembership;
    readonly setTimelineAsRead: () => void;
    readonly membersId: string[];
    readonly leaveRoom: () => Promise<void>;
    readonly joinRoom: () => Promise<void>;
    readonly hasPreviousMessage: Readable<boolean>;
    readonly loadMorePreviousMessages: () => Promise<void>;
    readonly isEncrypted: Readable<boolean>;
    readonly typingMembers: Readable<Array<{ id: string; name: string | null; avatarUrl: string | null }>>;
    readonly startTyping: () => Promise<object>;
    readonly stopTyping: () => Promise<object>;
    readonly isRoomFolder: boolean;
    readonly lastMessageTimestamp: number;
}

//Readonly attributes
export interface ChatMessage {
    id: string;
    sender: ChatUser | undefined;
    content: Readable<ChatMessageContent>;
    isMyMessage: boolean;
    isQuotedMessage: boolean | undefined;
    date: Date | null;
    quotedMessage: ChatMessage | undefined;
    type: ChatMessageType;
    remove: () => void;
    edit: (newContent: string) => Promise<void>;
    isDeleted: Readable<boolean>;
    isModified: Readable<boolean>;
    addReaction: (reaction: string) => Promise<void>;
}

export interface ChatMessageReaction {
    key: string;
    users: MapStore<string, ChatUser>;
    react: () => void;
    reacted: Readable<boolean>;
}

export type ChatMessageType = "proximity" | "text" | "incoming" | "outcoming" | "image" | "file" | "audio" | "video";
export type ChatMessageContent = {
    /**
     * The body can contain HTML. It will be run against DOMPurify before being outputted to the user.
     */
    body: string;
    url: string | undefined;
};
export const historyVisibilityOptions = ["world_readable", "joined", "invited"] as const;
export type historyVisibility = (typeof historyVisibilityOptions)[number];

export interface RoomFolder {
    id: string;
    name: Readable<string>;
    rooms: MapStore<ChatRoom["id"], ChatRoom>;
    folders: MapStore<RoomFolder["id"], RoomFolder>;
}

export interface CreateRoomOptions {
    name?: string;
    visibility?: "private" | "public" | "restricted";
    is_direct?: boolean;
    historyVisibility?: historyVisibility;
    invite?: { value: string; label: string }[];
    preset?: "private_chat" | "public_chat" | "trusted_private_chat";
    encrypt?: boolean;
    parentSpaceID?: string;
    description?: string;
}

export type ConnectionStatus = "ONLINE" | "ON_ERROR" | "CONNECTING" | "OFFLINE";

export type userId = number;
export type chatId = string;
export type ChatSpaceRoom = ChatRoom;
export interface ChatConnectionInterface {
    connectionStatus: Readable<ConnectionStatus>;
    directRooms: Readable<ChatRoom[]>;
    rooms: Readable<ChatRoom[]>;
    invitations: Readable<ChatRoom[]>;
    roomFolders: MapStore<RoomFolder["id"], RoomFolder>;
    createRoom: (roomOptions: CreateRoomOptions) => Promise<{ room_id: string }>;
    createFolder: (roomOptions: CreateRoomOptions) => Promise<{ room_id: string }>;
    createDirectRoom(userChatId: string): Promise<ChatRoom | undefined>;
    roomCreationInProgress: Readable<boolean>;
    getDirectRoomFor(uuserChatId: string): ChatRoom | undefined;
    searchAccessibleRooms(searchText: string): Promise<
        {
            id: string;
            name: string | undefined;
        }[]
    >;
    joinRoom(roomId: string): Promise<ChatRoom | undefined>;
    destroy(): Promise<void>;
    searchChatUsers(searchText: string): Promise<{ id: string; name: string | undefined }[] | undefined>;
    isEncryptionRequiredAndNotSet: Readable<boolean>;
    initEndToEndEncryption(): Promise<void>;
    isGuest: Readable<boolean>;
    hasUnreadMessages: Readable<boolean>;
    clearListener: () => void;
    directRoomsUsers: Readable<ChatUser[]>;
}

export type Connection = Pick<RoomConnection, "queryChatMembers" | "emitPlayerChatID" | "emitBanPlayerMessage">;
