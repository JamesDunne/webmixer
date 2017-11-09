
// Convert from dB to gain multiplier:
function dB_to_gain(dB) {
    return Math.pow(10.0, dB / 20.0);
}

// Convert from gain multiplier to dB:
function gain_to_dB(gain) {
    return 20.0 * Math.log10(gain);
}
