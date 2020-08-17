import { IAreas } from './CmnInterface';
export declare class Areas implements IAreas {
    hAreas: {
        [name: number]: number;
    };
    clear(): void;
    search(idx: number): boolean;
    record(idx: number): void;
    erase(idx: number): void;
    get count(): number;
    toString(): string;
}
//# sourceMappingURL=Areas.d.ts.map