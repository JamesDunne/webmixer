
// Convert from dB to gain multiplier:
function dB_to_gain(dB) {
    return Math.pow(10.0, dB / 20.0);
}

// Convert from gain multiplier to dB:
function gain_to_dB(gain) {
    return 20.0 * Math.log10(gain);
}

// Define maximum gain at the top of the fader range [0..1]:
const faderMaxGain = dB_to_gain(12);

// Convert from dB to fader range [0..1]:
function dB_to_fader(dB) {
    if (dB == -Infinity) return 0.0;
    let gain = dB_to_gain(dB) * 2.0 / faderMaxGain;
    let fader = Math.pow((6.0 * Math.log(gain) / Math.log(2.0) + 192.0) / 198.0, 8.0);
    return fader;
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
        track.level = dB;

        // Update level label:
        let trackEl = el.closest("div.track");
        let levelLabel = trackEl.querySelector(".label span.level");
        levelLabel.innerText = levelFormat(track.level)
    }

    muteInputHandler(e) {
        let el = e.target;
        let track = this.trackFromDescendent(el);

        let mute = el.checked;
        track.mute = mute;
    }

    soloInputHandler(e) {
        let el = e.target;
        let track = this.trackFromDescendent(el);

        let solo = el.checked;
        track.solo = solo;
    }

    faderResetHandler(e) {
        let el = e.target;

        el.value = faderZero;
        this.faderInputHandler(e);
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
            var node = document.importNode(trackTemplate.content, true);

            // Update name label:
            let nameLabel = node.querySelector(".label span.name");
            nameLabel.innerText = track.name;

            // Update level label:
            let levelLabel = node.querySelector(".label span.level");
            levelLabel.innerText = levelFormat(track.level)

            let trackNode = node.querySelector("div.track");
            trackNode.setAttribute("data-track", track.name);

            let fader = trackNode.querySelector(".fader input[type=range]");
            fader.min = 0;
            fader.max = 1.0;
            fader.value = dB_to_fader(track.level);
            fader.addEventListener("dblclick", faderResetHandler);
            fader.addEventListener("input", faderInputHandler);

            let mute = trackNode.querySelector(".mute-button input[type=checkbox]");
            mute.checked = track.mute;
            mute.addEventListener("change", muteInputHandler);

            let solo = trackNode.querySelector(".solo-button input[type=checkbox]");
            solo.checked = track.solo;
            solo.addEventListener("change", soloInputHandler);

            trackStrip.appendChild(node);
        });
    }
}