import { BrowserWindow } from 'electron';
export declare class appMain {
    private readonly bw;
    private readonly dsp;
    private readonly screenRX;
    private readonly screenRY;
    private readonly hInfo;
    private constructor();
    private isMovingWin;
    private posMovingWin;
    private delayWinPos;
    private window;
    openDevTools(): void;
    private static ins;
    static initRenderer(path_htm: string, o: object): BrowserWindow;
    private static menu_height;
}
//# sourceMappingURL=appMain.d.ts.map