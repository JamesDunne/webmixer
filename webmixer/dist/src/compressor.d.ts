import { Parameter } from './parameter';
export declare class Compressor {
    opts: any;
    _threshold: Parameter;
    _ratio: Parameter;
    _knee: Parameter;
    _attack: Parameter;
    _release: Parameter;
    _makeupGain: Parameter;
    private compNode;
    private makeupGainNode;
    constructor(opts: any);
    applyOpts(opts: any): void;
    createNodes(ac: any): void;
    readonly inputNode: DynamicsCompressorNode;
    readonly outputNode: GainNode;
    readonly threshold: Parameter;
    readonly ratio: Parameter;
    readonly knee: Parameter;
    readonly attack: Parameter;
    readonly release: Parameter;
    readonly makeupGain: Parameter;
    readonly gainReduction: number;
}
