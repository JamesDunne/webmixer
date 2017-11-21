import { Mixer } from 'webmixer';
export declare class MixerUI {
    mixer: Mixer;
    constructor(mixer: any);
    trackFromDescendent(el: any): any;
    faderInputHandler(e: any): void;
    muteInputHandler(e: any): void;
    soloInputHandler(e: any): void;
    faderResetHandler(e: any): void;
    init(): void;
}
