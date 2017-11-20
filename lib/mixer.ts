import { Track } from './track';

export class Mixer {
    _master: Track;
    _tracks: Track[];

    constructor() {
        this._master = new Track(this, {name: "MASTER"});
        this._tracks = [];
    }

    addTracks(trackOpts) {
        this._tracks = this._tracks.concat(
            trackOpts
                .filter(opts => opts.name !== "MASTER")
                .map(opts => new Track(this, opts))
        );
    }

    createNodes(ac) {
        // Create master track:
        this.master.createNodes(ac);

        // Connect tracks to master input:
        for (let track of this._tracks) {
            // Create track FX chain:
            track.createNodes(ac);
            // Connect track FX chain to master track's input:
            track.outputNode.connect(this.master.inputNode);
        }

        // Connect mixer master out to destination:
        this.master.outputNode.connect(ac.destination);

        // Initialize solo/mute for all tracks:
        this.applySolo();
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
        return this._tracks.some(tr => tr.solo.value);
    }

    get unsoloedTracks() {
        return this._tracks.filter(tr => !tr.solo.value);
    }

    get soloedTracks() {
        return this._tracks.filter(tr => tr.solo.value);
    }

    applySolo() {
        if (this.anySoloedTracks) {
            this.unsoloedTracks.forEach(tr => tr.soloMute.value = true);
            this.soloedTracks.forEach(tr => tr.soloMute.value = false);
        } else {
            this._tracks.forEach(tr => tr.soloMute.value = false);
        }
    }
}
