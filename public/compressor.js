
class Compressor {
    constructor(opts) {
        this.opts = opts;

        this._threshold = new Parameter(
            opts.threshold || 0,
            (value) => {
                if (!this.compNode) return;
                this.compNode.threshold.value = value;
            }
        );

        this._ratio = new Parameter(
            opts.ratio || 0,
            (value) => {
                if (!this.compNode) return;
                this.compNode.ratio.value = value;
            }
        );

        this._knee = new Parameter(
            opts.knee || 0,
            (value) => {
                if (!this.compNode) return;
                this.compNode.knee.value = value;
            }
        );

        this._attack = new Parameter(
            opts.attack || 0,
            (value) => {
                if (!this.compNode) return;
                this.compNode.attack.value = value;
            }
        );

        this._release = new Parameter(
            opts.release || 0,
            (value) => {
                if (!this.compNode) return;
                this.compNode.release.value = value;
            }
        );

        this._makeupGain = new Parameter(
            opts.makeupGain || 0,
            (value) => {
                if (!this.makeupGainNode) return;
                this.makeupGainNode.gain.value = dB_to_gain(value);
            }
        );
    }

    createNodes(ac) {
        this.compNode = ac.createDynamicsCompressor();
        this.makeupGainNode = ac.createGain();

        this.compNode.connect(this.makeupGainNode);
    }

    get inputNode() { return this.compNode; }
    get outputNode() { return this.makeupGainNode; }

    get threshold() { return this._threshold; }
    get ratio() { return this._ratio; }
    get knee() { return this._knee; }
    get attack() { return this._attack; }
    get release() { return this._release; }
    get makeupGain() { return this._makeupGain; }

    get gainReduction() {
        if (!this.compNode) return 0;
        return gain_to_dB(1.0 - this.compNode.reduction);
    }

}
