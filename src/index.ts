// Type definitions for skynovel
export * from "./sn/AnalyzeTagArg";
export * from "./sn/Areas";
export * from "./sn/Button";
export * from "./sn/CallStack";
export * from "./sn/CmnInterface";
export * from "./sn/CmnLib";
export * from "./sn/CmnTween";
export * from "./sn/Config";
export * from "./sn/DebugMng";
export * from "./sn/EventListenerCtn";
export * from "./sn/EventMng";
export * from "./sn/FrameMng";
export * from "./sn/Grammar";
export * from "./sn/GrpLayer";
export * from "./sn/Layer";
export * from "./sn/LayerMng";
export * from "./sn/Main";
export * from "./sn/Pages";
export * from "./sn/PropParser";
export * from "./sn/RubySpliter";
export * from "./sn/ScriptIterator";
export * from "./sn/SoundMng";
export * from "./sn/SysApp";
export * from "./sn/SysBase";
export * from "./sn/SysNode";
export * from "./sn/SysWeb";
export * from "./sn/TxtLayer";
export * from "./sn/TxtStage";
export * from "./sn/Variable";
export * from "./app";
export * from "./appMain";
export * from "./web";

import {HPROC} from "./preload";
declare global {
	interface Window {
		to_app: HPROC;
	}
}
