import { Mixer } from 'webmixer';
import { Track } from 'webmixer';
export declare class MixerUI {
    mixer: Mixer;
    constructor(mixer: any);
    trackFromDescendent(el: any): Track;
    faderInputHandler(e: any): void;
    muteInputHandler(e: any): void;
    soloInputHandler(e: any): void;
    faderResetHandler(e: any): void;
    init(trackStrip: Element, trackTemplate: HTMLTemplateElement): void;
}
