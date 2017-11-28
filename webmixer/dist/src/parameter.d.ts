export declare class Parameter {
    applyFn: (value: any) => void;
    _value: any;
    _changed: ((value: any) => void)[];
    constructor(value: any, applyFn: any);
    addChangedEvent(changedFn: any): void;
    value: any;
    applyValue(): void;
    fireEvent(): void;
}
