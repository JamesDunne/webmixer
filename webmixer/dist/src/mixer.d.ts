import { Track } from './track';
export declare class Mixer {
    _master: Track;
    _tracks: Track[];
    constructor();
    addTracks(trackOpts: any): void;
    createNodes(ac: any): void;
    track(name: any): Track;
    readonly master: Track;
    readonly tracks: Track[];
    readonly anySoloedTracks: boolean;
    readonly unsoloedTracks: Track[];
    readonly soloedTracks: Track[];
    applySolo(): void;
}
