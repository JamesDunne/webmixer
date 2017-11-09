
class Track {
    constructor(mixer, opts) {
        this.mixer = mixer;
        this.name = opts.name;
        this.channels = opts.channels || 1;

        this.opts = opts;

        this._soloMute = new Parameter(
            false,
            this.applySoloMute.bind(this)
        );
        this._mute = new Parameter(
            opts.mute || false,
            this.applyMute.bind(this)
        );
        this._solo = new Parameter(
            opts.solo || false,
            this.applySolo.bind(this)
        );
        this._in_gain = new Parameter(
            opts.in_gain || 0,
            this.applyInGain.bind(this)
        );
        this._eq = new EQ(opts.eq || {});
        this._pan = new Parameter(
            opts.pan || 0,
            this.applyPan.bind(this)
        );
        this._level = new Parameter(
            opts.level || 0,
            this.applyLevel.bind(this)
        );
    }

    createNodes(ac /*: AudioContext */) {
        // Create default nodes:
        this.soloMuteNode = ac.createGain();
        this.muteNode = ac.createGain();
        this.inGainNode = ac.createGain();
        this.pannerNode = ac.createStereoPanner();
        this.outGainNode = ac.createGain();

        // Create nodes for FX:
        this._eq.createNodes(ac);

        // Connect nodes:
        this.soloMuteNode.connect(this.muteNode);
        this.muteNode.connect(this.inGainNode);
        this.inGainNode.connect(this._eq.inputNode);
        this._eq.outputNode.connect(this.pannerNode);
        this.pannerNode.connect(this.outGainNode);

        // Set properties:
        this.applySoloMute();
        this.applyMute();
        this.applyInGain();
        this.applyPan();
        this.applyLevel();
    }

    get inputNode() { return this.soloMuteNode; }
    get outputNode() { return this.outGainNode; }

    get inGain() { return this._in_gain; }
    applyInGain()  {
        if (!this.inGainNode) return;
        this.inGainNode.gain.value = dB_to_gain(this._in_gain.value);
    }

    get mute() { return this._mute; }
    applyMute() {
        if (!this.muteNode) return;
        if (this._solo.value) {
            this.muteNode.gain.value = 1;
            return;
        }
        this.muteNode.gain.value = this._mute.value ? 0 : 1;
    }

    get solo() { return this._solo; }
    applySolo() {
        if (!this.mixer) return;
        this.mixer.applySolo();
    }

    get soloMute() { return this._soloMute; }
    applySoloMute() {
        if (!this.soloMuteNode) return;
        if (this._solo.value) {
            this.muteNode.gain.value = 1;
        } else {
            this.applyMute();
        }
        this.soloMuteNode.gain.value = this._soloMute.value ? 0 : 1;
    }

    get eq() { return this._eq; }

    get pan() { return this._pan; }
    applyPan() {
        if (!this.pannerNode) return;
        this.pannerNode.pan.value = this._pan.value;
        this.applyLevel();
    }

    get level() { return this._level; }
    applyLevel() {
        if (!this.outGainNode) return;
        let dB = this._level.value;
        // Decrease apparent level depending on pan:
        dB += Math.abs(this._pan.value) * -6.0;
        this.outGainNode.gain.value = dB_to_gain(dB);
    }
}
