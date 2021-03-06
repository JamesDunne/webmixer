import { dB_to_gain, gain_to_dB } from './util';
import { Parameter } from './parameter';
import { Mixer } from './mixer';
import { EQ } from './eq';
import { Compressor } from './compressor';
import { GraphicEQ } from './graphiceq';

export class Track {
    private mixer: Mixer;
    name: string;
    channels: number;
    opts: any;

    private _soloMute: Parameter;
    private _mute: Parameter;
    private _solo: Parameter;
    private _in_gain: Parameter;
    _eq: EQ;
    _compressor: Compressor;
    _graphiceq: GraphicEQ;
    private _pan: Parameter;
    private _level: Parameter;

    private soloMuteNode: GainNode;
    private muteNode: GainNode;
    private inGainNode: GainNode;
    private pannerNode: StereoPannerNode;
    private outGainNode: GainNode;

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
        this._compressor = new Compressor(opts.compressor || {});
        this._graphiceq = new GraphicEQ(opts.graphiceq || {});
        this._pan = new Parameter(
            opts.pan || 0,
            this.applyPan.bind(this)
        );
        this._level = new Parameter(
            opts.level || 0,
            this.applyLevel.bind(this)
        );
    }

    applyOpts(opts) {
        this.opts = Object.assign(this.opts, opts);

        this.mute.value = opts.mute || this.mute.value;
        this.solo.value = opts.solo || this.solo.value;
        this.inGain.value = opts.in_gain || this.inGain.value;
        this.eq.applyOpts(opts.eq || {});
        this.compressor.applyOpts(opts.compressor || {});
        this.graphiceq.applyOpts(opts.graphiceq || {});
        this.pan.value = opts.pan || this.pan.value;
        this.level.value = opts.level || this.level.value;
    }

    createNodes(ac /*: AudioContext */) {
        // Create default nodes:
        this.soloMuteNode = ac.createGain();
        this.muteNode = ac.createGain();
        this.inGainNode = ac.createGain();
        this.pannerNode = ac.createStereoPanner();
        this.outGainNode = ac.createGain();

        // Connect optional components:
        let fxInNode = null;
        let fxOutNode = null;
        if (this.opts.eq) {
            this._eq.createNodes(ac);
            fxInNode = this._eq.inputNode;
            fxOutNode = this._eq.outputNode;
        }
        if (this.opts.compressor) {
            this._compressor.createNodes(ac);
            if (fxInNode === null) {
                fxInNode = this._compressor.inputNode;
            } else {
                fxOutNode.connect(this._compressor.inputNode);
            }
            fxOutNode = this._compressor.outputNode;
        }
        if (this.opts.graphiceq) {
            this._graphiceq.createNodes(ac);
            if (fxInNode === null) {
                fxInNode = this._graphiceq.inputNode;
            } else {
                fxOutNode.connect(this._graphiceq.inputNode);
            }
            fxOutNode = this._graphiceq.outputNode;
        }

        // Connect nodes:
        this.soloMuteNode.connect(this.muteNode);
        this.muteNode.connect(this.inGainNode);
        if (fxInNode !== null) {
            this.inGainNode.connect(fxInNode);
            fxOutNode.connect(this.pannerNode);
        } else {
            this.inGainNode.connect(this.pannerNode);
        }
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
    get compressor() { return this._compressor; }
    get graphiceq() { return this._graphiceq; }

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
