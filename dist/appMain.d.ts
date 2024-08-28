import { BrowserWindow } from 'electron';
export declare class appMain {
    #private;
    private readonly bw;
    readonly version: string;
    readonly path_htm: string;
    static initRenderer(path_htm: string, version: string, _o: object): BrowserWindow;
    openDevTools: () => void;
    private constructor();
}
//# sourceMappingURL=appMain.d.ts.map