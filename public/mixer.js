class Mixer {
    constructor() {
        this._tracks = [];
        this._level = 0;
    }

    addTracks(trackOpts) {
        this._tracks = this._tracks.concat(trackOpts.map(opts => new Track(this, opts)));
    }

    createNodes(ac) {
        this.gainNode = ac.createGain();

        this.setLevel();
    }

    get inputNode() {
        return this.gainNode;
    }

    get outputNode() {
        return this.gainNode;
    }

    get tracks() {
        return this._tracks;
    }

    get anySoloedTracks() {
        return this._tracks.some(tr => tr.solo);
    }

    get unsoloedTracks() {
        return this._tracks.filter(tr => !tr.solo);
    }

    get soloedTracks() {
        return this._tracks.filter(tr => tr.solo);
    }

    applySolo() {
        if (this.anySoloedTracks) {
            this.unsoloedTracks.forEach(tr => tr.soloMute = true);
            this.soloedTracks.forEach(tr => tr.soloMute = false);
        } else {
            this._tracks.forEach(tr => tr.soloMute = false);
        }
    }

    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        this.setLevel();
    }
    setLevel() {
        if (!this.gainNode) return;
        let dB = this._level;
        this.gainNode.gain.value = Math.pow(10.0, dB / 20.0);
    }
}
