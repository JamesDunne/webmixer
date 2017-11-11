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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, mixer_1, mixer_ui_1) {
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, track_1) {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, parameter_1, eq_1, compressor_1, graphiceq_1) {
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
            this.inGainNode.gain.value = dB_to_gain(this._in_gain.value);
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
            this.outGainNode.gain.value = dB_to_gain(dB);
        }
    }
    exports.Track = Track;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
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
                this.makeupGainNode.gain.value = dB_to_gain(this.opts.makeupGain);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, parameter_1) {
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
                this.makeupGainNode.gain.value = dB_to_gain(value);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
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
                this.makeupGainNode.gain.value = dB_to_gain(this.opts.makeupGain);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Define maximum gain at the top of the fader range [0..1]:
    const faderMaxGain = dB_to_gain(12);
    // Convert from dB to fader range [0..1]:
    function dB_to_fader(dB) {
        if (dB == -Infinity)
            return 0.0;
        let gain = dB_to_gain(dB) * 2.0 / faderMaxGain;
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
        let dB = gain_to_dB(gain);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTMzNDE1ZmQyYmNjMzY3MDc3ODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyYWNrLnRzIiwid2VicGFjazovLy8uL3NyYy9lcS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcHJlc3Nvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhpY2VxLnRzIiwid2VicGFjazovLy8uL3NyYy9taXhlci11aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7SUM1REE7UUFLSSxZQUFZLEtBQUssRUFBRSxPQUFPO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFlBQVksUUFBUSxDQUFDLENBQUM7Z0JBQUMsTUFBTSx5Q0FBeUMsQ0FBQztZQUNwRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsZUFBZSxDQUFD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U0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDNUIsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBUyxDQUN6QixJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsRUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzlCLENBQUM7WUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksT0FBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxxQkFBUyxDQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDM0IsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBUyxDQUN2QixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDN0IsQ0FBQztRQUNOLENBQUM7UUFFRCxTQUFTLENBQUMsSUFBSTtZQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENB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QUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2pDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFFSCxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUNKO0lBdEdELDBCQXNHQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTMzNDE1ZmQyYmNjMzY3MDc3ODkiLCJcbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXIge1xuICAgIGFwcGx5Rm46ICh2YWx1ZTphbnkpID0+IHZvaWQ7XG4gICAgX3ZhbHVlOiBhbnk7XG4gICAgX2NoYW5nZWQ6ICgodmFsdWU6YW55KSA9PiB2b2lkKVtdO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWUsIGFwcGx5Rm4pIHtcbiAgICAgICAgaWYgKCEoYXBwbHlGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkgdGhyb3cgJ2FwcGx5Rm4gaXMgbm90IGFuIGluc3RhbmNlIG9mIEZ1bmN0aW9uISc7XG4gICAgICAgIHRoaXMuYXBwbHlGbiA9IGFwcGx5Rm47XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRDaGFuZ2VkRXZlbnQoY2hhbmdlZEZuKSB7XG4gICAgICAgIGlmICghKGNoYW5nZWRGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkgdGhyb3cgJ2NoYW5nZWRGbiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgRnVuY3Rpb24hJztcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5wdXNoKGNoYW5nZWRGbik7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5hcHBseVZhbHVlKCk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgYXBwbHlWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5hcHBseUZuKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoKSB7XG4gICAgICAgIGZvciAobGV0IGNoYW5nZWRGbiBvZiB0aGlzLl9jaGFuZ2VkKSB7XG4gICAgICAgICAgICBjaGFuZ2VkRm4odGhpcy5fdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BhcmFtZXRlci50cyIsImltcG9ydCB7IE1peGVyIH0gZnJvbSAnLi9taXhlcic7XHJcbmltcG9ydCB7IE1peGVyVUkgfSBmcm9tICcuL21peGVyLXVpJztcclxuXHJcbi8vIENyZWF0ZSBhbiBBdWRpb0NvbnRleHQ6XHJcbmxldCBhYyA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuXHJcbi8vIENyZWF0ZSBhIG1peGVyOlxyXG5sZXQgbWl4ZXIgPSBuZXcgTWl4ZXIoKTtcclxuXHJcbi8vIEZpbmQgb3VyIDxhdWRpbz4gZWxlbWVudDpcclxubGV0IG1jQXVkaW8gPSA8SFRNTE1lZGlhRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1jXCIpO1xyXG5sZXQgbWNTb3VyY2UgPSBhYy5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UobWNBdWRpbyk7XHJcbm1jU291cmNlLmNoYW5uZWxDb3VudE1vZGUgPSBcImV4cGxpY2l0XCI7XHJcbm1jU291cmNlLmNoYW5uZWxJbnRlcnByZXRhdGlvbiA9IFwiZGlzY3JldGVcIjtcclxuXHJcbmxldCBtaXggPSB7XHJcbiAgICBcInNvdXJjZUNoYW5uZWxzXCI6IDEyLFxyXG4gICAgXCJtYXN0ZXJcIjoge1xyXG4gICAgICAgIFwiX2dyYXBoaWNlcVwiOiB7XHJcbiAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMC45LFxyXG4gICAgICAgICAgICAgICAgMi4zLFxyXG4gICAgICAgICAgICAgICAgMy41LFxyXG4gICAgICAgICAgICAgICAgNS4xLFxyXG4gICAgICAgICAgICAgICAgNS4xLFxyXG4gICAgICAgICAgICAgICAgNS4xLFxyXG4gICAgICAgICAgICAgICAgNS4wLFxyXG4gICAgICAgICAgICAgICAgMy41LFxyXG4gICAgICAgICAgICAgICAgMS41LFxyXG4gICAgICAgICAgICAgICAgMC43LFxyXG4gICAgICAgICAgICAgICAgMS43LFxyXG4gICAgICAgICAgICAgICAgMi4zLFxyXG4gICAgICAgICAgICAgICAgMi4xXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtMy42XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxldmVsXCI6IDBcclxuICAgIH0sXHJcbiAgICBcInRyYWNrc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJWOk1HXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEzMCwgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE2MC4wMDAwMDAsIFwiZ2FpblwiOi00LjAwMDAwMCwgXCJxXCI6MS4wMzg4ODl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0MDAuMDAwMDAwLCBcImdhaW5cIjotNy43MzAwMDAsIFwicVwiOjAuODA0NjI0fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTg4NS4xNDgxNjUsIFwiZ2FpblwiOi0zLjcyMDQ4NiwgXCJxXCI6MS4wNjAwMjh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMTEzMi4yMDE2OTEsIFwiZ2FpblwiOi0yLjgwMjQ5NCwgXCJxXCI6MC44MDUxNTJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo5NjAwLCBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDUuOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTQ2LjIsXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDEuNixcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAxLjcsXHJcbiAgICAgICAgICAgICAgICBcImF0dGFja1wiOiAwLjAyOTAsXHJcbiAgICAgICAgICAgICAgICBcInJlbGVhc2VcIjogMC4wNTEsXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogMi44XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFuXCI6IDAsXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogLTguMzZcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiVjpKRFwiLFxyXG4gICAgICAgICAgICBcImVxXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYmFuZHNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMzAsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoyNDguMzQ2NTc0LCBcImdhaW5cIjotNS40NTg3MjIsIFwicVwiOjAuOTM2MDc0fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NjQzLjU2NDA4NiwgXCJnYWluXCI6LTYuODc3OTI5LCBcInFcIjowLjY2NjY2N30sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjIxOTguMjYyNTE2LCBcImdhaW5cIjotMi4wMTYzNDQsIFwicVwiOjEuMDYwMDI4fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTI1MzYuMjMxNzY2LCBcImdhaW5cIjotMi42NjA0ODIsIFwicVwiOjAuODA1MTUyfSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6OTYwMCwgXCJ0eXBlXCI6IFwibG93cGFzc1wifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiA1LjhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wcmVzc29yXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGhyZXNob2xkXCI6IC0zMi45LFxyXG4gICAgICAgICAgICAgICAgXCJyYXRpb1wiOiAxLjYsXHJcbiAgICAgICAgICAgICAgICBcImtuZWVcIjogNi4xLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMTIzLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDUwLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYW5cIjogMC4zMyxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtNi41MVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJHOk1HXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjIzMjUuOTMwMDAwLCBcImdhaW5cIjotNC4xNzEyOTksIFwicVwiOjIuNjQxMjc5fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NTAwMC4wMDAwMDAsIFwiZ2FpblwiOjUuOTQ1NTg3LCBcInFcIjoxLjYyOTU0OCwgXCJ0eXBlXCI6XCJoaWdoc2hlbGZcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhblwiOiAtMC44LFxyXG4gICAgICAgICAgICBcImxldmVsXCI6IC0wLjc1XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkc6SkRcIixcclxuICAgICAgICAgICAgXCJlcVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhbmRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MjMyNS45MzAwMDAsIFwiZ2FpblwiOi00LjE3MTI5OSwgXCJxXCI6Mi42NDEyNzl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo1MDAwLjAwMDAwMCwgXCJnYWluXCI6NS45NDU1ODcsIFwicVwiOjEuNjI5NTQ4LCBcInR5cGVcIjpcImhpZ2hzaGVsZlwifVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFuXCI6IDAuOCxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMC43NVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJCYXNzXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjQ0LjU2NDAwNCwgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjQzMy42OTUwNzcsIFwiZ2FpblwiOi0xMi4yMTg5NTcsIFwicVwiOjAuNTA3NDYxfSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6OTc0LjUyMDU1MSwgXCJnYWluXCI6MC4yNjI5MDIsIFwicVwiOjAuNjg4MDA3fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTkwMi41OTY5MTksIFwidHlwZVwiOiBcImxvd3Bhc3NcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogMy43XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcHJlc3NvclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRocmVzaG9sZFwiOiAtMzcuNSxcclxuICAgICAgICAgICAgICAgIFwicmF0aW9cIjogMS44LFxyXG4gICAgICAgICAgICAgICAgXCJrbmVlXCI6IDEuOCxcclxuICAgICAgICAgICAgICAgIFwiYXR0YWNrXCI6IDAuMDExMixcclxuICAgICAgICAgICAgICAgIFwicmVsZWFzZVwiOiAwLjA1MCxcclxuICAgICAgICAgICAgICAgIFwibWFrZXVwR2FpblwiOiAtMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxldmVsXCI6IC00LjVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiRDpLaWNrXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjExMCwgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEzMy4yNDkxNDQsIFwiZ2FpblwiOi0zLjk3Mjk0NywgXCJxXCI6MS41OTE4OTR9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo1NDQuODE4NjA2LCBcImdhaW5cIjotMTUuNTQzNzI1LCBcInFcIjowLjQ0NTU0OH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjQxNzkuMDU2MTQzLCBcImdhaW5cIjo0LjQ3NTExMCwgXCJxXCI6MC42NjY2Njd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjoxMTY4OS4zNzcyNjYsIFwicVwiOiAwLjkxOTEzNiwgIFwidHlwZVwiOiBcImxvd3Bhc3NcIn1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogNy41XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcHJlc3NvclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRocmVzaG9sZFwiOiAtMzQsXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDMuOCxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMTAzLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDI2LFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IC0zXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogMS40N1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJEOlNuYXJlXCIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjEyNS4xLCBcInR5cGVcIjogXCJoaWdocGFzc1wifSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MjYwLjIxMTgwMiwgXCJnYWluXCI6LTMuNDgwMzEyLCBcInFcIjoyLjE2MDI5NX0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjYxMi4yMDUyNzMsIFwiZ2FpblwiOi0xMC44ODg4ODksIFwicVwiOjAuNTUzODAzfSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6NjYyNS43ODM0MTMsIFwiZ2FpblwiOjMuNzMzMzMzLCBcInFcIjowLjY2NjY2N31cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBcIm1ha2V1cEdhaW5cIjogN1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTM2LjMsXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDMuMyxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMDg3LFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDU2LFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IC00LjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMC42MlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogXCJEOkhpZ2hUb21cIixcclxuICAgICAgICAgICAgXCJlcVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhbmRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTI2LjczNjA4NiwgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjM0MC4wMjkxMjAsIFwiZ2FpblwiOi01Ljg4OTI0NywgXCJxXCI6My42Nzg0ODl9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo1ODQuNDk3MjA4LCBcImdhaW5cIjotMTEuNjE5MDQ4LCBcInFcIjowLjM4MTIzMX0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjk5OTIuNDYwNjEzLCBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDYuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTI3LjksXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDIuMCxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMDk2LFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDUyLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IC00LjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYW5cIjogLTAuNCxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMC44XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkQ6Rmxvb3JUb21cIixcclxuICAgICAgICAgICAgXCJlcVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJhbmRzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTI3LjEzMDkyNywgXCJ0eXBlXCI6IFwiaGlnaHBhc3NcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjI4MC4zMjE2NjUsIFwiZ2FpblwiOi02Ljc3MTM4OSwgXCJxXCI6My4xMjMwNDh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0ODYuMjUxNzU3LCBcImdhaW5cIjotMTAuNjY2NjY3LCBcInFcIjowLjM4MTIzMX0sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjkyMjQuNjM3OTU1LCBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDYuNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTI3LjksXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDIuMCxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMDk2LFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMDUyLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IC00LjVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYW5cIjogMC42LFxyXG4gICAgICAgICAgICBcImxldmVsXCI6IC0wLjhcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiRDpPSFwiLFxyXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IDIsXHJcbiAgICAgICAgICAgIFwiZXFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJiYW5kc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE0OC45MzkwNzUsIFwidHlwZVwiOiBcImhpZ2hwYXNzXCJ9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcImZyZXFcIjo0MDUuNTQ1NzgwLCBcImdhaW5cIjotMTIuNTY2Nzg0LCBcInFcIjowLjQ1Mjg3M30sXHJcbiAgICAgICAgICAgICAgICAgICAge1wiZnJlcVwiOjE4MzguOTY5Mjc1LCBcImdhaW5cIjotNy40MDYzMDksIFwicVwiOjEuMTEwMzM2fSxcclxuICAgICAgICAgICAgICAgICAgICB7XCJmcmVxXCI6MTU0ODEuOTAyNDQ0LCBcInR5cGVcIjogXCJsb3dwYXNzXCJ9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IDcuOFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXByZXNzb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aHJlc2hvbGRcIjogLTM2LjgsXHJcbiAgICAgICAgICAgICAgICBcInJhdGlvXCI6IDEuOCxcclxuICAgICAgICAgICAgICAgIFwia25lZVwiOiAwLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRhY2tcIjogMC4wMDE4LFxyXG4gICAgICAgICAgICAgICAgXCJyZWxlYXNlXCI6IDAuMjc0LFxyXG4gICAgICAgICAgICAgICAgXCJtYWtldXBHYWluXCI6IC0yLjBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiAtMTQuNFxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBcInNvbmdzXCI6IFtcclxuICAgICAgICBcImJhc2tldC1jYXNlLm9wdXNcIlxyXG4gICAgXVxyXG59O1xyXG5cclxuLy8gU2V0IG1hc3RlciB0cmFjayBwcm9wZXJ0aWVzOlxyXG5pZiAobWl4Lm1hc3Rlcikge1xyXG4gICAgbWl4ZXIubWFzdGVyLmFwcGx5T3B0cyhtaXgubWFzdGVyKTtcclxufVxyXG5cclxuLy8gQWRkIGRlZmF1bHQgdHJhY2tzIHRvIG1peGVyOlxyXG5taXhlci5hZGRUcmFja3MobWl4LnRyYWNrcyk7XHJcblxyXG4vLyBCaW5kIG1peGVyIHRvIEF1ZGlvQ29udGV4dDpcclxubWl4ZXIuY3JlYXRlTm9kZXMoYWMpO1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBtaXhlciBVSTpcclxubmV3IE1peGVyVUkobWl4ZXIpLmluaXQoKTtcclxuXHJcbi8vIFRPRE86IHdvdWxkIGJlIG5pY2UgdG8gZGV0ZWN0IGNoYW5uZWwgY291bnQgZnJvbSBzb3VyY2UuXHJcbmxldCBzcGxpdHRlciA9IGFjLmNyZWF0ZUNoYW5uZWxTcGxpdHRlcihtaXguc291cmNlQ2hhbm5lbHMpO1xyXG50cnkge1xyXG4gICAgLy8gRm9yIG9sZGVyIHNwZWMgaW1wbGVtZW50YXRpb25zOlxyXG4gICAgc3BsaXR0ZXIuY2hhbm5lbENvdW50TW9kZSA9IFwibWF4XCI7XHJcbn0gY2F0Y2ggKGUpIHtcclxuICAgIHNwbGl0dGVyLmNoYW5uZWxDb3VudE1vZGUgPSBcImV4cGxpY2l0XCI7XHJcbn1cclxuc3BsaXR0ZXIuY2hhbm5lbEludGVycHJldGF0aW9uID0gXCJkaXNjcmV0ZVwiO1xyXG5tY1NvdXJjZS5jb25uZWN0KHNwbGl0dGVyKTtcclxuXHJcbi8vIFNwbGl0IG11bHRpY2hhbm5lbCBhdWRpbyBzb3VyY2UgaW50byBzdGVyZW8vbW9ubyB0cmFja3M6XHJcbmxldCBjID0gMDtcclxuZm9yIChsZXQgdHJhY2sgb2YgbWl4ZXIudHJhY2tzKSB7XHJcbiAgICAvLyBDb25uZWN0IG1lZGlhIG91dHB1dCB0byB0cmFjayBpbnB1dDpcclxuICAgIGxldCBtZXJnZXIgPSBhYy5jcmVhdGVDaGFubmVsTWVyZ2VyKDIpO1xyXG4gICAgbWVyZ2VyLmNoYW5uZWxDb3VudE1vZGUgPSBcImV4cGxpY2l0XCI7XHJcbiAgICBtZXJnZXIuY2hhbm5lbEludGVycHJldGF0aW9uID0gXCJkaXNjcmV0ZVwiO1xyXG5cclxuICAgIGlmICh0cmFjay5jaGFubmVscyA9PSAyKSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIHN0ZXJlbywgc28gY29weSBsZWZ0L3JpZ2h0IGNoYW5uZWxzIGluZGVwZW5kZW50bHk6XHJcbiAgICAgICAgc3BsaXR0ZXIuY29ubmVjdChtZXJnZXIsIGMrKywgMCk7XHJcbiAgICAgICAgc3BsaXR0ZXIuY29ubmVjdChtZXJnZXIsIGMrKywgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBtb25vLCBzbyBjb3B5IHNpbmdsZSBpbnB1dCBjaGFubmVsIHRvIGJvdGggb3V0cHV0IGNoYW5uZWxzOlxyXG4gICAgICAgIHNwbGl0dGVyLmNvbm5lY3QobWVyZ2VyLCBjLCAwKTtcclxuICAgICAgICBzcGxpdHRlci5jb25uZWN0KG1lcmdlciwgYywgMSk7XHJcbiAgICAgICAgYysrO1xyXG4gICAgfVxyXG4gICAgbWVyZ2VyLmNvbm5lY3QodHJhY2suaW5wdXROb2RlKTtcclxufVxyXG5cclxubWNBdWRpby5zcmMgPSBtaXguc29uZ3NbMF07XHJcbm1jQXVkaW8ubG9vcCA9IHRydWU7XHJcbi8vbWNBdWRpby5wbGF5KCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWluLnRzIiwiaW1wb3J0IHsgVHJhY2sgfSBmcm9tICcuL3RyYWNrJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXhlciB7XHJcbiAgICBfbWFzdGVyOiBUcmFjaztcclxuICAgIF90cmFja3M6IFRyYWNrW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fbWFzdGVyID0gbmV3IFRyYWNrKHRoaXMsIHtuYW1lOiBcIk1BU1RFUlwifSk7XHJcbiAgICAgICAgdGhpcy5fdHJhY2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVHJhY2tzKHRyYWNrT3B0cykge1xyXG4gICAgICAgIHRoaXMuX3RyYWNrcyA9IHRoaXMuX3RyYWNrcy5jb25jYXQoXHJcbiAgICAgICAgICAgIHRyYWNrT3B0c1xyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihvcHRzID0+IG9wdHMubmFtZSAhPT0gXCJNQVNURVJcIilcclxuICAgICAgICAgICAgICAgIC5tYXAob3B0cyA9PiBuZXcgVHJhY2sodGhpcywgb3B0cykpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb2RlcyhhYykge1xyXG4gICAgICAgIC8vIENyZWF0ZSBtYXN0ZXIgdHJhY2s6XHJcbiAgICAgICAgdGhpcy5tYXN0ZXIuY3JlYXRlTm9kZXMoYWMpO1xyXG5cclxuICAgICAgICAvLyBDb25uZWN0IHRyYWNrcyB0byBtYXN0ZXIgaW5wdXQ6XHJcbiAgICAgICAgZm9yIChsZXQgdHJhY2sgb2YgdGhpcy5fdHJhY2tzKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0cmFjayBGWCBjaGFpbjpcclxuICAgICAgICAgICAgdHJhY2suY3JlYXRlTm9kZXMoYWMpO1xyXG4gICAgICAgICAgICAvLyBDb25uZWN0IHRyYWNrIEZYIGNoYWluIHRvIG1hc3RlciB0cmFjaydzIGlucHV0OlxyXG4gICAgICAgICAgICB0cmFjay5vdXRwdXROb2RlLmNvbm5lY3QodGhpcy5tYXN0ZXIuaW5wdXROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbm5lY3QgbWl4ZXIgbWFzdGVyIG91dCB0byBkZXN0aW5hdGlvbjpcclxuICAgICAgICB0aGlzLm1hc3Rlci5vdXRwdXROb2RlLmNvbm5lY3QoYWMuZGVzdGluYXRpb24pO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHNvbG8vbXV0ZSBmb3IgYWxsIHRyYWNrczpcclxuICAgICAgICB0aGlzLmFwcGx5U29sbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrKG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZSA9PSBcIk1BU1RFUlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc3RlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrcy5maW5kKHRyID0+IHRyLm5hbWUgPT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1hc3RlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFzdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYW55U29sb2VkVHJhY2tzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3Muc29tZSh0ciA9PiB0ci5zb2xvLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdW5zb2xvZWRUcmFja3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrcy5maWx0ZXIodHIgPT4gIXRyLnNvbG8udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzb2xvZWRUcmFja3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrcy5maWx0ZXIodHIgPT4gdHIuc29sby52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlTb2xvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFueVNvbG9lZFRyYWNrcykge1xyXG4gICAgICAgICAgICB0aGlzLnVuc29sb2VkVHJhY2tzLmZvckVhY2godHIgPT4gdHIuc29sb011dGUudmFsdWUgPSB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5zb2xvZWRUcmFja3MuZm9yRWFjaCh0ciA9PiB0ci5zb2xvTXV0ZS52YWx1ZSA9IGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFja3MuZm9yRWFjaCh0ciA9PiB0ci5zb2xvTXV0ZS52YWx1ZSA9IGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21peGVyLnRzIiwiaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi9wYXJhbWV0ZXInO1xyXG5pbXBvcnQgeyBNaXhlciB9IGZyb20gJy4vbWl4ZXInO1xyXG5pbXBvcnQgeyBFUSB9IGZyb20gJy4vZXEnO1xyXG5pbXBvcnQgeyBDb21wcmVzc29yIH0gZnJvbSAnLi9jb21wcmVzc29yJztcclxuaW1wb3J0IHsgR3JhcGhpY0VRIH0gZnJvbSAnLi9ncmFwaGljZXEnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWNrIHtcclxuICAgIHByaXZhdGUgbWl4ZXI6IE1peGVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgY2hhbm5lbHM6IG51bWJlcjtcclxuICAgIG9wdHM6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9zb2xvTXV0ZTogUGFyYW1ldGVyO1xyXG4gICAgcHJpdmF0ZSBfbXV0ZTogUGFyYW1ldGVyO1xyXG4gICAgcHJpdmF0ZSBfc29sbzogUGFyYW1ldGVyO1xyXG4gICAgcHJpdmF0ZSBfaW5fZ2FpbjogUGFyYW1ldGVyO1xyXG4gICAgX2VxOiBFUTtcclxuICAgIF9jb21wcmVzc29yOiBDb21wcmVzc29yO1xyXG4gICAgX2dyYXBoaWNlcTogR3JhcGhpY0VRO1xyXG4gICAgcHJpdmF0ZSBfcGFuOiBQYXJhbWV0ZXI7XHJcbiAgICBwcml2YXRlIF9sZXZlbDogUGFyYW1ldGVyO1xyXG5cclxuICAgIHByaXZhdGUgc29sb011dGVOb2RlOiBHYWluTm9kZTtcclxuICAgIHByaXZhdGUgbXV0ZU5vZGU6IEdhaW5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpbkdhaW5Ob2RlOiBHYWluTm9kZTtcclxuICAgIHByaXZhdGUgcGFubmVyTm9kZTogU3RlcmVvUGFubmVyTm9kZTtcclxuICAgIHByaXZhdGUgb3V0R2Fpbk5vZGU6IEdhaW5Ob2RlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG1peGVyLCBvcHRzKSB7XHJcbiAgICAgICAgdGhpcy5taXhlciA9IG1peGVyO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG9wdHMubmFtZTtcclxuICAgICAgICB0aGlzLmNoYW5uZWxzID0gb3B0cy5jaGFubmVscyB8fCAxO1xyXG5cclxuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xyXG5cclxuICAgICAgICB0aGlzLl9zb2xvTXV0ZSA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICB0aGlzLmFwcGx5U29sb011dGUuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fbXV0ZSA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIG9wdHMubXV0ZSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcy5hcHBseU11dGUuYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fc29sbyA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIG9wdHMuc29sbyB8fCBmYWxzZSxcclxuICAgICAgICAgICAgdGhpcy5hcHBseVNvbG8uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5faW5fZ2FpbiA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIG9wdHMuaW5fZ2FpbiB8fCAwLFxyXG4gICAgICAgICAgICB0aGlzLmFwcGx5SW5HYWluLmJpbmQodGhpcylcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuX2VxID0gbmV3IEVRKG9wdHMuZXEgfHwge30pO1xyXG4gICAgICAgIHRoaXMuX2NvbXByZXNzb3IgPSBuZXcgQ29tcHJlc3NvcihvcHRzLmNvbXByZXNzb3IgfHwge30pO1xyXG4gICAgICAgIHRoaXMuX2dyYXBoaWNlcSA9IG5ldyBHcmFwaGljRVEob3B0cy5ncmFwaGljZXEgfHwge30pO1xyXG4gICAgICAgIHRoaXMuX3BhbiA9IG5ldyBQYXJhbWV0ZXIoXHJcbiAgICAgICAgICAgIG9wdHMucGFuIHx8IDAsXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYW4uYmluZCh0aGlzKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSBuZXcgUGFyYW1ldGVyKFxyXG4gICAgICAgICAgICBvcHRzLmxldmVsIHx8IDAsXHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlMZXZlbC5iaW5kKHRoaXMpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseU9wdHMob3B0cykge1xyXG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5tdXRlLnZhbHVlID0gb3B0cy5tdXRlIHx8IHRoaXMubXV0ZS52YWx1ZTtcclxuICAgICAgICB0aGlzLnNvbG8udmFsdWUgPSBvcHRzLnNvbG8gfHwgdGhpcy5zb2xvLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5HYWluLnZhbHVlID0gb3B0cy5pbl9nYWluIHx8IHRoaXMuaW5HYWluLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuZXEuYXBwbHlPcHRzKG9wdHMuZXEgfHwge30pO1xyXG4gICAgICAgIHRoaXMuY29tcHJlc3Nvci5hcHBseU9wdHMob3B0cy5jb21wcmVzc29yIHx8IHt9KTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNlcS5hcHBseU9wdHMob3B0cy5ncmFwaGljZXEgfHwge30pO1xyXG4gICAgICAgIHRoaXMucGFuLnZhbHVlID0gb3B0cy5wYW4gfHwgdGhpcy5wYW4udmFsdWU7XHJcbiAgICAgICAgdGhpcy5sZXZlbC52YWx1ZSA9IG9wdHMubGV2ZWwgfHwgdGhpcy5sZXZlbC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb2RlcyhhYyAvKjogQXVkaW9Db250ZXh0ICovKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgbm9kZXM6XHJcbiAgICAgICAgdGhpcy5zb2xvTXV0ZU5vZGUgPSBhYy5jcmVhdGVHYWluKCk7XHJcbiAgICAgICAgdGhpcy5tdXRlTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcclxuICAgICAgICB0aGlzLmluR2Fpbk5vZGUgPSBhYy5jcmVhdGVHYWluKCk7XHJcbiAgICAgICAgdGhpcy5wYW5uZXJOb2RlID0gYWMuY3JlYXRlU3RlcmVvUGFubmVyKCk7XHJcbiAgICAgICAgdGhpcy5vdXRHYWluTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcclxuXHJcbiAgICAgICAgLy8gQ29ubmVjdCBvcHRpb25hbCBjb21wb25lbnRzOlxyXG4gICAgICAgIGxldCBmeEluTm9kZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGZ4T3V0Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0cy5lcSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lcS5jcmVhdGVOb2RlcyhhYyk7XHJcbiAgICAgICAgICAgIGZ4SW5Ob2RlID0gdGhpcy5fZXEuaW5wdXROb2RlO1xyXG4gICAgICAgICAgICBmeE91dE5vZGUgPSB0aGlzLl9lcS5vdXRwdXROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5vcHRzLmNvbXByZXNzb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29tcHJlc3Nvci5jcmVhdGVOb2RlcyhhYyk7XHJcbiAgICAgICAgICAgIGlmIChmeEluTm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZnhJbk5vZGUgPSB0aGlzLl9jb21wcmVzc29yLmlucHV0Tm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZ4T3V0Tm9kZS5jb25uZWN0KHRoaXMuX2NvbXByZXNzb3IuaW5wdXROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmeE91dE5vZGUgPSB0aGlzLl9jb21wcmVzc29yLm91dHB1dE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm9wdHMuZ3JhcGhpY2VxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoaWNlcS5jcmVhdGVOb2RlcyhhYyk7XHJcbiAgICAgICAgICAgIGlmIChmeEluTm9kZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZnhJbk5vZGUgPSB0aGlzLl9ncmFwaGljZXEuaW5wdXROb2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnhPdXROb2RlLmNvbm5lY3QodGhpcy5fZ3JhcGhpY2VxLmlucHV0Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnhPdXROb2RlID0gdGhpcy5fZ3JhcGhpY2VxLm91dHB1dE5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb25uZWN0IG5vZGVzOlxyXG4gICAgICAgIHRoaXMuc29sb011dGVOb2RlLmNvbm5lY3QodGhpcy5tdXRlTm9kZSk7XHJcbiAgICAgICAgdGhpcy5tdXRlTm9kZS5jb25uZWN0KHRoaXMuaW5HYWluTm9kZSk7XHJcbiAgICAgICAgaWYgKGZ4SW5Ob2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5HYWluTm9kZS5jb25uZWN0KGZ4SW5Ob2RlKTtcclxuICAgICAgICAgICAgZnhPdXROb2RlLmNvbm5lY3QodGhpcy5wYW5uZXJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluR2Fpbk5vZGUuY29ubmVjdCh0aGlzLnBhbm5lck5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhbm5lck5vZGUuY29ubmVjdCh0aGlzLm91dEdhaW5Ob2RlKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHByb3BlcnRpZXM6XHJcbiAgICAgICAgdGhpcy5hcHBseVNvbG9NdXRlKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseU11dGUoKTtcclxuICAgICAgICB0aGlzLmFwcGx5SW5HYWluKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseVBhbigpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlMZXZlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpbnB1dE5vZGUoKSB7IHJldHVybiB0aGlzLnNvbG9NdXRlTm9kZTsgfVxyXG4gICAgZ2V0IG91dHB1dE5vZGUoKSB7IHJldHVybiB0aGlzLm91dEdhaW5Ob2RlOyB9XHJcblxyXG4gICAgZ2V0IGluR2FpbigpIHsgcmV0dXJuIHRoaXMuX2luX2dhaW47IH1cclxuICAgIGFwcGx5SW5HYWluKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5HYWluTm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaW5HYWluTm9kZS5nYWluLnZhbHVlID0gZEJfdG9fZ2Fpbih0aGlzLl9pbl9nYWluLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbXV0ZSgpIHsgcmV0dXJuIHRoaXMuX211dGU7IH1cclxuICAgIGFwcGx5TXV0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubXV0ZU5vZGUpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fc29sby52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGVOb2RlLmdhaW4udmFsdWUgPSAxO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0ZU5vZGUuZ2Fpbi52YWx1ZSA9IHRoaXMuX211dGUudmFsdWUgPyAwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc29sbygpIHsgcmV0dXJuIHRoaXMuX3NvbG87IH1cclxuICAgIGFwcGx5U29sbygpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWl4ZXIpIHJldHVybjtcclxuICAgICAgICB0aGlzLm1peGVyLmFwcGx5U29sbygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzb2xvTXV0ZSgpIHsgcmV0dXJuIHRoaXMuX3NvbG9NdXRlOyB9XHJcbiAgICBhcHBseVNvbG9NdXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zb2xvTXV0ZU5vZGUpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fc29sby52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGVOb2RlLmdhaW4udmFsdWUgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNdXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc29sb011dGVOb2RlLmdhaW4udmFsdWUgPSB0aGlzLl9zb2xvTXV0ZS52YWx1ZSA/IDAgOiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlcSgpIHsgcmV0dXJuIHRoaXMuX2VxOyB9XHJcbiAgICBnZXQgY29tcHJlc3NvcigpIHsgcmV0dXJuIHRoaXMuX2NvbXByZXNzb3I7IH1cclxuICAgIGdldCBncmFwaGljZXEoKSB7IHJldHVybiB0aGlzLl9ncmFwaGljZXE7IH1cclxuXHJcbiAgICBnZXQgcGFuKCkgeyByZXR1cm4gdGhpcy5fcGFuOyB9XHJcbiAgICBhcHBseVBhbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFubmVyTm9kZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucGFubmVyTm9kZS5wYW4udmFsdWUgPSB0aGlzLl9wYW4udmFsdWU7XHJcbiAgICAgICAgdGhpcy5hcHBseUxldmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxldmVsKCkgeyByZXR1cm4gdGhpcy5fbGV2ZWw7IH1cclxuICAgIGFwcGx5TGV2ZWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm91dEdhaW5Ob2RlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRCID0gdGhpcy5fbGV2ZWwudmFsdWU7XHJcbiAgICAgICAgLy8gRGVjcmVhc2UgYXBwYXJlbnQgbGV2ZWwgZGVwZW5kaW5nIG9uIHBhbjpcclxuICAgICAgICBkQiArPSBNYXRoLmFicyh0aGlzLl9wYW4udmFsdWUpICogLTYuMDtcclxuICAgICAgICB0aGlzLm91dEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBkQl90b19nYWluKGRCKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHJhY2sudHMiLCJcbmV4cG9ydCBjbGFzcyBFUSB7XG4gICAgb3B0czogYW55O1xuICAgIGlucHV0Tm9kZTogQXVkaW9Ob2RlO1xuICAgIG91dHB1dE5vZGU6IEF1ZGlvTm9kZTtcblxuICAgIGJhbmROb2RlczogQmlxdWFkRmlsdGVyTm9kZVtdO1xuICAgIHByaXZhdGUgbWFrZXVwR2Fpbk5vZGU6IEdhaW5Ob2RlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgIH1cblxuICAgIGFwcGx5T3B0cyhvcHRzKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcbiAgICB9XG5cbiAgICBjcmVhdGVOb2RlcyhhYykge1xuICAgICAgICBsZXQgaW5wdXROb2RlID0gbnVsbDtcbiAgICAgICAgbGV0IG91dHB1dE5vZGUgPSBudWxsO1xuICAgICAgICBsZXQgYmFuZE5vZGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgYmFuZCBvZiB0aGlzLm9wdHMuYmFuZHMgfHwgW10pIHtcbiAgICAgICAgICAgIGxldCBiYW5kTm9kZSA9IGFjLmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICAgICAgYmFuZE5vZGVzLnB1c2goYmFuZE5vZGUpO1xuXG4gICAgICAgICAgICBiYW5kTm9kZS50eXBlID0gYmFuZC50eXBlIHx8IFwicGVha2luZ1wiO1xuICAgICAgICAgICAgYmFuZE5vZGUuZnJlcXVlbmN5LnZhbHVlID0gYmFuZC5mcmVxO1xuICAgICAgICAgICAgYmFuZE5vZGUuUS52YWx1ZSA9IGJhbmQucSB8fCAwLjY2NjY2NztcbiAgICAgICAgICAgIGJhbmROb2RlLmdhaW4udmFsdWUgPSBiYW5kLmdhaW4gfHwgMDtcblxuICAgICAgICAgICAgaWYgKGlucHV0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlucHV0Tm9kZSA9IGJhbmROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRwdXROb2RlLmNvbm5lY3QoYmFuZE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0Tm9kZSA9IGJhbmROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0cy5tYWtldXBHYWluKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2V1cEdhaW5Ob2RlID0gYWMuY3JlYXRlR2FpbigpO1xuICAgICAgICAgICAgdGhpcy5tYWtldXBHYWluTm9kZS5nYWluLnZhbHVlID0gZEJfdG9fZ2Fpbih0aGlzLm9wdHMubWFrZXVwR2Fpbik7XG4gICAgICAgICAgICBpZiAob3V0cHV0Tm9kZSkge1xuICAgICAgICAgICAgICAgIG91dHB1dE5vZGUuY29ubmVjdCh0aGlzLm1ha2V1cEdhaW5Ob2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dE5vZGUgPSB0aGlzLm1ha2V1cEdhaW5Ob2RlO1xuICAgICAgICAgICAgaWYgKGlucHV0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlucHV0Tm9kZSA9IG91dHB1dE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0Tm9kZSA9IGlucHV0Tm9kZTtcbiAgICAgICAgdGhpcy5vdXRwdXROb2RlID0gb3V0cHV0Tm9kZTtcbiAgICAgICAgdGhpcy5iYW5kTm9kZXMgPSBiYW5kTm9kZXM7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VxLnRzIiwiaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnLi9wYXJhbWV0ZXInO1xuXG5leHBvcnQgY2xhc3MgQ29tcHJlc3NvciB7XG4gICAgb3B0czogYW55O1xuICAgIF90aHJlc2hvbGQ6IFBhcmFtZXRlcjtcbiAgICBfcmF0aW86IFBhcmFtZXRlcjtcbiAgICBfa25lZTogUGFyYW1ldGVyO1xuICAgIF9hdHRhY2s6IFBhcmFtZXRlcjtcbiAgICBfcmVsZWFzZTogUGFyYW1ldGVyO1xuICAgIF9tYWtldXBHYWluOiBQYXJhbWV0ZXI7XG5cbiAgICBwcml2YXRlIGNvbXBOb2RlOiBEeW5hbWljc0NvbXByZXNzb3JOb2RlO1xuICAgIHByaXZhdGUgbWFrZXVwR2Fpbk5vZGU6IEdhaW5Ob2RlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuXG4gICAgICAgIHRoaXMuX3RocmVzaG9sZCA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLnRocmVzaG9sZCB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS50aHJlc2hvbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9yYXRpbyA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLnJhdGlvIHx8IDAsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29tcE5vZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBOb2RlLnJhdGlvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fa25lZSA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLmtuZWUgfHwgMCxcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb21wTm9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcE5vZGUua25lZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuX2F0dGFjayA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLmF0dGFjayB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS5hdHRhY2sudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9yZWxlYXNlID0gbmV3IFBhcmFtZXRlcihcbiAgICAgICAgICAgIG9wdHMucmVsZWFzZSB8fCAwLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wTm9kZS5yZWxlYXNlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fbWFrZXVwR2FpbiA9IG5ldyBQYXJhbWV0ZXIoXG4gICAgICAgICAgICBvcHRzLm1ha2V1cEdhaW4gfHwgMCxcbiAgICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYWtldXBHYWluTm9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMubWFrZXVwR2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IGRCX3RvX2dhaW4odmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFwcGx5T3B0cyhvcHRzKSB7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcblxuICAgICAgICB0aGlzLnRocmVzaG9sZC52YWx1ZSA9IG9wdHMudGhyZXNob2xkIHx8IHRoaXMudGhyZXNob2xkLnZhbHVlO1xuICAgICAgICB0aGlzLnJhdGlvLnZhbHVlID0gb3B0cy5yYXRpbyB8fCB0aGlzLnJhdGlvLnZhbHVlO1xuICAgICAgICB0aGlzLmtuZWUudmFsdWUgPSBvcHRzLmtuZWUgfHwgdGhpcy5rbmVlLnZhbHVlO1xuICAgICAgICB0aGlzLmF0dGFjay52YWx1ZSA9IG9wdHMuYXR0YWNrIHx8IHRoaXMuYXR0YWNrLnZhbHVlO1xuICAgICAgICB0aGlzLnJlbGVhc2UudmFsdWUgPSBvcHRzLnJlbGVhc2UgfHwgdGhpcy5yZWxlYXNlLnZhbHVlO1xuICAgICAgICB0aGlzLm1ha2V1cEdhaW4udmFsdWUgPSBvcHRzLm1ha2V1cEdhaW4gfHwgdGhpcy5tYWtldXBHYWluLnZhbHVlO1xuICAgIH1cblxuICAgIGNyZWF0ZU5vZGVzKGFjKSB7XG4gICAgICAgIHRoaXMuY29tcE5vZGUgPSBhYy5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcbiAgICAgICAgdGhpcy5tYWtldXBHYWluTm9kZSA9IGFjLmNyZWF0ZUdhaW4oKTtcblxuICAgICAgICB0aGlzLmNvbXBOb2RlLmNvbm5lY3QodGhpcy5tYWtldXBHYWluTm9kZSk7XG5cbiAgICAgICAgdGhpcy50aHJlc2hvbGQuYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJhdGlvLmFwcGx5VmFsdWUoKTtcbiAgICAgICAgdGhpcy5rbmVlLmFwcGx5VmFsdWUoKTtcbiAgICAgICAgdGhpcy5hdHRhY2suYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLnJlbGVhc2UuYXBwbHlWYWx1ZSgpO1xuICAgICAgICB0aGlzLm1ha2V1cEdhaW4uYXBwbHlWYWx1ZSgpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dE5vZGUoKSB7IHJldHVybiB0aGlzLmNvbXBOb2RlOyB9XG4gICAgZ2V0IG91dHB1dE5vZGUoKSB7IHJldHVybiB0aGlzLm1ha2V1cEdhaW5Ob2RlOyB9XG5cbiAgICBnZXQgdGhyZXNob2xkKCkgeyByZXR1cm4gdGhpcy5fdGhyZXNob2xkOyB9XG4gICAgZ2V0IHJhdGlvKCkgeyByZXR1cm4gdGhpcy5fcmF0aW87IH1cbiAgICBnZXQga25lZSgpIHsgcmV0dXJuIHRoaXMuX2tuZWU7IH1cbiAgICBnZXQgYXR0YWNrKCkgeyByZXR1cm4gdGhpcy5fYXR0YWNrOyB9XG4gICAgZ2V0IHJlbGVhc2UoKSB7IHJldHVybiB0aGlzLl9yZWxlYXNlOyB9XG4gICAgZ2V0IG1ha2V1cEdhaW4oKSB7IHJldHVybiB0aGlzLl9tYWtldXBHYWluOyB9XG5cbiAgICBnZXQgZ2FpblJlZHVjdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBOb2RlKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcE5vZGUucmVkdWN0aW9uO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXByZXNzb3IudHMiLCJcbmV4cG9ydCBjbGFzcyBHcmFwaGljRVEge1xuICAgIG9wdHM6IGFueTtcbiAgICBpbnB1dE5vZGU6IEF1ZGlvTm9kZTtcbiAgICBvdXRwdXROb2RlOiBBdWRpb05vZGU7XG5cbiAgICBiYW5kTm9kZXM6IEJpcXVhZEZpbHRlck5vZGVbXTtcbiAgICBwcml2YXRlIG1ha2V1cEdhaW5Ob2RlOiBHYWluTm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICB9XG5cbiAgICBhcHBseU9wdHMob3B0cykge1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgb3B0cyk7XG4gICAgfVxuXG4gICAgY3JlYXRlTm9kZXMoYWMpIHtcbiAgICAgICAgbGV0IGlucHV0Tm9kZSA9IG51bGw7XG4gICAgICAgIGxldCBvdXRwdXROb2RlID0gbnVsbDtcbiAgICAgICAgbGV0IGJhbmROb2RlcyA9IFtdO1xuXG4gICAgICAgIGxldCBiYW5kQ291bnQgPSB0aGlzLm9wdHMuYmFuZENvdW50IHx8IDE2O1xuICAgICAgICBpZiAoYmFuZENvdW50IDwgMSkge1xuICAgICAgICAgICAgYmFuZENvdW50ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBiYW5kcyA9IHRoaXMub3B0cy5iYW5kcyB8fCBbXTtcbiAgICAgICAgbGV0IG4gPSAwO1xuICAgICAgICBsZXQgcSA9IE1hdGgubG9nMigzKTtcblxuICAgICAgICBmb3IgKGxldCBnYWluIG9mIGJhbmRzKSB7XG4gICAgICAgICAgICBsZXQgYmFuZE5vZGUgPSBhYy5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICAgICAgICAgIGJhbmROb2Rlcy5wdXNoKGJhbmROb2RlKTtcblxuICAgICAgICAgICAgYmFuZE5vZGUudHlwZSA9IFwicGVha2luZ1wiO1xuICAgICAgICAgICAgYmFuZE5vZGUuZnJlcXVlbmN5LnZhbHVlID0gTWF0aC5wb3cocSwgbikgKiAyMDtcbiAgICAgICAgICAgIC8vIHNlZTogaHR0cDovL3d3dy5yYW5lLmNvbS9ub3RlMTAxLmh0bWxcbiAgICAgICAgICAgIC8vIFEgPSBmIC8gKGYgKiBNYXRoLnBvdygyLCAxLzYpIC0gZiAqIE1hdGgucG93KDIsIC0xLzYpKVxuICAgICAgICAgICAgYmFuZE5vZGUuUS52YWx1ZSA9IDQuMzE4NDczMDQ2OTYzMTQ2O1xuICAgICAgICAgICAgYmFuZE5vZGUuZ2Fpbi52YWx1ZSA9IGdhaW47XG5cbiAgICAgICAgICAgIG4rKztcblxuICAgICAgICAgICAgaWYgKGlucHV0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlucHV0Tm9kZSA9IGJhbmROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRwdXROb2RlLmNvbm5lY3QoYmFuZE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0Tm9kZSA9IGJhbmROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0cy5tYWtldXBHYWluKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2V1cEdhaW5Ob2RlID0gYWMuY3JlYXRlR2FpbigpO1xuICAgICAgICAgICAgdGhpcy5tYWtldXBHYWluTm9kZS5nYWluLnZhbHVlID0gZEJfdG9fZ2Fpbih0aGlzLm9wdHMubWFrZXVwR2Fpbik7XG4gICAgICAgICAgICBpZiAob3V0cHV0Tm9kZSkge1xuICAgICAgICAgICAgICAgIG91dHB1dE5vZGUuY29ubmVjdCh0aGlzLm1ha2V1cEdhaW5Ob2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dE5vZGUgPSB0aGlzLm1ha2V1cEdhaW5Ob2RlO1xuICAgICAgICAgICAgaWYgKGlucHV0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlucHV0Tm9kZSA9IG91dHB1dE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlucHV0Tm9kZSA9IGlucHV0Tm9kZTtcbiAgICAgICAgdGhpcy5vdXRwdXROb2RlID0gb3V0cHV0Tm9kZTtcbiAgICAgICAgdGhpcy5iYW5kTm9kZXMgPSBiYW5kTm9kZXM7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dyYXBoaWNlcS50cyIsIlxyXG5pbXBvcnQgeyBNaXhlciB9IGZyb20gJy4vbWl4ZXInO1xyXG5cclxuLy8gRGVmaW5lIG1heGltdW0gZ2FpbiBhdCB0aGUgdG9wIG9mIHRoZSBmYWRlciByYW5nZSBbMC4uMV06XHJcbmNvbnN0IGZhZGVyTWF4R2FpbiA9IGRCX3RvX2dhaW4oMTIpO1xyXG5cclxuLy8gQ29udmVydCBmcm9tIGRCIHRvIGZhZGVyIHJhbmdlIFswLi4xXTpcclxuZnVuY3Rpb24gZEJfdG9fZmFkZXIoZEI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoZEIgPT0gLUluZmluaXR5KSByZXR1cm4gMC4wO1xyXG4gICAgbGV0IGdhaW4gPSBkQl90b19nYWluKGRCKSAqIDIuMCAvIGZhZGVyTWF4R2FpbjtcclxuICAgIGxldCBmYWRlciA9IE1hdGgucG93KCg2LjAgKiBNYXRoLmxvZyhnYWluKSAvIE1hdGgubG9nKDIuMCkgKyAxOTIuMCkgLyAxOTguMCwgOC4wKTtcclxuICAgIHJldHVybiBmYWRlcjtcclxufVxyXG5cclxuLy8gRGVmaW5lIGEgemVyby12YWx1ZSBvbiB0aGUgZmFkZXIgWzAuLjFdIHNjYWxlOlxyXG5jb25zdCBmYWRlclplcm8gPSBkQl90b19mYWRlcigwKTtcclxuXHJcbi8vIENvbnZlcnQgZnJvbSBmYWRlciByYW5nZSBbMC4uMV0gdG8gZEI6XHJcbmZ1bmN0aW9uIGZhZGVyX3RvX2RCKGZhZGVyKSB7XHJcbiAgICBpZiAoZmFkZXIgPT0gMC4wKSByZXR1cm4gLUluZmluaXR5O1xyXG4gICAgaWYgKE1hdGguYWJzKGZhZGVyIC0gZmFkZXJaZXJvKSA8IDFlLTYpIHJldHVybiAwO1xyXG4gICAgbGV0IGdhaW4gPSBNYXRoLmV4cCgoKE1hdGgucG93KGZhZGVyLCAxLjAgLyA4LjApICogMTk4LjApIC0gMTkyLjApIC8gNi4wICogTWF0aC5sb2coMi4wKSkgKiBmYWRlck1heEdhaW4gLyAyLjA7XHJcbiAgICBsZXQgZEIgPSBnYWluX3RvX2RCKGdhaW4pO1xyXG4gICAgcmV0dXJuIGRCO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3aXRoRXhhY3REaWdpdHModmFsdWUsIG1heERpZ2l0cykge1xyXG4gICAgbGV0IHMgPSB2YWx1ZS50b1ByZWNpc2lvbihtYXhEaWdpdHMpO1xyXG4gICAgaWYgKHMgPT0gXCItSW5maW5pdHlcIikge1xyXG4gICAgICAgIHMgPSBcIi1pbmZcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gT25seSBzaG93IG1heERpZ2l0cyB0b3RhbCBkaWdpdHMgaW5jbHVkaW5nIDBzOlxyXG4gICAgICAgIGxldCBkaWdpdHMgPSAwLCBuID0gMDtcclxuICAgICAgICBmb3IgKGxldCBjIG9mIHMpIHtcclxuICAgICAgICAgICAgaWYgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XHJcbiAgICAgICAgICAgICAgICBkaWdpdHMrKztcclxuICAgICAgICAgICAgICAgIGlmIChkaWdpdHMgPj0gbWF4RGlnaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyA9IHMuc2xpY2UoMCwgbisxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxldmVsRm9ybWF0KGRCKSB7XHJcbiAgICByZXR1cm4gYCR7d2l0aEV4YWN0RGlnaXRzKGRCLDMpfSBkQmA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNaXhlclVJIHtcclxuICAgIG1peGVyOiBNaXhlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtaXhlcikge1xyXG4gICAgICAgIHRoaXMubWl4ZXIgPSBtaXhlcjtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0Zyb21EZXNjZW5kZW50KGVsKSB7XHJcbiAgICAgICAgbGV0IHRyYWNrRWwgPSBlbC5jbG9zZXN0KFwiZGl2LnRyYWNrXCIpO1xyXG4gICAgICAgIGxldCB0cmFja05hbWUgPSB0cmFja0VsLmdldEF0dHJpYnV0ZShcImRhdGEtdHJhY2tcIik7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy5taXhlci50cmFjayh0cmFja05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0cmFjaztcclxuICAgIH1cclxuXHJcbiAgICBmYWRlcklucHV0SGFuZGxlcihlKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja0Zyb21EZXNjZW5kZW50KGVsKTtcclxuXHJcbiAgICAgICAgbGV0IGZhZGVyID0gZWwudmFsdWU7XHJcbiAgICAgICAgbGV0IGRCID0gZmFkZXJfdG9fZEIoZmFkZXIpO1xyXG4gICAgICAgIHRyYWNrLmxldmVsLnZhbHVlID0gZEI7XHJcbiAgICB9XHJcblxyXG4gICAgbXV0ZUlucHV0SGFuZGxlcihlKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja0Zyb21EZXNjZW5kZW50KGVsKTtcclxuXHJcbiAgICAgICAgbGV0IG11dGUgPSBlbC5jaGVja2VkO1xyXG4gICAgICAgIHRyYWNrLm11dGUudmFsdWUgPSBtdXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbG9JbnB1dEhhbmRsZXIoZSkge1xyXG4gICAgICAgIGxldCBlbCA9IGUudGFyZ2V0O1xyXG4gICAgICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tGcm9tRGVzY2VuZGVudChlbCk7XHJcblxyXG4gICAgICAgIGxldCBzb2xvID0gZWwuY2hlY2tlZDtcclxuICAgICAgICB0cmFjay5zb2xvLnZhbHVlID0gc29sbztcclxuICAgIH1cclxuXHJcbiAgICBmYWRlclJlc2V0SGFuZGxlcihlKSB7XHJcbiAgICAgICAgbGV0IGVsID0gZS50YXJnZXQ7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gdGhpcy50cmFja0Zyb21EZXNjZW5kZW50KGVsKTtcclxuXHJcbiAgICAgICAgdHJhY2subGV2ZWwudmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGZhZGVySW5wdXRIYW5kbGVyID0gdGhpcy5mYWRlcklucHV0SGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGxldCBmYWRlclJlc2V0SGFuZGxlciA9IHRoaXMuZmFkZXJSZXNldEhhbmRsZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBsZXQgbXV0ZUlucHV0SGFuZGxlciA9IHRoaXMubXV0ZUlucHV0SGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGxldCBzb2xvSW5wdXRIYW5kbGVyID0gdGhpcy5zb2xvSW5wdXRIYW5kbGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIFN0YW1wIHRlbXBsYXRlIHBlciBlYWNoIHRyYWNrOlxyXG4gICAgICAgIGxldCB0cmFja1RlbXBsYXRlID0gPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFja1RlbXBsYXRlXCIpO1xyXG4gICAgICAgIGxldCB0cmFja1N0cmlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5taXhlciAudHJhY2tzdHJpcFwiKTtcclxuICAgICAgICBbLi4udGhpcy5taXhlci50cmFja3MsIHRoaXMubWl4ZXIubWFzdGVyXS5mb3JFYWNoKHRyYWNrID0+IHtcclxuICAgICAgICAgICAgLy8gQ2xvbmUgdGVtcGxhdGU6XHJcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRyYWNrVGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgZGF0YS10cmFjayBhdHRyaWJ1dGU6XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrTm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihcImRpdi50cmFja1wiKTtcclxuICAgICAgICAgICAgdHJhY2tOb2RlLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhY2tcIiwgdHJhY2submFtZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgbmFtZSBsYWJlbDpcclxuICAgICAgICAgICAgY29uc3QgbmFtZUxhYmVsID0gPEhUTUxTcGFuRWxlbWVudD5ub2RlLnF1ZXJ5U2VsZWN0b3IoXCIubGFiZWwgc3Bhbi5uYW1lXCIpO1xyXG4gICAgICAgICAgICBuYW1lTGFiZWwuaW5uZXJUZXh0ID0gdHJhY2submFtZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBsZXZlbCBsYWJlbDpcclxuICAgICAgICAgICAgY29uc3QgbGV2ZWxMYWJlbCA9IDxIVE1MU3BhbkVsZW1lbnQ+bm9kZS5xdWVyeVNlbGVjdG9yKFwiLmxhYmVsIHNwYW4ubGV2ZWxcIik7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuaW5uZXJUZXh0ID0gbGV2ZWxGb3JtYXQodHJhY2subGV2ZWwudmFsdWUpO1xyXG4gICAgICAgICAgICAvLyBDbGljayBsZXZlbCBsYWJlbCB0byByZXNldCB0byAwOlxyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmYWRlclJlc2V0SGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBCaW5kIGZhZGVyIGV2ZW50czpcclxuICAgICAgICAgICAgY29uc3QgZmFkZXJOb2RlID0gPEhUTUxJbnB1dEVsZW1lbnQ+dHJhY2tOb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuZmFkZXIgaW5wdXRbdHlwZT1yYW5nZV1cIik7XHJcbiAgICAgICAgICAgIGZhZGVyTm9kZS5taW4gPSAnMC4wJztcclxuICAgICAgICAgICAgZmFkZXJOb2RlLm1heCA9ICcxLjAnO1xyXG4gICAgICAgICAgICBmYWRlck5vZGUudmFsdWVBc051bWJlciA9IGRCX3RvX2ZhZGVyKHRyYWNrLmxldmVsLnZhbHVlKTtcclxuICAgICAgICAgICAgZmFkZXJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCBmYWRlclJlc2V0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIGZhZGVyTm9kZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZmFkZXJJbnB1dEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjay5sZXZlbC5hZGRDaGFuZ2VkRXZlbnQoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmYWRlck5vZGUudmFsdWVBc051bWJlciA9IGRCX3RvX2ZhZGVyKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGxldmVsTGFiZWwuaW5uZXJUZXh0ID0gbGV2ZWxGb3JtYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtdXRlTm9kZSA9IDxIVE1MSW5wdXRFbGVtZW50PnRyYWNrTm9kZS5xdWVyeVNlbGVjdG9yKFwiLm11dGUtYnV0dG9uIGlucHV0W3R5cGU9Y2hlY2tib3hdXCIpO1xyXG4gICAgICAgICAgICBtdXRlTm9kZS5jaGVja2VkID0gdHJhY2subXV0ZS52YWx1ZTtcclxuICAgICAgICAgICAgbXV0ZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBtdXRlSW5wdXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdHJhY2subXV0ZS5hZGRDaGFuZ2VkRXZlbnQoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtdXRlTm9kZS5jaGVja2VkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNvbG9Ob2RlID0gPEhUTUxJbnB1dEVsZW1lbnQ+dHJhY2tOb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuc29sby1idXR0b24gaW5wdXRbdHlwZT1jaGVja2JveF1cIik7XHJcbiAgICAgICAgICAgIHNvbG9Ob2RlLmNoZWNrZWQgPSB0cmFjay5zb2xvLnZhbHVlO1xyXG4gICAgICAgICAgICBzb2xvTm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNvbG9JbnB1dEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0cmFjay5zb2xvLmFkZENoYW5nZWRFdmVudCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHNvbG9Ob2RlLmNoZWNrZWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0cmFja1N0cmlwLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21peGVyLXVpLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==