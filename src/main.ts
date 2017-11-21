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
                    {"freq":9600, "type": "lowpass"}
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
            "eq": {
                "bands": [
                    {"freq":2325.930000, "gain":-4.171299, "q":2.641279},
                    {"freq":5000.000000, "gain":5.945587, "q":1.629548, "type":"highshelf"}
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
                    {"freq":2325.930000, "gain":-4.171299, "q":2.641279},
                    {"freq":5000.000000, "gain":5.945587, "q":1.629548, "type":"highshelf"}
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
                    {"freq":44.564004, "type": "highpass"},
                    {"freq":433.695077, "gain":-12.218957, "q":0.507461},
                    {"freq":974.520551, "gain":0.262902, "q":0.688007},
                    {"freq":1902.596919, "type": "lowpass"}
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
                    {"freq":110, "type": "highpass"},
                    {"freq":133.249144, "gain":-3.972947, "q":1.591894},
                    {"freq":544.818606, "gain":-15.543725, "q":0.445548},
                    {"freq":4179.056143, "gain":4.475110, "q":0.666667},
                    {"freq":11689.377266, "q": 0.919136,  "type": "lowpass"}
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
                    {"freq":125.1, "type": "highpass"},
                    {"freq":260.211802, "gain":-3.480312, "q":2.160295},
                    {"freq":612.205273, "gain":-10.888889, "q":0.553803},
                    {"freq":6625.783413, "gain":3.733333, "q":0.666667}
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
                    {"freq":126.736086, "type": "highpass"},
                    {"freq":340.029120, "gain":-5.889247, "q":3.678489},
                    {"freq":584.497208, "gain":-11.619048, "q":0.381231},
                    {"freq":9992.460613, "type": "lowpass"}
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
                    {"freq":127.130927, "type": "highpass"},
                    {"freq":280.321665, "gain":-6.771389, "q":3.123048},
                    {"freq":486.251757, "gain":-10.666667, "q":0.381231},
                    {"freq":9224.637955, "type": "lowpass"}
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
                    {"freq":148.939075, "type": "highpass"},
                    {"freq":405.545780, "gain":-12.566784, "q":0.452873},
                    {"freq":1838.969275, "gain":-7.406309, "q":1.110336},
                    {"freq":15481.902444, "type": "lowpass"}
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

mcAudio.src = mix.songs[0];
mcAudio.loop = true;
//mcAudio.play();
