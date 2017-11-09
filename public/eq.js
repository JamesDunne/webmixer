
class EQ {
    constructor(opts) {
        this.opts = opts;
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
            } else {
                outputNode.connect(bandNode);
            }
            outputNode = bandNode;
        }

        this.inputNode = inputNode;
        this.outputNode = outputNode;
        this.bandNodes = bandNodes;
    }
}
