import { Mixer, Track, EQ } from 'webmixer';
export declare class MixerUI {
    mixer: Mixer;
    constructor(mixer: any);
    trackFromDescendent(el: any): Track;
    faderInputHandler(e: any): void;
    panInputHandler(e: any): void;
    muteInputHandler(e: any): void;
    soloInputHandler(e: any): void;
    faderResetHandler(e: any): void;
    panResetHandler(e: any): void;
    renderEQCurve(eq: EQ, eqCanvas: HTMLCanvasElement): void;
    init(trackStrip: Element, trackTemplate: HTMLTemplateElement): void;
}
