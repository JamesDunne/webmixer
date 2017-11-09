
class Parameter {
    constructor(value, applyFn) {
        if (!(applyFn instanceof Function)) throw 'applyFn is not an instance of Function!';
        this.applyFn = applyFn;
        this._value = value;
        this._changed = [];
    }

    addChangedEvent(changedFn) {
        if (!(changedFn instanceof Function)) throw 'changedFn is not an instance of Function!';
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
