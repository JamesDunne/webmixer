class Track {
    constructor(mixer, opts) {
        this.mixer = mixer;
        this.name = opts.name;
        this.channels = opts.channels || 1;
        this._pan = opts.pan || 0;
        this._level = opts.level || 0;
        this._mute = opts.mute || false;
        this._solo = opts.solo || false;
        this._soloMute = false;
    }

    createNodes(ac /*: AudioContext */) {
        // Create default nodes:
        this.soloMuteNode = ac.createGain();
        this.muteNode = ac.createGain();
        this.pannerNode = ac.createStereoPanner();
        this.gainNode = ac.createGain();

        // Connect nodes:
        this.soloMuteNode.connect(this.muteNode);
        this.muteNode.connect(this.pannerNode);
        this.pannerNode.connect(this.gainNode);

        // Set properties:
        this.setSoloMute();
        this.setMute();
        this.setPan();
        this.setLevel();
    }

    get inputNode() {
        return this.soloMuteNode;
    }

    get outputNode() {
        return this.gainNode;
    }

    get pan() {
        return this._pan;
    }
    set pan(value) {
        this._pan = value;
        this.setPan();
    }
    setPan() {
        this.pannerNode.pan.value = this._pan;
        this.setLevel();
    }

    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        this.setLevel();
    }
    setLevel() {
        let dB = this._level;
        // Decrease apparent level depending on pan:
        dB += Math.abs(this._pan) * -6.0;
        this.gainNode.gain.value = Math.pow(10.0, dB / 20.0);
    }

    get mute() {
        return this._mute;
    }
    set mute(value) {
        this._mute = value;
        this.setMute();
    }
    setMute() {
        this.muteNode.gain.value = this._mute ? 0 : 1;
    }

    get solo() {
        return this._solo;
    }
    set solo(value) {
        this._solo = value;
        this.mixer.applySolo();
    }

    get soloMute() {
        return this._soloMute;
    }
    set soloMute(value) {
        this._soloMute = value;
        this.setSoloMute();
    }
    setSoloMute() {
        this.soloMuteNode.gain.value = this._soloMute ? 0 : 1;
    }
}
