class Mixer {
    constructor() {
        this._master = new Track(this, {name:"MASTER"});
        this._tracks = [];
    }

    addTracks(trackOpts) {
        this._tracks = this._tracks.concat(trackOpts.map(opts => new Track(this, opts)));
    }

    createNodes(ac) {
        this.master.createNodes(ac);
        // Connect mixer master out to destination:
        mixer.master.outputNode.connect(ac.destination);
    }

    track(name) {
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
