import { dB_to_gain, gain_to_dB } from './util';

export class EQ {
    opts: any;
    inputNode: AudioNode;
    outputNode: AudioNode;

    bandNodes: BiquadFilterNode[];
    private makeupGainNode: GainNode;

    constructor(opts) {
        this.opts = opts;
    }

    applyOpts(opts) {
        this.opts = Object.assign(this.opts, opts);
    }

    createNodes(ac) {
        let inputNode = null;
        let outputNode = null;
        let bandNodes = [];

        for (let band of this.opts.bands || []) {
            let bandNode = ac.createBiquadFilter();
            bandNodes.push(bandNode);

            bandNode.type = band.type || "peaking";
            bandNode.frequency.value = band.freq;
            bandNode.Q.value = band.q || 0.666667;
            bandNode.gain.value = band.gain || 0;

            if (inputNode === null) {
                inputNode = bandNode;
            } else {
                outputNode.connect(bandNode);
            }
            outputNode = bandNode;
        }

        if (this.opts.makeupGain) {
            this.makeupGainNode = ac.createGain();
            this.makeupGainNode.gain.value = dB_to_gain(this.opts.makeupGain);
            if (outputNode) {
                outputNode.connect(this.makeupGainNode);
            }
            outputNode = this.makeupGainNode;
            if (inputNode === null) {
                inputNode = outputNode;
            }
        }

        this.inputNode = inputNode;
        this.outputNode = outputNode;
        this.bandNodes = bandNodes;
    }
}
