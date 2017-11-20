(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webmixer"] = factory();
	else
		root["webmixer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Convert from dB to gain multiplier:
    function dB_to_gain(dB) {
        return Math.pow(10.0, dB / 20.0);
    }
    exports.dB_to_gain = dB_to_gain;
    // Convert from gain multiplier to dB:
    function gain_to_dB(gain) {
        let sign = Math.sign(gain);
        let gain_abs = gain * sign;
        return 20.0 * Math.log10(gain) * sign;
    }
    exports.gain_to_dB = gain_to_dB;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parameter {
        constructor(value, applyFn) {
            if (!(applyFn instanceof Function))
                throw 'applyFn is not an instance of Function!';
            this.applyFn = applyFn;
            this._value = value;
            this._changed = [];
        }
        addChangedEvent(changedFn) {
            if (!(changedFn instanceof Function))
                throw 'changedFn is not an instance of Function!';
            this._changed.push(changedFn);
        }
        get value() { return this._value; }
        set value(value) {
            this._value = value;
            this.applyValue();
            this.fireEvent();
        }
        applyValue() {
            this.applyFn(this._value);
        }
        fireEvent() {
            for (let changedFn of this._changed) {
                changedFn(this._value);
            }
        }
    }
    exports.Parameter = Parameter;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1, parameter_1, eq_1, compressor_1, graphiceq_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Track {
        constructor(mixer, opts) {
            this.mixer = mixer;
            this.name = opts.name;
            this.channels = opts.channels || 1;
            this.opts = opts;
            this._soloMute = new parameter_1.Parameter(false, this.applySoloMute.bind(this));
            this._mute = new parameter_1.Parameter(opts.mute || false, this.applyMute.bind(this));
            this._solo = new parameter_1.Parameter(opts.solo || false, this.applySolo.bind(this));
            this._in_gain = new parameter_1.Parameter(opts.in_gain || 0, this.applyInGain.bind(this));
            this._eq = new eq_1.EQ(opts.eq || {});
            this._compressor = new compressor_1.Compressor(opts.compressor || {});
            this._graphiceq = new graphiceq_1.GraphicEQ(opts.graphiceq || {});
            this._pan = new parameter_1.Parameter(opts.pan || 0, this.applyPan.bind(this));
            this._level = new parameter_1.Parameter(opts.level || 0, this.applyLevel.bind(this));
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
                }
                else {
                    fxOutNode.connect(this._compressor.inputNode);
                }
                fxOutNode = this._compressor.outputNode;
            }
            if (this.opts.graphiceq) {
                this._graphiceq.createNodes(ac);
                if (fxInNode === null) {
                    fxInNode = this._graphiceq.inputNode;
                }
                else {
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
            }
            else {
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
        applyInGain() {
            if (!this.inGainNode)
                return;
            this.inGainNode.gain.value = util_1.dB_to_gain(this._in_gain.value);
        }
        get mute() { return this._mute; }
        applyMute() {
            if (!this.muteNode)
                return;
            if (this._solo.value) {
                this.muteNode.gain.value = 1;
                return;
            }
            this.muteNode.gain.value = this._mute.value ? 0 : 1;
        }
        get solo() { return this._solo; }
        applySolo() {
            if (!this.mixer)
                return;
            this.mixer.applySolo();
        }
        get soloMute() { return this._soloMute; }
        applySoloMute() {
            if (!this.soloMuteNode)
                return;
            if (this._solo.value) {
                this.muteNode.gain.value = 1;
            }
            else {
                this.applyMute();
            }
            this.soloMuteNode.gain.value = this._soloMute.value ? 0 : 1;
        }
        get eq() { return this._eq; }
        get compressor() { return this._compressor; }
        get graphiceq() { return this._graphiceq; }
        get pan() { return this._pan; }
        applyPan() {
            if (!this.pannerNode)
                return;
            this.pannerNode.pan.value = this._pan.value;
            this.applyLevel();
        }
        get level() { return this._level; }
        applyLevel() {
            if (!this.outGainNode)
                return;
            let dB = this._level.value;
            // Decrease apparent level depending on pan:
            dB += Math.abs(this._pan.value) * -6.0;
            this.outGainNode.gain.value = util_1.dB_to_gain(dB);
        }
    }
    exports.Track = Track;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(4), __webpack_require__(2), __webpack_require__(1), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, mixer_1, track_1, parameter_1, mixer_ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mixer = mixer_1.Mixer;
    exports.Track = track_1.Track;
    exports.Parameter = parameter_1.Parameter;
    exports.MixerUI = mixer_ui_1.MixerUI;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, track_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mixer {
        constructor() {
            this._master = new track_1.Track(this, { name: "MASTER" });
            this._tracks = [];
        }
        addTracks(trackOpts) {
            this._tracks = this._tracks.concat(trackOpts
                .filter(opts => opts.name !== "MASTER")
                .map(opts => new track_1.Track(this, opts)));
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
            }
            else {
                this._tracks.forEach(tr => tr.soloMute.value = false);
            }
        }
    }
    exports.Mixer = Mixer;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EQ {
        constructor(opts) {
            this.opts = opts;
            this.bandNodes = [];
        }
        applyOpts(opts) {
            this.opts = Object.assign(this.opts, opts);
        }
        createNodes(ac) {
            let inputNode = null;
            let outputNode = null;
            let bandNodes = [];
            for (let band of this.opts.bands || []) {
                let bandNode = ac.createBiquadFilter();
                bandNodes.push(bandNode);
                bandNode.type = band.type || "peaking";
                bandNode.frequency.value = band.freq;
                bandNode.Q.value = band.q || 0.666667;
                bandNode.gain.value = band.gain || 0;
                if (inputNode === null) {
                    inputNode = bandNode;
                }
                else {
                    outputNode.connect(bandNode);
                }
                outputNode = bandNode;
            }
            if (this.opts.makeupGain) {
                this.makeupGainNode = ac.createGain();
                this.makeupGainNode.gain.value = util_1.dB_to_gain(this.opts.makeupGain);
                if (outputNode) {
                    outputNode.connect(this.makeupGainNode);
                }
                outputNode = this.makeupGainNode;
                if (inputNode === null) {
                    inputNode = outputNode;
                }
            }
            this.inputNode = inputNode;
            this.outputNode = outputNode;
            this.bandNodes = bandNodes;
        }
        responseCurve(n) {
            //const n = 52 * 8;
            let resp = {
                freqs: new Float32Array(n),
                mag: new Float32Array(n),
                phase: new Float32Array(n)
            };
            let baseGain = util_1.dB_to_gain(this.opts.makeupGain);
            for (let i = 0; i < n; i++) {
                resp.freqs[i] = 20 * Math.pow(1000.0, i / (n - 1));
                resp.mag[i] = baseGain;
                resp.phase[i] = 1;
            }
            for (let bandNode of this.bandNodes) {
                let bandMag = new Float32Array(n);
                let bandPhase = new Float32Array(n);
                bandNode.getFrequencyResponse(resp.freqs, bandMag, bandPhase);
                for (let i = 0; i < n; i++) {
                    resp.mag[i] *= bandMag[i];
                    resp.phase[i] *= bandPhase[i];
                }
            }
            return resp;
        }
    }
    exports.EQ = EQ;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1, parameter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Compressor {
        constructor(opts) {
            this.opts = opts;
            this._threshold = new parameter_1.Parameter(opts.threshold || 0, (value) => {
                if (!this.compNode)
                    return;
                this.compNode.threshold.value = value;
            });
            this._ratio = new parameter_1.Parameter(opts.ratio || 0, (value) => {
                if (!this.compNode)
                    return;
                this.compNode.ratio.value = value;
            });
            this._knee = new parameter_1.Parameter(opts.knee || 0, (value) => {
                if (!this.compNode)
                    return;
                this.compNode.knee.value = value;
            });
            this._attack = new parameter_1.Parameter(opts.attack || 0, (value) => {
                if (!this.compNode)
                    return;
                this.compNode.attack.value = value;
            });
            this._release = new parameter_1.Parameter(opts.release || 0, (value) => {
                if (!this.compNode)
                    return;
                this.compNode.release.value = value;
            });
            this._makeupGain = new parameter_1.Parameter(opts.makeupGain || 0, (value) => {
                if (!this.makeupGainNode)
                    return;
                this.makeupGainNode.gain.value = util_1.dB_to_gain(value);
            });
        }
        applyOpts(opts) {
            this.opts = Object.assign(this.opts, opts);
            this.threshold.value = opts.threshold || this.threshold.value;
            this.ratio.value = opts.ratio || this.ratio.value;
            this.knee.value = opts.knee || this.knee.value;
            this.attack.value = opts.attack || this.attack.value;
            this.release.value = opts.release || this.release.value;
            this.makeupGain.value = opts.makeupGain || this.makeupGain.value;
        }
        createNodes(ac) {
            this.compNode = ac.createDynamicsCompressor();
            this.makeupGainNode = ac.createGain();
            this.compNode.connect(this.makeupGainNode);
            this.threshold.applyValue();
            this.ratio.applyValue();
            this.knee.applyValue();
            this.attack.applyValue();
            this.release.applyValue();
            this.makeupGain.applyValue();
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
            if (!this.compNode)
                return 0;
            return this.compNode.reduction;
        }
    }
    exports.Compressor = Compressor;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicEQ {
        constructor(opts) {
            this.opts = opts;
        }
        applyOpts(opts) {
            this.opts = Object.assign(this.opts, opts);
        }
        createNodes(ac) {
            let inputNode = null;
            let outputNode = null;
            let bandNodes = [];
            let bandCount = this.opts.bandCount || 16;
            if (bandCount < 1) {
                bandCount = 1;
            }
            let bands = this.opts.bands || [];
            let n = 0;
            let q = Math.log2(3);
            for (let gain of bands) {
                let bandNode = ac.createBiquadFilter();
                bandNodes.push(bandNode);
                bandNode.type = "peaking";
                bandNode.frequency.value = Math.pow(q, n) * 20;
                // see: http://www.rane.com/note101.html
                // Q = f / (f * Math.pow(2, 1/6) - f * Math.pow(2, -1/6))
                bandNode.Q.value = 4.318473046963146;
                bandNode.gain.value = gain;
                n++;
                if (inputNode === null) {
                    inputNode = bandNode;
                }
                else {
                    outputNode.connect(bandNode);
                }
                outputNode = bandNode;
            }
            if (this.opts.makeupGain) {
                this.makeupGainNode = ac.createGain();
                this.makeupGainNode.gain.value = util_1.dB_to_gain(this.opts.makeupGain);
                if (outputNode) {
                    outputNode.connect(this.makeupGainNode);
                }
                outputNode = this.makeupGainNode;
                if (inputNode === null) {
                    inputNode = outputNode;
                }
            }
            this.inputNode = inputNode;
            this.outputNode = outputNode;
            this.bandNodes = bandNodes;
        }
    }
    exports.GraphicEQ = GraphicEQ;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Define maximum gain at the top of the fader range [0..1]:
    const faderMaxGain = util_1.dB_to_gain(12);
    function gain_to_fader(gain) {
        let fader = Math.pow((6.0 * Math.log(gain) / Math.log(2.0) + 192.0) / 198.0, 8.0);
        return fader;
    }
    // Convert from dB to fader range [0..1]:
    function dB_to_fader(dB) {
        if (dB == -Infinity)
            return 0.0;
        let gain = util_1.dB_to_gain(dB) * 2.0 / faderMaxGain;
        return gain_to_fader(gain);
    }
    // Define a zero-value on the fader [0..1] scale:
    const faderZero = dB_to_fader(0);
    // Convert from fader range [0..1] to dB:
    function fader_to_dB(fader) {
        if (fader == 0.0)
            return -Infinity;
        if (Math.abs(fader - faderZero) < 1e-6)
            return 0;
        let gain = Math.exp(((Math.pow(fader, 1.0 / 8.0) * 198.0) - 192.0) / 6.0 * Math.log(2.0)) * faderMaxGain / 2.0;
        let dB = util_1.gain_to_dB(gain);
        return dB;
    }
    function withExactDigits(value, maxDigits) {
        let s = value.toPrecision(maxDigits);
        if (s == "-Infinity") {
            s = "-inf";
        }
        else {
            // Only show maxDigits total digits including 0s:
            let digits = 0, n = 0;
            for (let c of s) {
                if (c >= '0' && c <= '9') {
                    digits++;
                    if (digits >= maxDigits) {
                        s = s.slice(0, n + 1);
                        break;
                    }
                }
                n++;
            }
        }
        return s;
    }
    function levelFormat(dB) {
        return `${withExactDigits(dB, 3)} dB`;
    }
    class MixerUI {
        constructor(mixer) {
            this.mixer = mixer;
        }
        trackFromDescendent(el) {
            let trackEl = el.closest("div.track");
            let trackName = trackEl.getAttribute("data-track");
            let track = this.mixer.track(trackName);
            return track;
        }
        faderInputHandler(e) {
            let el = e.target;
            let track = this.trackFromDescendent(el);
            let fader = el.value;
            let dB = fader_to_dB(fader);
            track.level.value = dB;
        }
        muteInputHandler(e) {
            let el = e.target;
            let track = this.trackFromDescendent(el);
            let mute = el.checked;
            track.mute.value = mute;
        }
        soloInputHandler(e) {
            let el = e.target;
            let track = this.trackFromDescendent(el);
            let solo = el.checked;
            track.solo.value = solo;
        }
        faderResetHandler(e) {
            let el = e.target;
            let track = this.trackFromDescendent(el);
            track.level.value = 0;
        }
        init() {
            let faderInputHandler = this.faderInputHandler.bind(this);
            let faderResetHandler = this.faderResetHandler.bind(this);
            let muteInputHandler = this.muteInputHandler.bind(this);
            let soloInputHandler = this.soloInputHandler.bind(this);
            // Stamp template per each track:
            let trackTemplate = document.getElementById("trackTemplate");
            let trackStrip = document.querySelector(".webmixer .trackstrip");
            [...this.mixer.tracks, this.mixer.master].forEach(track => {
                // Clone template:
                const node = document.importNode(trackTemplate.content, true);
                // Set data-track attribute:
                const trackNode = node.querySelector("div.track");
                trackNode.setAttribute("data-track", track.name);
                // Set name label:
                const nameLabel = node.querySelector(".label span.name");
                nameLabel.innerText = track.name;
                // Calculate EQ response:
                const eqCanvas = node.querySelector(".eq canvas.eq-response");
                {
                    const n = 52 * 8;
                    function y(gain) {
                        return 312 - (gain_to_fader(gain) * 220.0);
                    }
                    function x(f) {
                        return Math.log(f / 20.0) / Math.log(1000) * (n - 1);
                    }
                    let eq = track.eq;
                    let resp = eq.responseCurve(n);
                    let ctx = eqCanvas.getContext("2d");
                    ctx.strokeStyle = '#555555';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(0, y(1));
                    ctx.lineTo(n, y(1));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x(20), 0);
                    ctx.lineTo(x(20), 312);
                    ctx.moveTo(x(200), 0);
                    ctx.lineTo(x(200), 312);
                    ctx.moveTo(x(2000), 0);
                    ctx.lineTo(x(2000), 312);
                    ctx.moveTo(x(20000), 0);
                    ctx.lineTo(x(20000), 312);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(-1, y(resp.mag[0]));
                    for (let i = 1; i < n; i++) {
                        ctx.lineTo(i, y(resp.mag[i]));
                    }
                    ctx.lineWidth = 8;
                    ctx.strokeStyle = '#ffffff';
                    ctx.stroke();
                }
                // Set level label:
                const levelLabel = node.querySelector(".label span.level");
                levelLabel.innerText = levelFormat(track.level.value);
                // Click level label to reset to 0:
                levelLabel.addEventListener("click", faderResetHandler);
                // Bind fader events:
                const faderNode = trackNode.querySelector(".fader input[type=range]");
                faderNode.min = '0.0';
                faderNode.max = '1.0';
                faderNode.valueAsNumber = dB_to_fader(track.level.value);
                faderNode.addEventListener("dblclick", faderResetHandler);
                faderNode.addEventListener("input", faderInputHandler);
                track.level.addChangedEvent((value) => {
                    faderNode.valueAsNumber = dB_to_fader(value);
                    levelLabel.innerText = levelFormat(value);
                });
                let muteNode = trackNode.querySelector(".mute.button input[type=checkbox]");
                muteNode.checked = track.mute.value;
                muteNode.addEventListener("change", muteInputHandler);
                track.mute.addChangedEvent((value) => {
                    muteNode.checked = value;
                });
                let soloNode = trackNode.querySelector(".solo.button input[type=checkbox]");
                soloNode.checked = track.solo.value;
                soloNode.addEventListener("change", soloInputHandler);
                track.solo.addChangedEvent((value) => {
                    soloNode.checked = value;
                });
                trackStrip.appendChild(node);
            });
        }
    }
    exports.MixerUI = MixerUI;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
});