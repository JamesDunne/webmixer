export declare class GraphicEQ {
    opts: any;
    inputNode: AudioNode;
    outputNode: AudioNode;
    bandNodes: BiquadFilterNode[];
    private makeupGainNode;
    constructor(opts: any);
    applyOpts(opts: any): void;
    createNodes(ac: any): void;
}
