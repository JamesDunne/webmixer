import { dB_to_gain, gain_to_dB } from './util';
import { Mixer } from './mixer';
import { Track } from './track';

// Define maximum gain at the top of the fader range [0..1]:
const faderMaxGain = dB_to_gain(12);

function gain_to_fader(gain: number): number {
    let fader = Math.pow((6.0 * Math.log(gain) / Math.log(2.0) + 192.0) / 198.0, 8.0);
    return fader;
}

// Convert from dB to fader range [0..1]:
function dB_to_fader(dB: number): number {
    if (dB == -Infinity) return 0.0;
    let gain = dB_to_gain(dB) * 2.0 / faderMaxGain;
    return gain_to_fader(gain);
}

// Define a zero-value on the fader [0..1] scale:
const faderZero = dB_to_fader(0);

// Convert from fader range [0..1] to dB:
function fader_to_dB(fader) {
    if (fader == 0.0) return -Infinity;
    if (Math.abs(fader - faderZero) < 1e-6) return 0;
    let gain = Math.exp(((Math.pow(fader, 1.0 / 8.0) * 198.0) - 192.0) / 6.0 * Math.log(2.0)) * faderMaxGain / 2.0;
    let dB = gain_to_dB(gain);
    return dB;
}

function withExactDigits(value, maxDigits) {
    let s = value.toPrecision(maxDigits);
    if (s == "-Infinity") {
        s = "-inf";
    } else {
        // Only show maxDigits total digits including 0s:
        let digits = 0, n = 0;
        for (let c of s) {
            if (c >= '0' && c <= '9') {
                digits++;
                if (digits >= maxDigits) {
                    s = s.slice(0, n+1);
                    break;
                }
            }
            n++;
        }
    }
    return s;
}

function levelFormat(dB) {
    return `${withExactDigits(dB,3)} dB`;
}

export class MixerUI {
    mixer: Mixer;

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
        let trackTemplate = <HTMLTemplateElement>document.getElementById("trackTemplate");
        let trackStrip = document.querySelector(".webmixer .trackstrip");
        [...this.mixer.tracks, this.mixer.master].forEach(track => {
            // Clone template:
            const node = document.importNode(trackTemplate.content, true);

            // Set data-track attribute:
            const trackNode = node.querySelector("div.track");
            trackNode.setAttribute("data-track", track.name);

            // Set name label:
            const nameLabel = <HTMLSpanElement>node.querySelector(".label span.name");
            nameLabel.innerText = track.name;

            // Calculate EQ response:
            const eqCanvas = <HTMLCanvasElement>node.querySelector(".eq canvas.eq-response");
            {
                const n = 52 * 8;

                function y(gain: number): number {
                    return 312 - (gain_to_fader(gain) * 220.0);
                }

                function x(f: number): number {
                    return Math.log(f / 20.0) / Math.log(1000) * (n-1);
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
            const levelLabel = <HTMLSpanElement>node.querySelector(".label span.level");
            levelLabel.innerText = levelFormat(track.level.value);
            // Click level label to reset to 0:
            levelLabel.addEventListener("click", faderResetHandler);

            // Bind fader events:
            const faderNode = <HTMLInputElement>trackNode.querySelector(".fader input[type=range]");
            faderNode.min = '0.0';
            faderNode.max = '1.0';
            faderNode.valueAsNumber = dB_to_fader(track.level.value);
            faderNode.addEventListener("dblclick", faderResetHandler);
            faderNode.addEventListener("input", faderInputHandler);
            track.level.addChangedEvent((value) => {
                faderNode.valueAsNumber = dB_to_fader(value);
                levelLabel.innerText = levelFormat(value);
            });

            let muteNode = <HTMLInputElement>trackNode.querySelector(".mute.button input[type=checkbox]");
            muteNode.checked = track.mute.value;
            muteNode.addEventListener("change", muteInputHandler);
            track.mute.addChangedEvent((value) => {
                muteNode.checked = value;
            });

            let soloNode = <HTMLInputElement>trackNode.querySelector(".solo.button input[type=checkbox]");
            soloNode.checked = track.solo.value;
            soloNode.addEventListener("change", soloInputHandler);
            track.solo.addChangedEvent((value) => {
                soloNode.checked = value;
            });

            trackStrip.appendChild(node);
        });
    }
}