
// Convert from dB to gain multiplier:
export function dB_to_gain(dB) {
    return Math.pow(10.0, dB / 20.0);
}

// Convert from gain multiplier to dB:
export function gain_to_dB(gain) {
    let sign = Math.sign(gain);
    let gain_abs = gain * sign;
    return 20.0 * Math.log10(gain) * sign;
}
