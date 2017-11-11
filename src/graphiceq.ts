
export class GraphicEQ {
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

        let bandCount = this.opts.bandCount || 16;
        if (bandCount < 1) {
            bandCount = 1;
        }

        let bands = this.opts.bands || [];
        let n = 0;
        let q = Math.log2(3);

        for (let gain of bands) {
            let bandNode = ac.createBiquadFilter();
            bandNodes.push(bandNode);

            bandNode.type = "peaking";
            bandNode.frequency.value = Math.pow(q, n) * 20;
            // see: http://www.rane.com/note101.html
            // Q = f / (f * Math.pow(2, 1/6) - f * Math.pow(2, -1/6))
            bandNode.Q.value = 4.318473046963146;
            bandNode.gain.value = gain;

            n++;

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
