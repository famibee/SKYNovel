import { IAreas } from './CmnInterface';
export declare class Areas implements IAreas {
    hAreas: {
        [name: string]: number;
    };
    search(idx: number): boolean;
    record(idx: number): void;
    erase(idx: number): void;
    readonly count: number;
    toString(): string;
}
