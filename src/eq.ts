import { dB_to_gain, gain_to_dB } from './util';

export class EQ {
    opts: any;
    inputNode: AudioNode;
    outputNode: AudioNode;

    bandNodes: BiquadFilterNode[];
    private makeupGainNode: GainNode;

    private freqs: Float32Array;
    private magResponse: Float32Array;
    private phaseResponse: Float32Array;

    constructor(opts) {
        this.opts = opts;
        this.bandNodes = [];
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

    get responseFreqs(): Float32Array {
        if (this.freqs) return this.freqs;
        return this.freqs;
    }

    responseCurve(n: number): {freqs: Float32Array; mag: Float32Array; phase: Float32Array} {
        //const n = 52 * 8;
        let resp = {
            freqs: new Float32Array(n),
            mag: new Float32Array(n),
            phase: new Float32Array(n)
        };

        for (let i = 0; i < n; i++) {
            resp.freqs[i] = 20 * Math.pow(1000.0, i / n);
            resp.mag[i] = 1;
            resp.phase[i] = 1;
        }

        for (let bandNode of this.bandNodes) {
            let bandMag = new Float32Array(n);
            let bandPhase = new Float32Array(n);
            bandNode.getFrequencyResponse(resp.freqs, bandMag, bandPhase);

            for (let i = 0; i < n; i++) {
                resp.mag[i] *= bandMag[i];
                resp.phase[i] *= bandPhase[i];
            }
        }

        return resp;
    }
}
