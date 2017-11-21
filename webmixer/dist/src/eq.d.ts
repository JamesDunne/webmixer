export declare class EQ {
    opts: any;
    inputNode: AudioNode;
    outputNode: AudioNode;
    bandNodes: BiquadFilterNode[];
    private makeupGainNode;
    private freqs;
    private magResponse;
    private phaseResponse;
    constructor(opts: any);
    applyOpts(opts: any): void;
    createNodes(ac: any): void;
    responseCurve(n: number): {
        freqs: Float32Array;
        mag: Float32Array;
        phase: Float32Array;
    };
}
