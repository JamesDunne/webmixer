/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, mixer_1, mixer_ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Create an AudioContext:
    let ac = new AudioContext();
    // Create a mixer:
    let mixer = new mixer_1.Mixer();
    // Find our <audio> element:
    let mcAudio = document.getElementById("mc");
    let mcSource = ac.createMediaElementSource(mcAudio);
    mcSource.channelCountMode = "explicit";
    mcSource.channelInterpretation = "discrete";
    let mix = {
        "sourceChannels": 12,
        "master": {
            "_graphiceq": {
                "bands": [
                    0,
                    0,
                    0,
                    0.9,
                    2.3,
                    3.5,
                    5.1,
                    5.1,
                    5.1,
                    5.0,
                    3.5,
                    1.5,
                    0.7,
                    1.7,
                    2.3,
                    2.1
                ],
                "makeupGain": -3.6
            },
            "level": 0
        },
        "tracks": [
            {
                "name": "V:MG",
                "eq": {
                    "bands": [
                        { "freq": 130, "type": "highpass" },
                        { "freq": 160.000000, "gain": -4.000000, "q": 1.038889 },
                        { "freq": 400.000000, "gain": -7.730000, "q": 0.804624 },
                        { "freq": 1885.148165, "gain": -3.720486, "q": 1.060028 },
                        { "freq": 11132.201691, "gain": -2.802494, "q": 0.805152 },
                        { "freq": 9600, "type": "lowpass" }
                    ],
                    "makeupGain": 5.8
                },
                "compressor": {
                    "threshold": -46.2,
                    "ratio": 1.6,
                    "knee": 1.7,
                    "attack": 0.0290,
                    "release": 0.051,
                    "makeupGain": 2.8
                },
                "pan": 0,
                "level": -8.36
            },
            {
                "name": "V:JD",
                "eq": {
                    "bands": [
                        { "freq": 130, "type": "highpass" },
                        { "freq": 248.346574, "gain": -5.458722, "q": 0.936074 },
                        { "freq": 643.564086, "gain": -6.877929, "q": 0.666667 },
                        { "freq": 2198.262516, "gain": -2.016344, "q": 1.060028 },
                        { "freq": 12536.231766, "gain": -2.660482, "q": 0.805152 },
                        { "freq": 9600, "type": "lowpass" }
                    ],
                    "makeupGain": 5.8
                },
                "compressor": {
                    "threshold": -32.9,
                    "ratio": 1.6,
                    "knee": 6.1,
                    "attack": 0.0123,
                    "release": 0.050,
                    "makeupGain": 0
                },
                "pan": 0.33,
                "level": -6.51
            },
            {
                "name": "G:MG",
                "eq": {
                    "bands": [
                        { "freq": 2325.930000, "gain": -4.171299, "q": 2.641279 },
                        { "freq": 5000.000000, "gain": 5.945587, "q": 1.629548, "type": "highshelf" }
                    ],
                    "makeupGain": 3
                },
                "pan": -0.8,
                "level": -0.75
            },
            {
                "name": "G:JD",
                "eq": {
                    "bands": [
                        { "freq": 2325.930000, "gain": -4.171299, "q": 2.641279 },
                        { "freq": 5000.000000, "gain": 5.945587, "q": 1.629548, "type": "highshelf" }
                    ],
                    "makeupGain": 3
                },
                "pan": 0.8,
                "level": -0.75
            },
            {
                "name": "Bass",
                "eq": {
                    "bands": [
                        { "freq": 44.564004, "type": "highpass" },
                        { "freq": 433.695077, "gain": -12.218957, "q": 0.507461 },
                        { "freq": 974.520551, "gain": 0.262902, "q": 0.688007 },
                        { "freq": 1902.596919, "type": "lowpass" }
                    ],
                    "makeupGain": 3.7
                },
                "compressor": {
                    "threshold": -37.5,
                    "ratio": 1.8,
                    "knee": 1.8,
                    "attack": 0.0112,
                    "release": 0.050,
                    "makeupGain": -2
                },
                "level": -4.5
            },
            {
                "name": "D:Kick",
                "eq": {
                    "bands": [
                        { "freq": 110, "type": "highpass" },
                        { "freq": 133.249144, "gain": -3.972947, "q": 1.591894 },
                        { "freq": 544.818606, "gain": -15.543725, "q": 0.445548 },
                        { "freq": 4179.056143, "gain": 4.475110, "q": 0.666667 },
                        { "freq": 11689.377266, "q": 0.919136, "type": "lowpass" }
                    ],
                    "makeupGain": 7.5
                },
                "compressor": {
                    "threshold": -34,
                    "ratio": 3.8,
                    "knee": 0,
                    "attack": 0.0103,
                    "release": 0.026,
                    "makeupGain": -3
                },
                "level": 1.47
            },
            {
                "name": "D:Snare",
                "eq": {
                    "bands": [
                        { "freq": 125.1, "type": "highpass" },
                        { "freq": 260.211802, "gain": -3.480312, "q": 2.160295 },
                        { "freq": 612.205273, "gain": -10.888889, "q": 0.553803 },
                        { "freq": 6625.783413, "gain": 3.733333, "q": 0.666667 }
                    ],
                    "makeupGain": 7
                },
                "compressor": {
                    "threshold": -36.3,
                    "ratio": 3.3,
                    "knee": 0,
                    "attack": 0.0087,
                    "release": 0.056,
                    "makeupGain": -4.5
                },
                "level": -0.62
            },
            {
                "name": "D:HighTom",
                "eq": {
                    "bands": [
                        { "freq": 126.736086, "type": "highpass" },
                        { "freq": 340.029120, "gain": -5.889247, "q": 3.678489 },
                        { "freq": 584.497208, "gain": -11.619048, "q": 0.381231 },
                        { "freq": 9992.460613, "type": "lowpass" }
                    ],
                    "makeupGain": 6.4
                },
                "compressor": {
                    "threshold": -27.9,
                    "ratio": 2.0,
                    "knee": 0,
                    "attack": 0.0096,
                    "release": 0.052,
                    "makeupGain": -4.5
                },
                "pan": -0.4,
                "level": -0.8
            },
            {
                "name": "D:FloorTom",
                "eq": {
                    "bands": [
                        { "freq": 127.130927, "type": "highpass" },
                        { "freq": 280.321665, "gain": -6.771389, "q": 3.123048 },
                        { "freq": 486.251757, "gain": -10.666667, "q": 0.381231 },
                        { "freq": 9224.637955, "type": "lowpass" }
                    ],
                    "makeupGain": 6.4
                },
                "compressor": {
                    "threshold": -27.9,
                    "ratio": 2.0,
                    "knee": 0,
                    "attack": 0.0096,
                    "release": 0.052,
                    "makeupGain": -4.5
                },
                "pan": 0.6,
                "level": -0.8
            },
            {
                "name": "D:OH",
                "channels": 2,
                "eq": {
                    "bands": [
                        { "freq": 148.939075, "type": "highpass" },
                        { "freq": 405.545780, "gain": -12.566784, "q": 0.452873 },
                        { "freq": 1838.969275, "gain": -7.406309, "q": 1.110336 },
                        { "freq": 15481.902444, "type": "lowpass" }
                    ],
                    "makeupGain": 7.8
                },
                "compressor": {
                    "threshold": -36.8,
                    "ratio": 1.8,
                    "knee": 0,
                    "attack": 0.0018,
                    "release": 0.274,
                    "makeupGain": -2.0
                },
                "level": -14.4
            }
        ],
        "songs": [
            "basket-case.opus"
        ]
    };
    // Set master track properties:
    if (mix.master) {
        mixer.master.applyOpts(mix.master);
    }
    // Add default tracks to mixer:
    mixer.addTracks(mix.tracks);
    // Bind mixer to AudioContext:
    mixer.createNodes(ac);
    // Initialize mixer UI:
    new mixer_ui_1.MixerUI(mixer).init();
    // TODO: would be nice to detect channel count from source.
    let splitter = ac.createChannelSplitter(mix.sourceChannels);
    try {
        // For older spec implementations:
        splitter.channelCountMode = "max";
    }
    catch (e) {
        splitter.channelCountMode = "explicit";
    }
    splitter.channelInterpretation = "discrete";
    mcSource.connect(splitter);
    // Split multichannel audio source into stereo/mono tracks:
    let c = 0;
    for (let track of mixer.tracks) {
        // Connect media output to track input:
        let merger = ac.createChannelMerger(2);
        merger.channelCountMode = "explicit";
        merger.channelInterpretation = "discrete";
        if (track.channels == 2) {
            // Assume stereo, so copy left/right channels independently:
            splitter.connect(merger, c++, 0);
            splitter.connect(merger, c++, 1);
        }
        else {
            // Assume mono, so copy single input channel to both output channels:
            splitter.connect(merger, c, 0);
            splitter.connect(merger, c, 1);
            c++;
        }
        merger.connect(track.inputNode);
    }
    mcAudio.src = mix.songs[0];
    mcAudio.loop = true;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
//mcAudio.play();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, track_1) {
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EQ {
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
    // Convert from dB to fader range [0..1]:
    function dB_to_fader(dB) {
        if (dB == -Infinity)
            return 0.0;
        let gain = util_1.dB_to_gain(dB) * 2.0 / faderMaxGain;
        let fader = Math.pow((6.0 * Math.log(gain) / Math.log(2.0) + 192.0) / 198.0, 8.0);
        return fader;
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
            let trackStrip = document.querySelector(".mixer .trackstrip");
            [...this.mixer.tracks, this.mixer.master].forEach(track => {
                // Clone template:
                const node = document.importNode(trackTemplate.content, true);
                // Set data-track attribute:
                const trackNode = node.querySelector("div.track");
                trackNode.setAttribute("data-track", track.name);
                // Set name label:
                const nameLabel = node.querySelector(".label span.name");
                nameLabel.innerText = track.name;
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
                let muteNode = trackNode.querySelector(".mute-button input[type=checkbox]");
                muteNode.checked = track.mute.value;
                muteNode.addEventListener("change", muteInputHandler);
                track.mute.addChangedEvent((value) => {
                    muteNode.checked = value;
                });
                let soloNode = trackNode.querySelector(".solo-button input[type=checkbox]");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDhjNTdjNDYxZDMxZGM4YjY1OTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYWNrLnRzIiwid2VicGFjazovLy8uL3NyYy9lcS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcHJlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhpY2VxLnRzIiwid2VicGFjazovLy8uL3NyYy9taXhlci11aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7SUM1REEsc0NBQXNDO0lBQ3RDLG9CQUEyQixFQUFFO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUZELGdDQUVDO0lBRUQsc0NBQXNDO0lBQ3RDLG9CQUEyQixJQUFJO1FBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0Is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LENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDakMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksUUFBUSxHQUFxQixTQUFTLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQzlGLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDakMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUVILFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQ0o7SUF0R0QsMEJBc0dDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkOGM1N2M0NjFkMzFkYzhiNjU5MSIsIlxuLy8gQ29udmVydCBmcm9tIGRCIHRvIGdhaW4gbXVsdGlwbGllcjpcbmV4cG9ydCBmdW5jdGlvbiBkQl90b19nYWluKGRCKSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDEwLjAsIGRCIC8gMjAuMCk7XG59XG5cbi8vIENvbnZlcnQgZnJvbSBnYWluIG11bHRpcGxpZXIgdG8gZEI6XG5leHBvcnQgZnVuY3Rpb24gZ2Fpbl90b19kQihnYWluKSB7XG4gICAgbGV0IHNpZ24gPSBNYXRoLnNpZ24oZ2Fpbik7XG4gICAgbGV0IGdhaW5fYWJzID0gZ2FpbiAqIHNpZ247XG4gICAgcmV0dXJuIDIwLjAgKiBNYXRoLmxvZzEwKGdhaW4pICogc2lnbjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLnRzIiwiXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVyIHtcbiAgICBhcHBseUZuOiAodmFsdWU6YW55KSA9PiB2b2lkO1xuICAgIF92YWx1ZTogYW55O1xuICAgIF9jaGFuZ2VkOiAoKHZhbHVlOmFueSkgPT4gdm9pZClbXTtcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBhcHBseUZuKSB7XG4gICAgICAgIGlmICghKGFwcGx5Rm4gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHRocm93ICdhcHBseUZuIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBGdW5jdGlvbiEnO1xuICAgICAgICB0aGlzLmFwcGx5Rm4gPSBhcHBseUZuO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gW107XG4gICAgfVxuXG4gICAgYWRkQ2hhbmdlZEV2ZW50KGNoYW5nZWRGbikge1xuICAgICAgICBpZiAoIShjaGFuZ2VkRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHRocm93ICdjaGFuZ2VkRm4gaXMgbm90IGFuIGluc3RhbmNlIG9mIEZ1bmN0aW9uISc7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQucHVzaChjaGFuZ2VkRm4pO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudCgpO1xuICAgIH1cblxuICAgIGFwcGx5VmFsdWUoKSB7XG4gICAgICAgIHRoaXMuYXBwbHlGbih0aGlzLl92YWx1ZSk7XG4gICAgfVxuXG4gICAgZmlyZUV2ZW50KCkge1xuICAgICAgICBmb3IgKGxldCBjaGFuZ2VkRm4gb2YgdGhpcy5fY2hhbmdlZCkge1xuICAgICAgICAgICAgY2hhbmdlZEZuKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYXJhbWV0ZXIudHMiLCJpbXBvcnQgeyBNaXhlciB9IGZyb20gJy4vbWl4ZXInO1xyXG5pbXBvcnQgeyBNaXhlclVJIH0gZnJvbSAnLi9taXhlci11aSc7XHJcblxyXG4vLyBDcmVhdGUgYW4gQXVkaW9Db250ZXh0OlxyXG5sZXQgYWMgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcblxyXG4vLyBDcmVhdGUgYSBtaXhlcjpcclxubGV0IG1peGVyID0gbmV3IE1peGVyKCk7XHJcblxyXG4vLyBGaW5kIG91ciA8YXVkaW8+IGVsZW1lbnQ6XHJcbmxldCBtY0F1ZGlvID0gPEhUTUxNZWRpYUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtY1wiKTtcclxubGV0IG1jU291cmNlID0gYWMuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKG1jQXVkaW8pO1xyXG5tY1NvdXJjZS5jaGFubmVsQ291bnRNb2RlID0gXCJleHBsaWNpdFwiO1xyXG5tY1NvdXJjZS5jaGFubmVsSW50ZXJwcmV0YXRpb24gPSBcImRpc2NyZXRlXCI7XHJcblxyXG5sZXQgbWl4ID0ge1xyXG4gICAgXCJzb3VyY2VDaGFubmVsc1wiOiAxMixcclxuICAgIFwibWFzdGVyXCI6IHtcclxuICAgICAgICBcIl9ncmFwaGljZXFcIjoge1xyXG4gICAgICAgICAgICBcImJhbmRzXCI6IFtcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAuOSxcclxuICAgICAgICAgICAgICAgIDIuMyxcclxuICAgICAgICAgICAgICAgIDMuNSxcclxuICAgICAgICAgICAgICAgIDUuMSxcclxuICAgICAgICAgICAgICAgIDUuMSxcclxuICAgICAgICAgICAgICAgIDUuMSxcclxuICAgICAgICAgICAgICAgIDUuMCxcclxuICAgICAgICAgICAgICAgIDMuNSxcclxuICAgICAgICAgICAgICAgIDEuNSxcclxuICAgICAgICAgICAgICAgIDAuNyxcclxuICAgICAgICAgICAgICAgIDEuNyxcclxuICAgICAgICAgICAgICAgIDIuMyxcclxuICAgICAgICAgICAgICAgIDIuMVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogLTMuNlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJsZXZlbFwiOiAwXHJcbiAgICB9LFxyXG4gICAgXCJ0cmFja3NcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiVjpNR1wiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMzAsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxNjAuMDAwMDAwLCBcImdhaW5cIjotNC4wMDAwMDAsIFwicVwiOjEuMDM4ODg5fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NDAwLjAwMDAwMCwgXCJnYWluXCI6LTcuNzMwMDAwLCBcInFcIjowLjgwNDYyNH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE4ODUuMTQ4MTY1LCBcImdhaW5cIjotMy43MjA0ODYsIFwicVwiOjEuMDYwMDI4fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTExMzIuMjAxNjkxLCBcImdhaW5cIjotMi44MDI0OTQsIFwicVwiOjAuODA1MTUyfSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6OTYwMCwgXCJ0eXBlXCI6IFwibG93cGFzc1wifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiA1LjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC00Ni4yLFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAxLjYsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMS43LFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMjkwLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDUxLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDIuOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhblwiOiAwLFxyXG4gICAgICAgICAgICBcImxldmVsXCI6IC04LjM2XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlY6SkRcIixcclxuICAgICAgICAgICAgXCJlcVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhbmRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTMwLCBcInR5cGVcIjogXCJoaWdocGFzc1wifSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MjQ4LjM0NjU3NCwgXCJnYWluXCI6LTUuNDU4NzIyLCBcInFcIjowLjkzNjA3NH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjY0My41NjQwODYsIFwiZ2FpblwiOi02Ljg3NzkyOSwgXCJxXCI6MC42NjY2Njd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoyMTk4LjI2MjUxNiwgXCJnYWluXCI6LTIuMDE2MzQ0LCBcInFcIjoxLjA2MDAyOH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEyNTM2LjIzMTc2NiwgXCJnYWluXCI6LTIuNjYwNDgyLCBcInFcIjowLjgwNTE1Mn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjk2MDAsIFwidHlwZVwiOiBcImxvd3Bhc3NcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogNS44XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcHJlc3NvclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRocmVzaG9sZFwiOiAtMzIuOSxcclxuICAgICAgICAgICAgICAgIFwicmF0aW9cIjogMS42LFxyXG4gICAgICAgICAgICAgICAgXCJrbmVlXCI6IDYuMSxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDEyMyxcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjA1MCxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFuXCI6IDAuMzMsXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTYuNTFcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiRzpNR1wiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoyMzI1LjkzMDAwMCwgXCJnYWluXCI6LTQuMTcxMjk5LCBcInFcIjoyLjY0MTI3OX0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjUwMDAuMDAwMDAwLCBcImdhaW5cIjo1Ljk0NTU4NywgXCJxXCI6MS42Mjk1NDgsIFwidHlwZVwiOlwiaGlnaHNoZWxmXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYW5cIjogLTAuOCxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMC43NVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJHOkpEXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjIzMjUuOTMwMDAwLCBcImdhaW5cIjotNC4xNzEyOTksIFwicVwiOjIuNjQxMjc5fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NTAwMC4wMDAwMDAsIFwiZ2FpblwiOjUuOTQ1NTg3LCBcInFcIjoxLjYyOTU0OCwgXCJ0eXBlXCI6XCJoaWdoc2hlbGZcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhblwiOiAwLjgsXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTAuNzVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiQmFzc1wiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0NC41NjQwMDQsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0MzMuNjk1MDc3LCBcImdhaW5cIjotMTIuMjE4OTU3LCBcInFcIjowLjUwNzQ2MX0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjk3NC41MjA1NTEsIFwiZ2FpblwiOjAuMjYyOTAyLCBcInFcIjowLjY4ODAwN30sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE5MDIuNTk2OTE5LCBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDMuN1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTM3LjUsXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDEuOCxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAxLjgsXHJcbiAgICAgICAgICAgICAgICBcImF0dGFja1wiOiAwLjAxMTIsXHJcbiAgICAgICAgICAgICAgICBcInJlbGVhc2VcIjogMC4wNTAsXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogLTJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtNC41XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkQ6S2lja1wiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMTAsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMzMuMjQ5MTQ0LCBcImdhaW5cIjotMy45NzI5NDcsIFwicVwiOjEuNTkxODk0fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NTQ0LjgxODYwNiwgXCJnYWluXCI6LTE1LjU0MzcyNSwgXCJxXCI6MC40NDU1NDh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0MTc5LjA1NjE0MywgXCJnYWluXCI6NC40NzUxMTAsIFwicVwiOjAuNjY2NjY3fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTE2ODkuMzc3MjY2LCBcInFcIjogMC45MTkxMzYsICBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDcuNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTM0LFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAzLjgsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDEwMyxcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjAyNixcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxldmVsXCI6IDEuNDdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiRDpTbmFyZVwiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMjUuMSwgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjI2MC4yMTE4MDIsIFwiZ2FpblwiOi0zLjQ4MDMxMiwgXCJxXCI6Mi4xNjAyOTV9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo2MTIuMjA1MjczLCBcImdhaW5cIjotMTAuODg4ODg5LCBcInFcIjowLjU1MzgwM30sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjY2MjUuNzgzNDEzLCBcImdhaW5cIjozLjczMzMzMywgXCJxXCI6MC42NjY2Njd9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC0zNi4zLFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAzLjMsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDA4NyxcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjA1NixcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtNC41XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTAuNjJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiRDpIaWdoVG9tXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEyNi43MzYwODYsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjozNDAuMDI5MTIwLCBcImdhaW5cIjotNS44ODkyNDcsIFwicVwiOjMuNjc4NDg5fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NTg0LjQ5NzIwOCwgXCJnYWluXCI6LTExLjYxOTA0OCwgXCJxXCI6MC4zODEyMzF9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo5OTkyLjQ2MDYxMywgXCJ0eXBlXCI6IFwibG93cGFzc1wifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiA2LjRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC0yNy45LFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAyLjAsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDA5NixcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjA1MixcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtNC41XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFuXCI6IC0wLjQsXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTAuOFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJEOkZsb29yVG9tXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEyNy4xMzA5MjcsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoyODAuMzIxNjY1LCBcImdhaW5cIjotNi43NzEzODksIFwicVwiOjMuMTIzMDQ4fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NDg2LjI1MTc1NywgXCJnYWluXCI6LTEwLjY2NjY2NywgXCJxXCI6MC4zODEyMzF9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo5MjI0LjYzNzk1NSwgXCJ0eXBlXCI6IFwibG93cGFzc1wifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiA2LjRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC0yNy45LFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAyLjAsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDA5NixcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjA1MixcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtNC41XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFuXCI6IDAuNixcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMC44XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkQ6T0hcIixcclxuICAgICAgICAgICAgXCJjaGFubmVsc1wiOiAyLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxNDguOTM5MDc1LCBcInR5cGVcIjogXCJoaWdocGFzc1wifSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NDA1LjU0NTc4MCwgXCJnYWluXCI6LTEyLjU2Njc4NCwgXCJxXCI6MC40NTI4NzN9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxODM4Ljk2OTI3NSwgXCJnYWluXCI6LTcuNDA2MzA5LCBcInFcIjoxLjExMDMzNn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE1NDgxLjkwMjQ0NCwgXCJ0eXBlXCI6IFwibG93cGFzc1wifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiA3LjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC0zNi44LFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAxLjgsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDAxOCxcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjI3NCxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtMi4wXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTE0LjRcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgXCJzb25nc1wiOiBbXHJcbiAgICAgICAgXCJiYXNrZXQtY2FzZS5vcHVzXCJcclxuICAgIF1cclxufTtcclxuXHJcbi8vIFNldCBtYXN0ZXIgdHJhY2sgcHJvcGVydGllczpcclxuaWYgKG1peC5tYXN0ZXIpIHtcclxuICAgIG1peGVyLm1hc3Rlci5hcHBseU9wdHMobWl4Lm1hc3Rlcik7XHJcbn1cclxuXHJcbi8vIEFkZCBkZWZhdWx0IHRyYWNrcyB0byBtaXhlcjpcclxubWl4ZXIuYWRkVHJhY2tzKG1peC50cmFja3MpO1xyXG5cclxuLy8gQmluZCBtaXhlciB0byBBdWRpb0NvbnRleHQ6XHJcbm1peGVyLmNyZWF0ZU5vZGVzKGFjKTtcclxuXHJcbi8vIEluaXRpYWxpemUgbWl4ZXIgVUk6XHJcbm5ldyBNaXhlclVJKG1peGVyKS5pbml0KCk7XHJcblxyXG4vLyBUT0RPOiB3b3VsZCBiZSBuaWNlIHRvIGRldGVjdCBjaGFubmVsIGNvdW50IGZyb20gc291cmNlLlxyXG5sZXQgc3BsaXR0ZXIgPSBhYy5jcmVhdGVDaGFubmVsU3BsaXR0ZXIobWl4LnNvdXJjZUNoYW5uZWxzKTtcclxudHJ5IHtcclxuICAgIC8vIEZvciBvbGRlciBzcGVjIGltcGxlbWVudGF0aW9uczpcclxuICAgIHNwbGl0dGVyLmNoYW5uZWxDb3VudE1vZGUgPSBcIm1heFwiO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgICBzcGxpdHRlci5jaGFubmVsQ291bnRNb2RlID0gXCJleHBsaWNpdFwiO1xyXG59XHJcbnNwbGl0dGVyLmNoYW5uZWxJbnRlcnByZXRhdGlvbiA9IFwiZGlzY3JldGVcIjtcclxubWNTb3VyY2UuY29ubmVjdChzcGxpdHRlcik7XHJcblxyXG4vLyBTcGxpdCBtdWx0aWNoYW5uZWwgYXVkaW8gc291cmNlIGludG8gc3RlcmVvL21vbm8gdHJhY2tzOlxyXG5sZXQgYyA9IDA7XHJcbmZvciAobGV0IHRyYWNrIG9mIG1peGVyLnRyYWNrcykge1xyXG4gICAgLy8gQ29ubmVjdCBtZWRpYSBvdXRwdXQgdG8gdHJhY2sgaW5wdXQ6XHJcbiAgICBsZXQgbWVyZ2VyID0gYWMuY3JlYXRlQ2hhbm5lbE1lcmdlcigyKTtcclxuICAgIG1lcmdlci5jaGFubmVsQ291bnRNb2RlID0gXCJleHBsaWNpdFwiO1xyXG4gICAgbWVyZ2VyLmNoYW5uZWxJbnRlcnByZXRhdGlvbiA9IFwiZGlzY3JldGVcIjtcclxuXHJcbiAgICBpZiAodHJhY2suY2hhbm5lbHMgPT0gMikge1xyXG4gICAgICAgIC8vIEFzc3VtZSBzdGVyZW8sIHNvIGNvcHkgbGVmdC9yaWdodCBjaGFubmVscyBpbmRlcGVuZGVudGx5OlxyXG4gICAgICAgIHNwbGl0dGVyLmNvbm5lY3QobWVyZ2VyLCBjKyssIDApO1xyXG4gICAgICAgIHNwbGl0dGVyLmNvbm5lY3QobWVyZ2VyLCBjKyssIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgbW9ubywgc28gY29weSBzaW5nbGUgaW5wdXQgY2hhbm5lbCB0byBib3RoIG91dHB1dCBjaGFubmVsczpcclxuICAgICAgICBzcGxpdHRlci5jb25uZWN0KG1lcmdlciwgYywgMCk7XHJcbiAgICAgICAgc3BsaXR0ZXIuY29ubmVjdChtZXJnZXIsIGMsIDEpO1xyXG4gICAgICAgIGMrKztcclxuICAgIH1cclxuICAgIG1lcmdlci5jb25uZWN0KHRyYWNrLmlucHV0Tm9kZSk7XHJcbn1cclxuXHJcbm1jQXVkaW8uc3JjID0gbWl4LnNvbmdzWzBdO1xyXG5tY0F1ZGlvLmxvb3AgPSB0cnVlO1xyXG4vL21jQXVkaW8ucGxheSgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFpbi50cyIsImltcG9ydCB7IFRyYWNrIH0gZnJvbSAnLi90cmFjayc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWl4ZXIge1xyXG4gICAgX21hc3RlcjogVHJhY2s7XHJcbiAgICBfdHJhY2tzOiBUcmFja1tdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX21hc3RlciA9IG5ldyBUcmFjayh0aGlzLCB7bmFtZTogXCJNQVNURVJcIn0pO1xyXG4gICAgICAgIHRoaXMuX3RyYWNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRyYWNrcyh0cmFja09wdHMpIHtcclxuICAgICAgICB0aGlzLl90cmFja3MgPSB0aGlzLl90cmFja3MuY29uY2F0KFxyXG4gICAgICAgICAgICB0cmFja09wdHNcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIob3B0cyA9PiBvcHRzLm5hbWUgIT09IFwiTUFTVEVSXCIpXHJcbiAgICAgICAgICAgICAgICAubWFwKG9wdHMgPT4gbmV3IFRyYWNrKHRoaXMsIG9wdHMpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTm9kZXMoYWMpIHtcclxuICAgICAgICAvLyBDcmVhdGUgbWFzdGVyIHRyYWNrOlxyXG4gICAgICAgIHRoaXMubWFzdGVyLmNyZWF0ZU5vZGVzKGFjKTtcclxuXHJcbiAgICAgICAgLy8gQ29ubmVjdCB0cmFja3MgdG8gbWFzdGVyIGlucHV0OlxyXG4gICAgICAgIGZvciAobGV0IHRyYWNrIG9mIHRoaXMuX3RyYWNrcykge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdHJhY2sgRlggY2hhaW46XHJcbiAgICAgICAgICAgIHRyYWNrLmNyZWF0ZU5vZGVzKGFjKTtcclxuICAgICAgICAgICAgLy8gQ29ubmVjdCB0cmFjayBGWCBjaGFpbiB0byBtYXN0ZXIgdHJhY2sncyBpbnB1dDpcclxuICAgICAgICAgICAgdHJhY2sub3V0cHV0Tm9kZS5jb25uZWN0KHRoaXMubWFzdGVyLmlucHV0Tm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb25uZWN0IG1peGVyIG1hc3RlciBvdXQgdG8gZGVzdGluYXRpb246XHJcbiAgICAgICAgdGhpcy5tYXN0ZXIub3V0cHV0Tm9kZS5jb25uZWN0KGFjLmRlc3RpbmF0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzb2xvL211dGUgZm9yIGFsbCB0cmFja3M6XHJcbiAgICAgICAgdGhpcy5hcHBseVNvbG8oKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFjayhuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJNQVNURVJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXN0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3MuZmluZCh0ciA9PiB0ci5uYW1lID09IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXN0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdHJhY2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFueVNvbG9lZFRyYWNrcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tzLnNvbWUodHIgPT4gdHIuc29sby52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVuc29sb2VkVHJhY2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3MuZmlsdGVyKHRyID0+ICF0ci5zb2xvLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc29sb2VkVHJhY2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3MuZmlsdGVyKHRyID0+IHRyLnNvbG8udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5U29sbygpIHtcclxuICAgICAgICBpZiAodGhpcy5hbnlTb2xvZWRUcmFja3MpIHtcclxuICAgICAgICAgICAgdGhpcy51bnNvbG9lZFRyYWNrcy5mb3JFYWNoKHRyID0+IHRyLnNvbG9NdXRlLnZhbHVlID0gdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc29sb2VkVHJhY2tzLmZvckVhY2godHIgPT4gdHIuc29sb011dGUudmFsdWUgPSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdHJhY2tzLmZvckVhY2godHIgPT4gdHIuc29sb011dGUudmFsdWUgPSBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taXhlci50cyIsImltcG9ydCB7IGRCX3RvX2dhaW4sIGdhaW5fdG9fZEIgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXIgfSBmcm9tICcuL3BhcmFtZXRlcic7XHJcbmltcG9ydCB7IE1peGVyIH0gZnJvbSAnLi9taXhlcic7XHJcbmltcG9ydCB7IEVRIH0gZnJvbSAnLi9lcSc7XHJcbmltcG9ydCB7IENvbXByZXNzb3IgfSBmcm9tICcuL2NvbXByZXNzb3InO1xyXG5pbXBvcnQgeyBHcmFwaGljRVEgfSBmcm9tICcuL2dyYXBoaWNlcSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJhY2sge1xyXG4gICAgcHJpdmF0ZSBtaXhlcjogTWl4ZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBjaGFubmVsczogbnVtYmVyO1xyXG4gICAgb3B0czogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX3NvbG9NdXRlOiBQYXJhbWV0ZXI7XHJcbiAgICBwcml2YXRlIF9tdXRlOiBQYXJhbWV0ZXI7XHJcbiAgICBwcml2YXRlIF9zb2xvOiBQYXJhbWV0ZXI7XHJcbiAgICBwcml2YXRlIF9pbl9nYWluOiBQYXJhbWV0ZXI7XHJcbiAgICBfZXE6IEVRO1xyXG4gICAgX2NvbXByZXNzb3I6IENvbXByZXNzb3I7XHJcbiAgICBfZ3JhcGhpY2VxOiBHcmFwaGljRVE7XHJcbiAgICBwcml2YXRlIF9wYW46IFBhcmFtZXRlcjtcclxuICAgIHByaXZhdGUgX2xldmVsOiBQYXJhbWV0ZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBzb2xvTXV0ZU5vZGU6IEdhaW5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBtdXRlTm9kZTogR2Fpbk5vZGU7XHJcbiAgICBwcml2YXRlIGluR2Fpbk5vZGU6IEdhaW5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwYW5uZXJOb2RlOiBTdGVyZW9QYW5uZXJOb2RlO1xyXG4gICAgcHJpdmF0ZSBvdXRHYWluTm9kZTogR2Fpbk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWl4ZXIsIG9wdHMpIHtcclxuICAgICAgICB0aGlzLm1peGVyID0gbWl4ZXI7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0cy5uYW1lO1xyXG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSBvcHRzLmNoYW5uZWxzIHx8IDE7XHJcblxyXG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XHJcblxyXG4gICAgICAgIHRoaXMuX3NvbG9NdXRlID0gbmV3IFBhcmFtZXRlcihcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTb2xvTXV0ZS5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9tdXRlID0gbmV3IFBhcmFtZXRlcihcclxuICAgICAgICAgICAgb3B0cy5tdXRlIHx8IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLmFwcGx5TXV0ZS5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9zb2xvID0gbmV3IFBhcmFtZXRlcihcclxuICAgICAgICAgICAgb3B0cy5zb2xvIHx8IGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U29sby5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9pbl9nYWluID0gbmV3IFBhcmFtZXRlcihcclxuICAgICAgICAgICAgb3B0cy5pbl9nYWluIHx8IDAsXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJbkdhaW4uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fZXEgPSBuZXcgRVEob3B0cy5lcSB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5fY29tcHJlc3NvciA9IG5ldyBDb21wcmVzc29yKG9wdHMuY29tcHJlc3NvciB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5fZ3JhcGhpY2VxID0gbmV3IEdyYXBoaWNFUShvcHRzLmdyYXBoaWNlcSB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5fcGFuID0gbmV3IFBhcmFtZXRlcihcclxuICAgICAgICAgICAgb3B0cy5wYW4gfHwgMCxcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhbi5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9sZXZlbCA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIG9wdHMubGV2ZWwgfHwgMCxcclxuICAgICAgICAgICAgdGhpcy5hcHBseUxldmVsLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5T3B0cyhvcHRzKSB7XHJcbiAgICAgICAgdGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIG9wdHMpO1xyXG5cclxuICAgICAgICB0aGlzLm11dGUudmFsdWUgPSBvcHRzLm11dGUgfHwgdGhpcy5tdXRlLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc29sby52YWx1ZSA9IG9wdHMuc29sbyB8fCB0aGlzLnNvbG8udmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbkdhaW4udmFsdWUgPSBvcHRzLmluX2dhaW4gfHwgdGhpcy5pbkdhaW4udmFsdWU7XHJcbiAgICAgICAgdGhpcy5lcS5hcHBseU9wdHMob3B0cy5lcSB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5jb21wcmVzc29yLmFwcGx5T3B0cyhvcHRzLmNvbXByZXNzb3IgfHwge30pO1xyXG4gICAgICAgIHRoaXMuZ3JhcGhpY2VxLmFwcGx5T3B0cyhvcHRzLmdyYXBoaWNlcSB8fCB7fSk7XHJcbiAgICAgICAgdGhpcy5wYW4udmFsdWUgPSBvcHRzLnBhbiB8fCB0aGlzLnBhbi52YWx1ZTtcclxuICAgICAgICB0aGlzLmxldmVsLnZhbHVlID0gb3B0cy5sZXZlbCB8fCB0aGlzLmxldmVsLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU5vZGVzKGFjIC8qOiBBdWRpb0NvbnRleHQgKi8pIHtcclxuICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBub2RlczpcclxuICAgICAgICB0aGlzLnNvbG9NdXRlTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcclxuICAgICAgICB0aGlzLm11dGVOb2RlID0gYWMuY3JlYXRlR2FpbigpO1xyXG4gICAgICAgIHRoaXMuaW5HYWluTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcclxuICAgICAgICB0aGlzLnBhbm5lck5vZGUgPSBhYy5jcmVhdGVTdGVyZW9QYW5uZXIoKTtcclxuICAgICAgICB0aGlzLm91dEdhaW5Ob2RlID0gYWMuY3JlYXRlR2FpbigpO1xyXG5cclxuICAgICAgICAvLyBDb25uZWN0IG9wdGlvbmFsIGNvbXBvbmVudHM6XHJcbiAgICAgICAgbGV0IGZ4SW5Ob2RlID0gbnVsbDtcclxuICAgICAgICBsZXQgZnhPdXROb2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5vcHRzLmVxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VxLmNyZWF0ZU5vZGVzKGFjKTtcclxuICAgICAgICAgICAgZnhJbk5vZGUgPSB0aGlzLl9lcS5pbnB1dE5vZGU7XHJcbiAgICAgICAgICAgIGZ4T3V0Tm9kZSA9IHRoaXMuX2VxLm91dHB1dE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuY29tcHJlc3Nvcikge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wcmVzc29yLmNyZWF0ZU5vZGVzKGFjKTtcclxuICAgICAgICAgICAgaWYgKGZ4SW5Ob2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmeEluTm9kZSA9IHRoaXMuX2NvbXByZXNzb3IuaW5wdXROb2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnhPdXROb2RlLmNvbm5lY3QodGhpcy5fY29tcHJlc3Nvci5pbnB1dE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ4T3V0Tm9kZSA9IHRoaXMuX2NvbXByZXNzb3Iub3V0cHV0Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5ncmFwaGljZXEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY2VxLmNyZWF0ZU5vZGVzKGFjKTtcclxuICAgICAgICAgICAgaWYgKGZ4SW5Ob2RlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmeEluTm9kZSA9IHRoaXMuX2dyYXBoaWNlcS5pbnB1dE5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmeE91dE5vZGUuY29ubmVjdCh0aGlzLl9ncmFwaGljZXEuaW5wdXROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmeE91dE5vZGUgPSB0aGlzLl9ncmFwaGljZXEub3V0cHV0Tm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbm5lY3Qgbm9kZXM6XHJcbiAgICAgICAgdGhpcy5zb2xvTXV0ZU5vZGUuY29ubmVjdCh0aGlzLm11dGVOb2RlKTtcclxuICAgICAgICB0aGlzLm11dGVOb2RlLmNvbm5lY3QodGhpcy5pbkdhaW5Ob2RlKTtcclxuICAgICAgICBpZiAoZnhJbk5vZGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pbkdhaW5Ob2RlLmNvbm5lY3QoZnhJbk5vZGUpO1xyXG4gICAgICAgICAgICBmeE91dE5vZGUuY29ubmVjdCh0aGlzLnBhbm5lck5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5HYWluTm9kZS5jb25uZWN0KHRoaXMucGFubmVyTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFubmVyTm9kZS5jb25uZWN0KHRoaXMub3V0R2Fpbk5vZGUpO1xyXG5cclxuICAgICAgICAvLyBTZXQgcHJvcGVydGllczpcclxuICAgICAgICB0aGlzLmFwcGx5U29sb011dGUoKTtcclxuICAgICAgICB0aGlzLmFwcGx5TXV0ZSgpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlJbkdhaW4oKTtcclxuICAgICAgICB0aGlzLmFwcGx5UGFuKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseUxldmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0Tm9kZSgpIHsgcmV0dXJuIHRoaXMuc29sb011dGVOb2RlOyB9XHJcbiAgICBnZXQgb3V0cHV0Tm9kZSgpIHsgcmV0dXJuIHRoaXMub3V0R2Fpbk5vZGU7IH1cclxuXHJcbiAgICBnZXQgaW5HYWluKCkgeyByZXR1cm4gdGhpcy5faW5fZ2FpbjsgfVxyXG4gICAgYXBwbHlJbkdhaW4oKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5pbkdhaW5Ob2RlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pbkdhaW5Ob2RlLmdhaW4udmFsdWUgPSBkQl90b19nYWluKHRoaXMuX2luX2dhaW4udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtdXRlKCkgeyByZXR1cm4gdGhpcy5fbXV0ZTsgfVxyXG4gICAgYXBwbHlNdXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5tdXRlTm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9zb2xvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0ZU5vZGUuZ2Fpbi52YWx1ZSA9IDE7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRlTm9kZS5nYWluLnZhbHVlID0gdGhpcy5fbXV0ZS52YWx1ZSA/IDAgOiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzb2xvKCkgeyByZXR1cm4gdGhpcy5fc29sbzsgfVxyXG4gICAgYXBwbHlTb2xvKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5taXhlcikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubWl4ZXIuYXBwbHlTb2xvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNvbG9NdXRlKCkgeyByZXR1cm4gdGhpcy5fc29sb011dGU7IH1cclxuICAgIGFwcGx5U29sb011dGUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNvbG9NdXRlTm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9zb2xvLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0ZU5vZGUuZ2Fpbi52YWx1ZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseU11dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zb2xvTXV0ZU5vZGUuZ2Fpbi52YWx1ZSA9IHRoaXMuX3NvbG9NdXRlLnZhbHVlID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGVxKCkgeyByZXR1cm4gdGhpcy5fZXE7IH1cclxuICAgIGdldCBjb21wcmVzc29yKCkgeyByZXR1cm4gdGhpcy5fY29tcHJlc3NvcjsgfVxyXG4gICAgZ2V0IGdyYXBoaWNlcSgpIHsgcmV0dXJuIHRoaXMuX2dyYXBoaWNlcTsgfVxyXG5cclxuICAgIGdldCBwYW4oKSB7IHJldHVybiB0aGlzLl9wYW47IH1cclxuICAgIGFwcGx5UGFuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wYW5uZXJOb2RlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wYW5uZXJOb2RlLnBhbi52YWx1ZSA9IHRoaXMuX3Bhbi52YWx1ZTtcclxuICAgICAgICB0aGlzLmFwcGx5TGV2ZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGV2ZWwoKSB7IHJldHVybiB0aGlzLl9sZXZlbDsgfVxyXG4gICAgYXBwbHlMZXZlbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3V0R2Fpbk5vZGUpIHJldHVybjtcclxuICAgICAgICBsZXQgZEIgPSB0aGlzLl9sZXZlbC52YWx1ZTtcclxuICAgICAgICAvLyBEZWNyZWFzZSBhcHBhcmVudCBsZXZlbCBkZXBlbmRpbmcgb24gcGFuOlxyXG4gICAgICAgIGRCICs9IE1hdGguYWJzKHRoaXMuX3Bhbi52YWx1ZSkgKiAtNi4wO1xyXG4gICAgICAgIHRoaXMub3V0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IGRCX3RvX2dhaW4oZEIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cmFjay50cyIsImltcG9ydCB7IGRCX3RvX2dhaW4sIGdhaW5fdG9fZEIgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgRVEge1xuICAgIG9wdHM6IGFueTtcbiAgICBpbnB1dE5vZGU6IEF1ZGlvTm9kZTtcbiAgICBvdXRwdXROb2RlOiBBdWRpb05vZGU7XG5cbiAgICBiYW5kTm9kZXM6IEJpcXVhZEZpbHRlck5vZGVbXTtcbiAgICBwcml2YXRlIG1ha2V1cEdhaW5Ob2RlOiBHYWluTm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB9XG5cbiAgICBhcHBseU9wdHMob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgb3B0cyk7XG4gICAgfVxuXG4gICAgY3JlYXRlTm9kZXMoYWMpIHtcbiAgICAgICAgbGV0IGlucHV0Tm9kZSA9IG51bGw7XG4gICAgICAgIGxldCBvdXRwdXROb2RlID0gbnVsbDtcbiAgICAgICAgbGV0IGJhbmROb2RlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGJhbmQgb2YgdGhpcy5vcHRzLmJhbmRzIHx8IFtdKSB7XG4gICAgICAgICAgICBsZXQgYmFuZE5vZGUgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICAgICAgICAgIGJhbmROb2Rlcy5wdXNoKGJhbmROb2RlKTtcblxuICAgICAgICAgICAgYmFuZE5vZGUudHlwZSA9IGJhbmQudHlwZSB8fCBcInBlYWtpbmdcIjtcbiAgICAgICAgICAgIGJhbmROb2RlLmZyZXF1ZW5jeS52YWx1ZSA9IGJhbmQuZnJlcTtcbiAgICAgICAgICAgIGJhbmROb2RlLlEudmFsdWUgPSBiYW5kLnEgfHwgMC42NjY2Njc7XG4gICAgICAgICAgICBiYW5kTm9kZS5nYWluLnZhbHVlID0gYmFuZC5nYWluIHx8IDA7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpbnB1dE5vZGUgPSBiYW5kTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0Tm9kZS5jb25uZWN0KGJhbmROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dE5vZGUgPSBiYW5kTm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdHMubWFrZXVwR2Fpbikge1xuICAgICAgICAgICAgdGhpcy5tYWtldXBHYWluTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgICAgIHRoaXMubWFrZXVwR2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IGRCX3RvX2dhaW4odGhpcy5vcHRzLm1ha2V1cEdhaW4pO1xuICAgICAgICAgICAgaWYgKG91dHB1dE5vZGUpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXROb2RlLmNvbm5lY3QodGhpcy5tYWtldXBHYWluTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXROb2RlID0gdGhpcy5tYWtldXBHYWluTm9kZTtcbiAgICAgICAgICAgIGlmIChpbnB1dE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpbnB1dE5vZGUgPSBvdXRwdXROb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dE5vZGUgPSBpbnB1dE5vZGU7XG4gICAgICAgIHRoaXMub3V0cHV0Tm9kZSA9IG91dHB1dE5vZGU7XG4gICAgICAgIHRoaXMuYmFuZE5vZGVzID0gYmFuZE5vZGVzO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lcS50cyIsImltcG9ydCB7IGRCX3RvX2dhaW4sIGdhaW5fdG9fZEIgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi9wYXJhbWV0ZXInO1xuXG5leHBvcnQgY2xhc3MgQ29tcHJlc3NvciB7XG4gICAgb3B0czogYW55O1xuICAgIF90aHJlc2hvbGQ6IFBhcmFtZXRlcjtcbiAgICBfcmF0aW86IFBhcmFtZXRlcjtcbiAgICBfa25lZTogUGFyYW1ldGVyO1xuICAgIF9hdHRhY2s6IFBhcmFtZXRlcjtcbiAgICBfcmVsZWFzZTogUGFyYW1ldGVyO1xuICAgIF9tYWtldXBHYWluOiBQYXJhbWV0ZXI7XG5cbiAgICBwcml2YXRlIGNvbXBOb2RlOiBEeW5hbWljc0NvbXByZXNzb3JOb2RlO1xuICAgIHByaXZhdGUgbWFrZXVwR2Fpbk5vZGU6IEdhaW5Ob2RlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuX3RocmVzaG9sZCA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLnRocmVzaG9sZCB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS50aHJlc2hvbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9yYXRpbyA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLnJhdGlvIHx8IDAsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29tcE5vZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBOb2RlLnJhdGlvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fa25lZSA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLmtuZWUgfHwgMCxcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb21wTm9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcE5vZGUua25lZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX2F0dGFjayA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLmF0dGFjayB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS5hdHRhY2sudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9yZWxlYXNlID0gbmV3IFBhcmFtZXRlcihcbiAgICAgICAgICAgIG9wdHMucmVsZWFzZSB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS5yZWxlYXNlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fbWFrZXVwR2FpbiA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLm1ha2V1cEdhaW4gfHwgMCxcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYWtldXBHYWluTm9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMubWFrZXVwR2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IGRCX3RvX2dhaW4odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFwcGx5T3B0cyhvcHRzKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcblxuICAgICAgICB0aGlzLnRocmVzaG9sZC52YWx1ZSA9IG9wdHMudGhyZXNob2xkIHx8IHRoaXMudGhyZXNob2xkLnZhbHVlO1xuICAgICAgICB0aGlzLnJhdGlvLnZhbHVlID0gb3B0cy5yYXRpbyB8fCB0aGlzLnJhdGlvLnZhbHVlO1xuICAgICAgICB0aGlzLmtuZWUudmFsdWUgPSBvcHRzLmtuZWUgfHwgdGhpcy5rbmVlLnZhbHVlO1xuICAgICAgICB0aGlzLmF0dGFjay52YWx1ZSA9IG9wdHMuYXR0YWNrIHx8IHRoaXMuYXR0YWNrLnZhbHVlO1xuICAgICAgICB0aGlzLnJlbGVhc2UudmFsdWUgPSBvcHRzLnJlbGVhc2UgfHwgdGhpcy5yZWxlYXNlLnZhbHVlO1xuICAgICAgICB0aGlzLm1ha2V1cEdhaW4udmFsdWUgPSBvcHRzLm1ha2V1cEdhaW4gfHwgdGhpcy5tYWtldXBHYWluLnZhbHVlO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vZGVzKGFjKSB7XG4gICAgICAgIHRoaXMuY29tcE5vZGUgPSBhYy5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcbiAgICAgICAgdGhpcy5tYWtldXBHYWluTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcblxuICAgICAgICB0aGlzLmNvbXBOb2RlLmNvbm5lY3QodGhpcy5tYWtldXBHYWluTm9kZSk7XG5cbiAgICAgICAgdGhpcy50aHJlc2hvbGQuYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJhdGlvLmFwcGx5VmFsdWUoKTtcbiAgICAgICAgdGhpcy5rbmVlLmFwcGx5VmFsdWUoKTtcbiAgICAgICAgdGhpcy5hdHRhY2suYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJlbGVhc2UuYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLm1ha2V1cEdhaW4uYXBwbHlWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dE5vZGUoKSB7IHJldHVybiB0aGlzLmNvbXBOb2RlOyB9XG4gICAgZ2V0IG91dHB1dE5vZGUoKSB7IHJldHVybiB0aGlzLm1ha2V1cEdhaW5Ob2RlOyB9XG5cbiAgICBnZXQgdGhyZXNob2xkKCkgeyByZXR1cm4gdGhpcy5fdGhyZXNob2xkOyB9XG4gICAgZ2V0IHJhdGlvKCkgeyByZXR1cm4gdGhpcy5fcmF0aW87IH1cbiAgICBnZXQga25lZSgpIHsgcmV0dXJuIHRoaXMuX2tuZWU7IH1cbiAgICBnZXQgYXR0YWNrKCkgeyByZXR1cm4gdGhpcy5fYXR0YWNrOyB9XG4gICAgZ2V0IHJlbGVhc2UoKSB7IHJldHVybiB0aGlzLl9yZWxlYXNlOyB9XG4gICAgZ2V0IG1ha2V1cEdhaW4oKSB7IHJldHVybiB0aGlzLl9tYWtldXBHYWluOyB9XG5cbiAgICBnZXQgZ2FpblJlZHVjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcE5vZGUucmVkdWN0aW9uO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXByZXNzb3IudHMiLCJpbXBvcnQgeyBkQl90b19nYWluLCBnYWluX3RvX2RCIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIEdyYXBoaWNFUSB7XG4gICAgb3B0czogYW55O1xuICAgIGlucHV0Tm9kZTogQXVkaW9Ob2RlO1xuICAgIG91dHB1dE5vZGU6IEF1ZGlvTm9kZTtcblxuICAgIGJhbmROb2RlczogQmlxdWFkRmlsdGVyTm9kZVtdO1xuICAgIHByaXZhdGUgbWFrZXVwR2Fpbk5vZGU6IEdhaW5Ob2RlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIH1cblxuICAgIGFwcGx5T3B0cyhvcHRzKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlcyhhYykge1xuICAgICAgICBsZXQgaW5wdXROb2RlID0gbnVsbDtcbiAgICAgICAgbGV0IG91dHB1dE5vZGUgPSBudWxsO1xuICAgICAgICBsZXQgYmFuZE5vZGVzID0gW107XG5cbiAgICAgICAgbGV0IGJhbmRDb3VudCA9IHRoaXMub3B0cy5iYW5kQ291bnQgfHwgMTY7XG4gICAgICAgIGlmIChiYW5kQ291bnQgPCAxKSB7XG4gICAgICAgICAgICBiYW5kQ291bnQgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJhbmRzID0gdGhpcy5vcHRzLmJhbmRzIHx8IFtdO1xuICAgICAgICBsZXQgbiA9IDA7XG4gICAgICAgIGxldCBxID0gTWF0aC5sb2cyKDMpO1xuXG4gICAgICAgIGZvciAobGV0IGdhaW4gb2YgYmFuZHMpIHtcbiAgICAgICAgICAgIGxldCBiYW5kTm9kZSA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICAgICAgYmFuZE5vZGVzLnB1c2goYmFuZE5vZGUpO1xuXG4gICAgICAgICAgICBiYW5kTm9kZS50eXBlID0gXCJwZWFraW5nXCI7XG4gICAgICAgICAgICBiYW5kTm9kZS5mcmVxdWVuY3kudmFsdWUgPSBNYXRoLnBvdyhxLCBuKSAqIDIwO1xuICAgICAgICAgICAgLy8gc2VlOiBodHRwOi8vd3d3LnJhbmUuY29tL25vdGUxMDEuaHRtbFxuICAgICAgICAgICAgLy8gUSA9IGYgLyAoZiAqIE1hdGgucG93KDIsIDEvNikgLSBmICogTWF0aC5wb3coMiwgLTEvNikpXG4gICAgICAgICAgICBiYW5kTm9kZS5RLnZhbHVlID0gNC4zMTg0NzMwNDY5NjMxNDY7XG4gICAgICAgICAgICBiYW5kTm9kZS5nYWluLnZhbHVlID0gZ2FpbjtcblxuICAgICAgICAgICAgbisrO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaW5wdXROb2RlID0gYmFuZE5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dHB1dE5vZGUuY29ubmVjdChiYW5kTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXROb2RlID0gYmFuZE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRzLm1ha2V1cEdhaW4pIHtcbiAgICAgICAgICAgIHRoaXMubWFrZXVwR2Fpbk5vZGUgPSBhYy5jcmVhdGVHYWluKCk7XG4gICAgICAgICAgICB0aGlzLm1ha2V1cEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBkQl90b19nYWluKHRoaXMub3B0cy5tYWtldXBHYWluKTtcbiAgICAgICAgICAgIGlmIChvdXRwdXROb2RlKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0Tm9kZS5jb25uZWN0KHRoaXMubWFrZXVwR2Fpbk5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0Tm9kZSA9IHRoaXMubWFrZXVwR2Fpbk5vZGU7XG4gICAgICAgICAgICBpZiAoaW5wdXROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaW5wdXROb2RlID0gb3V0cHV0Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5wdXROb2RlID0gaW5wdXROb2RlO1xuICAgICAgICB0aGlzLm91dHB1dE5vZGUgPSBvdXRwdXROb2RlO1xuICAgICAgICB0aGlzLmJhbmROb2RlcyA9IGJhbmROb2RlcztcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ3JhcGhpY2VxLnRzIiwiaW1wb3J0IHsgZEJfdG9fZ2FpbiwgZ2Fpbl90b19kQiB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCB7IE1peGVyIH0gZnJvbSAnLi9taXhlcic7XHJcblxyXG4vLyBEZWZpbmUgbWF4aW11bSBnYWluIGF0IHRoZSB0b3Agb2YgdGhlIGZhZGVyIHJhbmdlIFswLi4xXTpcclxuY29uc3QgZmFkZXJNYXhHYWluID0gZEJfdG9fZ2FpbigxMik7XHJcblxyXG4vLyBDb252ZXJ0IGZyb20gZEIgdG8gZmFkZXIgcmFuZ2UgWzAuLjFdOlxyXG5mdW5jdGlvbiBkQl90b19mYWRlcihkQjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmIChkQiA9PSAtSW5maW5pdHkpIHJldHVybiAwLjA7XHJcbiAgICBsZXQgZ2FpbiA9IGRCX3RvX2dhaW4oZEIpICogMi4wIC8gZmFkZXJNYXhHYWluO1xyXG4gICAgbGV0IGZhZGVyID0gTWF0aC5wb3coKDYuMCAqIE1hdGgubG9nKGdhaW4pIC8gTWF0aC5sb2coMi4wKSArIDE5Mi4wKSAvIDE5OC4wLCA4LjApO1xyXG4gICAgcmV0dXJuIGZhZGVyO1xyXG59XHJcblxyXG4vLyBEZWZpbmUgYSB6ZXJvLXZhbHVlIG9uIHRoZSBmYWRlciBbMC4uMV0gc2NhbGU6XHJcbmNvbnN0IGZhZGVyWmVybyA9IGRCX3RvX2ZhZGVyKDApO1xyXG5cclxuLy8gQ29udmVydCBmcm9tIGZhZGVyIHJhbmdlIFswLi4xXSB0byBkQjpcclxuZnVuY3Rpb24gZmFkZXJfdG9fZEIoZmFkZXIpIHtcclxuICAgIGlmIChmYWRlciA9PSAwLjApIHJldHVybiAtSW5maW5pdHk7XHJcbiAgICBpZiAoTWF0aC5hYnMoZmFkZXIgLSBmYWRlclplcm8pIDwgMWUtNikgcmV0dXJuIDA7XHJcbiAgICBsZXQgZ2FpbiA9IE1hdGguZXhwKCgoTWF0aC5wb3coZmFkZXIsIDEuMCAvIDguMCkgKiAxOTguMCkgLSAxOTIuMCkgLyA2LjAgKiBNYXRoLmxvZygyLjApKSAqIGZhZGVyTWF4R2FpbiAvIDIuMDtcclxuICAgIGxldCBkQiA9IGdhaW5fdG9fZEIoZ2Fpbik7XHJcbiAgICByZXR1cm4gZEI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdpdGhFeGFjdERpZ2l0cyh2YWx1ZSwgbWF4RGlnaXRzKSB7XHJcbiAgICBsZXQgcyA9IHZhbHVlLnRvUHJlY2lzaW9uKG1heERpZ2l0cyk7XHJcbiAgICBpZiAocyA9PSBcIi1JbmZpbml0eVwiKSB7XHJcbiAgICAgICAgcyA9IFwiLWluZlwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBPbmx5IHNob3cgbWF4RGlnaXRzIHRvdGFsIGRpZ2l0cyBpbmNsdWRpbmcgMHM6XHJcbiAgICAgICAgbGV0IGRpZ2l0cyA9IDAsIG4gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGMgb2Ygcykge1xyXG4gICAgICAgICAgICBpZiAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHtcclxuICAgICAgICAgICAgICAgIGRpZ2l0cysrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpZ2l0cyA+PSBtYXhEaWdpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gcy5zbGljZSgwLCBuKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4rKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcztcclxufVxyXG5cclxuZnVuY3Rpb24gbGV2ZWxGb3JtYXQoZEIpIHtcclxuICAgIHJldHVybiBgJHt3aXRoRXhhY3REaWdpdHMoZEIsMyl9IGRCYDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1peGVyVUkge1xyXG4gICAgbWl4ZXI6IE1peGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1peGVyKSB7XHJcbiAgICAgICAgdGhpcy5taXhlciA9IG1peGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrRnJvbURlc2NlbmRlbnQoZWwpIHtcclxuICAgICAgICBsZXQgdHJhY2tFbCA9IGVsLmNsb3Nlc3QoXCJkaXYudHJhY2tcIik7XHJcbiAgICAgICAgbGV0IHRyYWNrTmFtZSA9IHRyYWNrRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmFja1wiKTtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLm1peGVyLnRyYWNrKHRyYWNrTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGZhZGVySW5wdXRIYW5kbGVyKGUpIHtcclxuICAgICAgICBsZXQgZWwgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrRnJvbURlc2NlbmRlbnQoZWwpO1xyXG5cclxuICAgICAgICBsZXQgZmFkZXIgPSBlbC52YWx1ZTtcclxuICAgICAgICBsZXQgZEIgPSBmYWRlcl90b19kQihmYWRlcik7XHJcbiAgICAgICAgdHJhY2subGV2ZWwudmFsdWUgPSBkQjtcclxuICAgIH1cclxuXHJcbiAgICBtdXRlSW5wdXRIYW5kbGVyKGUpIHtcclxuICAgICAgICBsZXQgZWwgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrRnJvbURlc2NlbmRlbnQoZWwpO1xyXG5cclxuICAgICAgICBsZXQgbXV0ZSA9IGVsLmNoZWNrZWQ7XHJcbiAgICAgICAgdHJhY2subXV0ZS52YWx1ZSA9IG11dGU7XHJcbiAgICB9XHJcblxyXG4gICAgc29sb0lucHV0SGFuZGxlcihlKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja0Zyb21EZXNjZW5kZW50KGVsKTtcclxuXHJcbiAgICAgICAgbGV0IHNvbG8gPSBlbC5jaGVja2VkO1xyXG4gICAgICAgIHRyYWNrLnNvbG8udmFsdWUgPSBzb2xvO1xyXG4gICAgfVxyXG5cclxuICAgIGZhZGVyUmVzZXRIYW5kbGVyKGUpIHtcclxuICAgICAgICBsZXQgZWwgPSBlLnRhcmdldDtcclxuICAgICAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrRnJvbURlc2NlbmRlbnQoZWwpO1xyXG5cclxuICAgICAgICB0cmFjay5sZXZlbC52YWx1ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZmFkZXJJbnB1dEhhbmRsZXIgPSB0aGlzLmZhZGVySW5wdXRIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgbGV0IGZhZGVyUmVzZXRIYW5kbGVyID0gdGhpcy5mYWRlclJlc2V0SGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGxldCBtdXRlSW5wdXRIYW5kbGVyID0gdGhpcy5tdXRlSW5wdXRIYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgbGV0IHNvbG9JbnB1dEhhbmRsZXIgPSB0aGlzLnNvbG9JbnB1dEhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gU3RhbXAgdGVtcGxhdGUgcGVyIGVhY2ggdHJhY2s6XHJcbiAgICAgICAgbGV0IHRyYWNrVGVtcGxhdGUgPSA8SFRNTFRlbXBsYXRlRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWNrVGVtcGxhdGVcIik7XHJcbiAgICAgICAgbGV0IHRyYWNrU3RyaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1peGVyIC50cmFja3N0cmlwXCIpO1xyXG4gICAgICAgIFsuLi50aGlzLm1peGVyLnRyYWNrcywgdGhpcy5taXhlci5tYXN0ZXJdLmZvckVhY2godHJhY2sgPT4ge1xyXG4gICAgICAgICAgICAvLyBDbG9uZSB0ZW1wbGF0ZTpcclxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodHJhY2tUZW1wbGF0ZS5jb250ZW50LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBkYXRhLXRyYWNrIGF0dHJpYnV0ZTpcclxuICAgICAgICAgICAgY29uc3QgdHJhY2tOb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKFwiZGl2LnRyYWNrXCIpO1xyXG4gICAgICAgICAgICB0cmFja05vZGUuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFja1wiLCB0cmFjay5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBuYW1lIGxhYmVsOlxyXG4gICAgICAgICAgICBjb25zdCBuYW1lTGFiZWwgPSA8SFRNTFNwYW5FbGVtZW50Pm5vZGUucXVlcnlTZWxlY3RvcihcIi5sYWJlbCBzcGFuLm5hbWVcIik7XHJcbiAgICAgICAgICAgIG5hbWVMYWJlbC5pbm5lclRleHQgPSB0cmFjay5uYW1lO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGxldmVsIGxhYmVsOlxyXG4gICAgICAgICAgICBjb25zdCBsZXZlbExhYmVsID0gPEhUTUxTcGFuRWxlbWVudD5ub2RlLnF1ZXJ5U2VsZWN0b3IoXCIubGFiZWwgc3Bhbi5sZXZlbFwiKTtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5pbm5lclRleHQgPSBsZXZlbEZvcm1hdCh0cmFjay5sZXZlbC52YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIENsaWNrIGxldmVsIGxhYmVsIHRvIHJlc2V0IHRvIDA6XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZhZGVyUmVzZXRIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJpbmQgZmFkZXIgZXZlbnRzOlxyXG4gICAgICAgICAgICBjb25zdCBmYWRlck5vZGUgPSA8SFRNTElucHV0RWxlbWVudD50cmFja05vZGUucXVlcnlTZWxlY3RvcihcIi5mYWRlciBpbnB1dFt0eXBlPXJhbmdlXVwiKTtcclxuICAgICAgICAgICAgZmFkZXJOb2RlLm1pbiA9ICcwLjAnO1xyXG4gICAgICAgICAgICBmYWRlck5vZGUubWF4ID0gJzEuMCc7XHJcbiAgICAgICAgICAgIGZhZGVyTm9kZS52YWx1ZUFzTnVtYmVyID0gZEJfdG9fZmFkZXIodHJhY2subGV2ZWwudmFsdWUpO1xyXG4gICAgICAgICAgICBmYWRlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIGZhZGVyUmVzZXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZmFkZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmYWRlcklucHV0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRyYWNrLmxldmVsLmFkZENoYW5nZWRFdmVudCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZhZGVyTm9kZS52YWx1ZUFzTnVtYmVyID0gZEJfdG9fZmFkZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxMYWJlbC5pbm5lclRleHQgPSBsZXZlbEZvcm1hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IG11dGVOb2RlID0gPEhUTUxJbnB1dEVsZW1lbnQ+dHJhY2tOb2RlLnF1ZXJ5U2VsZWN0b3IoXCIubXV0ZS1idXR0b24gaW5wdXRbdHlwZT1jaGVja2JveF1cIik7XHJcbiAgICAgICAgICAgIG11dGVOb2RlLmNoZWNrZWQgPSB0cmFjay5tdXRlLnZhbHVlO1xyXG4gICAgICAgICAgICBtdXRlTm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG11dGVJbnB1dEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjay5tdXRlLmFkZENoYW5nZWRFdmVudCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIG11dGVOb2RlLmNoZWNrZWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc29sb05vZGUgPSA8SFRNTElucHV0RWxlbWVudD50cmFja05vZGUucXVlcnlTZWxlY3RvcihcIi5zb2xvLWJ1dHRvbiBpbnB1dFt0eXBlPWNoZWNrYm94XVwiKTtcclxuICAgICAgICAgICAgc29sb05vZGUuY2hlY2tlZCA9IHRyYWNrLnNvbG8udmFsdWU7XHJcbiAgICAgICAgICAgIHNvbG9Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc29sb0lucHV0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRyYWNrLnNvbG8uYWRkQ2hhbmdlZEV2ZW50KCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc29sb05vZGUuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRyYWNrU3RyaXAuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWl4ZXItdWkudHMiXSwic291cmNlUm9vdCI6IiJ9