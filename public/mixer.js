class Mixer {
    constructor() {
        this._master = new Track(this, {name:"MASTER", level_offset: 6});
        this._tracks = [];
    }

    addTracks(trackOpts) {
        this._tracks = this._tracks.concat(trackOpts.map(opts => new Track(this, opts)));
    }

    createNodes(ac) {
        this.master.createNodes(ac);

        // Connect mixer master out to destination:
        mixer.master.outputNode.connect(ac.destination);

        // Create track FX chains:
        for (let track of this._tracks) {
            track.createNodes(ac);
        }
    }

    track(name) {
        if (name == "MASTER") {
            return this.master;
        }
        return this._tracks.find(tr => tr.name == name);
    }

    get master() {
        return this._master;
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
}
