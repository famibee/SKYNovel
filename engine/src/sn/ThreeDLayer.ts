/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2019 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, HArg, IMain} from './CmnLib';
import {Config} from './Config';
import {ScriptIterator} from './ScriptIterator';

export class ThreeDLayer extends Layer {
	static	cfg			: Config;
	static	init(cfg: Config): void {ThreeDLayer.cfg = cfg;}

	static	THREE		: any;
	private scene_3D	: THREE.Scene;
	private	canvas_3D	: THREE.CanvasRenderer;
	private sprite_3D	: PIXI.Sprite;
	private camera		: THREE.Camera;

	// 遅延ロード
	static	import(main: IMain, scrItr: ScriptIterator): boolean {
		if (ThreeDLayer.THREE) return false;

		async function init() {
			ThreeDLayer.THREE = await import('three');
			(window as any).THREE = ThreeDLayer.THREE;	// 次のrequireで必須なので
			require('three/examples/js/controls/OrbitControls');

			scrItr.subIdxToken();	// 呼び出し元をやり直し
			main.resume();	// 停止から復帰
		}
		init();

		return true;	// 一時停止
	}
	constructor() {
		super();

		this.scene_3D = new ThreeDLayer.THREE.Scene();
		const log = console.log;	// 「THREE.WebGLRenderer 100」を消したい
		console.log = ()=> {};
		this.canvas_3D	= new ThreeDLayer.THREE.WebGLRenderer({antialias: true, alpha: true});
		console.log = log;

		// 3D Scene canvas
		this.canvas_3D.setSize(CmnLib.stageW, CmnLib.stageW);
		this.canvas_3D.setPixelRatio(window.devicePixelRatio);

		// Map 3D canvas to 2D Canvas
		const texture_3D = PIXI.Texture.fromCanvas(this.canvas_3D.domElement);
		this.sprite_3D = new PIXI.Sprite(texture_3D);
		this.cnt.addChild(this.sprite_3D);
		this.sprite_3D.x = (CmnLib.stageW -this.sprite_3D.width) /2
		this.sprite_3D.y = (CmnLib.stageH -this.sprite_3D.height) /2
	}
	private tick = ()=> {
		this.canvas_3D.render(this.scene_3D, this.camera);
		this.sprite_3D.texture.update();	//tell pixi that threejs changed
		requestAnimationFrame(this.tick);
	}
	private isStart = false;

/*
		if ('mmd' in hArg) {
			const mmd = ThreeDLayer.cfg.searchPath(hArg['mmd'], 'pmd|pmx');
			const vmd = ThreeDLayer.cfg.searchPath(hArg['vmd'], 'vmd');


	//const object = require('three/examples/js/loaders/MMDLoader').default;
	//const object2 = require('three/examples/js/loaders/MMDLoader');
	//const object2 = require('./mo');
	//const object2 = require('./three/examples/js/loaders/MMDLoader');
	console.log(`fn:ThreeDLayer.ts line:63 %o`, object2);
	const instance = new object2();
	console.log(`fn:ThreeDLayer.ts line:65 ${instance}`);
	console.log(`fn:ThreeDLayer.ts line:67 ${instance.getName()}`);

	console.log(`fn:ThreeDLayer.ts line:63 %o`, THREE);
	console.log(`fn:ThreeDLayer.ts line:63 %o`, MMDAnimationHelper);


		//	const loader = new ThreeDLayer.THREE.MMDLoader();
			const loader = new MMDLoader();
//			const mesh = await loader.load(mmd, [vmd]);
//			const mesh = loader.load(mmd, [vmd]);

			async function f1() {
				const mesh = await loader.load(mmd, [vmd]);
			}
			f1();


//const helper = new ThreeDLayer.THREE.MMDHelper();
//const helper = new MMDAnimationHelper();

			const helper = new MMDHelper();
			new MMDLoader().loadWithAnimation(
				mmd,
				vmd,
				mmd=> {
					helper.add(mmd.mesh, {
						animation	: mmd.animation,
						physics		: true,
					});
					this.scene_3D.add( mmd.mesh );
				}
			);

			const clock = new ThreeDLayer.THREE.Clock();
			const anime = ()=> {
				helper.update(clock.getDelta());
				requestAnimationFrame(anime);
			}
			anime();
*/

	lay(hArg: HArg): boolean {
		// TODO: ３Ｄレイヤ（仕様未確定・曳光弾）
		let fncCtrl = ()=> {};

//		const fbx = hArg['fbx'];
		const dae = hArg.dae;
		const celestial_sphere = hArg.celestial_sphere;	// 天球
		if ('fbx' in hArg) {	// FBX
/*			/// テスト用 Object3D
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置
//			this.camera.position.set(0, 0, 0.1);	// カメラ位置

			const ldrFBX = new FBXLoader();
			ldrFBX.load(ThreeDLayer.cfg.searchPath(fbx, 'fbx'), obj=> {
console.log(`fn:ThreeDLayer.ts line:76 load:%o:`, obj);
				this.scene_3D.add(obj);

				this.camera.lookAt(obj.position);	// カメラ視野の中心座標
				this.tick();
			});
*/
			return false;
		}
		else if (dae) {	// dae
			/// テスト用 Object3D
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置
/*
			// 立方体
			const geometry = new ThreeDLayer.THREE.BoxGeometry(500, 500, 500);
			// new ThreeDLayer.THREE.BoxGeometry(幅, 高さ, 奥行き)
			const material = new ThreeDLayer.THREE.MeshNormalMaterial();
			obj = new ThreeDLayer.THREE.Mesh(geometry, material);
			obj.position.z = -500;
			obj.rotation.z = -45;
			this.scene_3D.add(obj);
*/
/*
			const colladaLoader = new ColladaLoader();
			colladaLoader.load(ThreeDLayer.cfg.searchPath(dae, 'dae'), mdl=> {
				console.log(`fn:ThreeDLayer.ts line:147 ${mdl}`);
				this.scene_3D.add(mdl);

				this.camera.lookAt(obj.position);	// カメラ視野の中心座標
				this.tick();
				fncCtrl = ()=> {};
			});
*/
			return false;
		}
		else if (celestial_sphere) {	// 天球
			// カメラ
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(
				45,
				CmnLib.stageW / CmnLib.stageH,
				1,
				10000);
			// new ThreeDLayer.THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
			this.camera.position.set(0, 0, 0.1);	// カメラ位置

			// theta画像
			const geometry = new ThreeDLayer.THREE.SphereGeometry(5, 60, 40);
			geometry.scale(-1, 1, 1);
			const ldr = new ThreeDLayer.THREE.TextureLoader();
			const tx = ldr.load(ThreeDLayer.cfg.searchPath(celestial_sphere, Config.EXT_STILL_IMG));
			tx.minFilter = ThreeDLayer.THREE.LinearFilter;
			const material = new ThreeDLayer.THREE.MeshBasicMaterial({map: tx});
			const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
			this.scene_3D.add(obj);

			this.camera.lookAt(obj.position);	// カメラ視野の中心座標
			fncCtrl = ()=> {obj.rotation.y += 0.004;};
		}
		else if ('box' in hArg) {
			/// テスト用 Object3D
			this.camera = new ThreeDLayer.THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置

			// 立方体
			const geometry = new ThreeDLayer.THREE.BoxGeometry(500, 500, 500);
			// new ThreeDLayer.THREE.BoxGeometry(幅, 高さ, 奥行き)
			const material = new ThreeDLayer.THREE.MeshNormalMaterial();
			const obj = new ThreeDLayer.THREE.Mesh(geometry, material);
			obj.position.z = -500;
			obj.rotation.z = -45;
			this.scene_3D.add(obj);

			fncCtrl = ()=> {
				obj.rotation.x += 0.01;
				obj.rotation.y += 0.01;
				obj.rotation.z += 0.01;
			};
		}

		if ('controls' in hArg) {
			const controls = new ThreeDLayer.THREE.OrbitControls(this.camera);
			controls.target.set(
				this.camera.position.x + 0.15,
				this.camera.position.y,
				this.camera.position.z
			);
			// 視点操作のイージングをONにする
			controls.enableDamping = true;
			// 視点操作のイージングの値
			controls.dampingFactor = 0.2;
			// 視点変更の速さ
			controls.rotateSpeed = 0.1;
			controls.zoomSpeed = 2;

			fncCtrl = ()=> controls.update();	// 毎回呼ぶと慣性がつく
		}
		if (! this.isStart && this.camera) {
			this.isStart = true;
			this.tick();

			const anime = ()=> {
				fncCtrl();
				requestAnimationFrame(anime);
			}
			anime();
		}

		return false;
	}

	playback(hLay: any, fncComp: undefined | {(): void} = undefined): boolean {
		super.playback(hLay);
		if (fncComp != undefined) fncComp();
		return false;
	}
}
