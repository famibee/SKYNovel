export type T_H_Areas = {
    [begin: string]: number;
};
export declare class Areas {
    #private;
    clear(): void;
    static from(new_val: T_H_Areas): Areas;
    val(): T_H_Areas;
    search(idx: number): boolean;
    record(idx: number): void;
    erase(idx: number): void;
    get count(): number;
    toString(): string;
}
//# sourceMappingURL=Areas.d.ts.map