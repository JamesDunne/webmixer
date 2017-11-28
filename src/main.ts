import { Mixer } from 'webmixer';
import { MixerUI } from 'webmixer-ui';

// Create an AudioContext:
let ac = new AudioContext();

// Create a mixer:
let mixer = new Mixer();
window['mixer'] = mixer;

// Find our <audio> element:
let mcAudio = <HTMLMediaElement>document.getElementById("mc");
let mcSource = ac.createMediaElementSource(mcAudio);
mcSource.channelCountMode = "explicit";
mcSource.channelInterpretation = "discrete";

let mix = {
    "source": "13 - Fuel.wav",
    "sourceChannels": 12,
    "master": {
        "graphiceq": {
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
                    {"freq":130, "type": "highpass"},
                    {"freq":160.000000, "gain":-4.000000, "q":1.038889},
                    {"freq":400.000000, "gain":-7.730000, "q":0.804624},
                    {"freq":1885.148165, "gain":-3.720486, "q":1.060028},
                    {"freq":11132.201691, "gain":-2.802494, "q":0.805152},
                    {"freq":14000, "type": "lowpass"}
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
                    {"freq":130, "type": "highpass"},
                    {"freq":248.346574, "gain":-5.458722, "q":0.936074},
                    {"freq":643.564086, "gain":-6.877929, "q":0.666667},
                    {"freq":2198.262516, "gain":-2.016344, "q":1.060028},
                    {"freq":12536.231766, "gain":-2.660482, "q":0.805152},
                    {"freq":9600, "type": "lowpass"}
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
            "pan": -0.8,
            "level": -0.75
        },
        {
            "name": "G:JD",
            "pan": 0.8,
            "level": -0.75
        },
        {
            "name": "Bass",
            "eq": {
                "bands": [
                    {"freq":49.3, "type": "highpass", "bw": 2.0},
                    {"freq":438.3, "gain":-9.9, "bw": 2.92 },
                    {"freq":1899.3, "gain":4.3, "bw": 1.95 },
                    {"freq":357.9, "gain":-5.0, "bw": 0.11 },
                    {"freq":4921.6, "gain":-12.5, "bw": 0.29 },
                    {"freq":923.7, "gain":-6.1, "bw": 0.21 },
                    {"freq":4904.6, "type": "lowpass", "bw": 2.0 }
                ],
                "makeupGain": 7.5
            },
            "compressor": {
                "threshold": -37.5,
                "ratio": 1.8,
                "knee": 1.8,
                "attack": 0.0112,
                "release": 0.050,
                "makeupGain": 0
            },
            "level": -8
        },
        {
            "name": "D:Kick",
            "eq": {
                "bands": [
                    {"freq":77.4, "type": "highpass", "bw": 2.0},
                    {"freq":103.3, "gain":-7.7, "bw": 1.27 },
                    {"freq":184.4, "gain":-5.4, "bw": 0.32 },
                    {"freq":422.9, "gain":-12.8, "bw": 3.07},
                    {"freq":4404.4, "gain": 10.8, "bw": 2.0 }
                ],
                "makeupGain": 10.6
            },
            "compressor": {
                "threshold": -23.9,
                "ratio": 2.3,
                "knee": 0,
                "attack": 0.0193,
                "release": 0.026,
                "makeupGain": 6
            },
            "level": -2
        },
        {
            "name": "D:Snare",
            "eq": {
                "bands": [
                    {"freq":89.9, "type": "highpass", "bw": 2.0},
                    {"freq":377.4, "gain":-5.7, "bw":0.17},
                    {"freq":614.0, "gain":-8.7, "bw":0.14},
                    {"freq":778.6, "gain":-6.2, "bw":2.43},
                    {"freq":5419.1, "gain":5.5, "bw":2.0}
                ],
                "makeupGain": 7
            },
            "compressor": {
                "threshold": -24.5,
                "ratio": 2.0,
                "knee": 6,
                "attack": 0.0147,
                "release": 0.056,
                "makeupGain": 4
            },
            "level": -2
        },
        {
            "name": "D:HighTom",
            "eq": {
                "bands": [
                    {"freq":155.3, "type": "highpass", "bw": 2.0},
                    {"freq":210.7, "gain":-5.0, "bw": 0.22},
                    {"freq":464.5, "gain":-9.2, "bw": 2.0},
                    {"freq":953.4, "gain":-9.7, "bw": 0.16},
                    {"freq":9640.0, "type": "lowpass", "bw": 2.0}
                ],
                "makeupGain": 5.9
            },
            "compressor": {
                "threshold": -28.5,
                "ratio": 2.0,
                "knee": 6.0,
                "attack": 0.0356,
                "release": 0.052,
                "makeupGain": 2
            },
            "pan": -0.4,
            "level": -3
        },
        {
            "name": "D:FloorTom",
            "eq": {
                "bands": [
                    {"freq":176.3, "type": "highpass", "bw": 2.0},
                    {"freq":179.5, "gain":-9.9, "bw": 0.39},
                    {"freq":286.7, "gain":-6.3, "bw": 0.16},
                    {"freq":442.3, "gain":-11.6, "bw": 2.61},
                    {"freq":11675.6, "type": "lowpass", "bw": 2.0}
                ],
                "makeupGain": 5.9
            },
            "compressor": {
                "threshold": -36.4,
                "ratio": 2.0,
                "knee": 6.0,
                "attack": 0.0413,
                "release": 0.052,
                "makeupGain": 3
            },
            "pan": 0.4,
            "level": -3
        },
        {
            "name": "D:OH",
            "channels": 2,
            "eq": {
                "bands": [
                    {"freq":159.8, "type": "highpass", "bw": 2.0},
                    {"freq":534.4, "gain":-11.6, "bw": 2.69},
                    {"freq":1753.1, "gain":-9.3, "bw": 0.2}
                ],
                "makeupGain": 0
            },
            "compressor": {
                "threshold": -33.7,
                "ratio": 10.7,
                "knee": 6,
                "attack": 0.0129,
                "release": 0.204,
                "makeupGain": 0
            },
            "level": -8
        }
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
new MixerUI(mixer).init();

// TODO: would be nice to detect channel count from source.
let splitter = ac.createChannelSplitter(mix.sourceChannels);
try {
    // For older spec implementations:
    splitter.channelCountMode = "max";
} catch (e) {
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
    } else {
        // Assume mono, so copy single input channel to both output channels:
        splitter.connect(merger, c, 0);
        splitter.connect(merger, c, 1);
        c++;
    }
    merger.connect(track.inputNode);
}

mcAudio.src = mix.source;
mcAudio.loop = true;
//mcAudio.play();
