
const maxGain = 3.0;

// Math.pow((6.0 * Math.log(g) / Math.log(2.0) + 192.0) / 198.0, 8.0)
function dB_to_fader(dB) {
    if (dB == -Infinity) return 0.0;
    let gain = Math.pow(10.0, dB / 20.0) * 2.0 / maxGain;
    let fader = Math.pow((6.0 * Math.log(gain) / Math.log(2.0) + 192.0) / 198.0, 8.0);
    return fader;
}

const faderCenter = dB_to_fader(0);
const faderMax = 1.0;

// Math.exp(((Math.pow(fader, 1.0 / 8.0) * 198.0) - 192.0) / 6.0 * Math.log(2.0))
function fader_to_dB(fader) {
    if (fader == 0.0) return -Infinity;
    if (Math.abs(fader - faderCenter) < 1e-6) return 0;
    let gain = Math.exp(((Math.pow(fader, 1.0 / 8.0) * 198.0) - 192.0) / 6.0 * Math.log(2.0)) * maxGain / 2.0;
    let dB = 20.0 * Math.log10(gain);
    return dB;
}

function faderByTrack(name) {
    return document.querySelector("div.track[data-track="+name+"] input.level[type=range]");
}

function trackFromDescendent(el) {
    let trackEl = el.closest("div.track");
    let trackName = trackEl.getAttribute("data-track");
    let track = mixer.track(trackName);
    return track;
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

function faderInputHandler(el, track) {
    let fader = el.value;
    let dB = fader_to_dB(fader);
    track.level = dB;

    // Update level label:
    let trackEl = el.closest("div.track");
    let levelLabel = trackEl.querySelector(".label span.level");
    levelLabel.innerText = levelFormat(track.level)
}

function muteInputHandler(el, track) {
    let mute = el.checked;
    track.mute = mute;
}

function soloInputHandler(el, track) {
    let solo = el.checked;
    track.solo = solo;
}

class MixerUI {
    constructor(mixer) {
        this.mixer = mixer;
    }

    init() {
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
            fader.max = faderMax;
            fader.value = dB_to_fader(track.level);
            fader.addEventListener("dblclick", e => {
                e.target.value = faderCenter;
                faderInputHandler(e.target, trackFromDescendent(e.target));
            });
            fader.addEventListener("input", e => faderInputHandler(e.target, trackFromDescendent(e.target)));

            let mute = trackNode.querySelector(".mute-button input[type=checkbox]");
            mute.checked = track.mute;
            mute.addEventListener("change", e => muteInputHandler(e.target, trackFromDescendent(e.target)));

            let solo = trackNode.querySelector(".solo-button input[type=checkbox]");
            solo.checked = track.solo;
            solo.addEventListener("change", e => soloInputHandler(e.target, trackFromDescendent(e.target)));

            trackStrip.appendChild(node);
        });
    }
}