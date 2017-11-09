
class EQ {
    constructor(opts) {
        this.opts = opts;
        this._hpfreq = new Parameter(
            opts.hpfreq || 0,
            this.applyHPFreq.bind(this)
        );
        this._lpfreq = new Parameter(
            opts.lpfreq || 22050,
            this.applyLPFreq.bind(this)
        );
    }

    createNodes(ac) {
        this.hpNode = ac.createBiquadFilter();
        this.lpNode = ac.createBiquadFilter();

        this.hpNode.type = "highpass";
        this.hpNode.frequency.value = 0;
        this.lpNode.type = "lowpass";
        this.lpNode.frequency.value = ac.sampleRate * 0.5;

        this.hpNode.connect(this.lpNode);

        let lastNode = this.lpNode;
        for (let band of this.opts.bands || []) {
            let bandNode = ac.createBiquadFilter();
            bandNode.type = band.type || "peaking";
            bandNode.frequency.value = band.freq || 1000;
            bandNode.q = band.q || 1;
            bandNode.gain.value = band.gain || 0;
            lastNode.connect(bandNode);
            lastNode = bandNode;
        }

        this._outputNode = lastNode;
    }

    get inputNode() { return this.hpNode; }
    get outputNode() { return this._outputNode; }

    get hpfreq() { return this._hpfreq; }
    applyHPFreq() {
        if (!this.hpNode) return;
        this.hpNode.frequency.value = this._hpfreq.value;
    }

    get lpfreq() { return this._lpfreq; }
    applyLPFreq() {
        if (!this.lpNode) return;
        this.lpNode.frequency.value = this._lpfreq.value;
    }
}
