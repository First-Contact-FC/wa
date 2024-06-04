import { Readable } from "svelte/store";
import { Space } from "../../Space/Space";
import { TrackWrapper } from "./TrackWrapper";
import { SpaceInterface } from "../../Space/SpaceInterface";

export interface BroadcastSpace {
    readonly provider: string;
    readonly space: SpaceInterface;
    readonly tracks: Readable<Map<string, TrackWrapper>>;
    destroy(): void;
}
