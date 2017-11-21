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

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(1), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, util_1, parameter_1, eq_1, compressor_1, graphiceq_1) {
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

__webpack_require__(4);
module.exports = __webpack_require__(9);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5), __webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, mixer_1, track_1, parameter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Mixer = mixer_1.Mixer;
    exports.Track = track_1.Track;
    exports.Parameter = parameter_1.Parameter;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(10);

var libraryConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    library: 'webmixer',
    libraryTarget: 'umd',
    filename: 'webmixer.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [libraryConfig];

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
});