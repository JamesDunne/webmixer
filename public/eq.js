
class EQ {
    constructor(opts) {
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
    }

    get inputNode() { return this.hpNode; }
    get outputNode() { return this.lpNode; }

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
