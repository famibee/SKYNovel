/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {Layer} from './Layer';

import {CmnLib, HArg} from './CmnLib';
import {Config} from './Config';

import * as THREE from 'three';
(window as any).THREE = THREE;
require('three/examples/js/controls/OrbitControls');	// ok

//const ColladaLoader = require('three-colladaLoader');
//const ColladaLoader = require('three-collada-loader');
// <reference path='./three/three-colladaLoader'/>
//import { ColladaLoader } from 'three/examples/js/loaders/ColladaLoader';
//import * as ColladaLoader from 'three/three-colladaLoader';
//import * as _ from 'three/three-colladaLoader';
//import { ColladaLoader } from 'three/three-colladaLoader';

//const FBXLoader = require('three-fbx-loader');

//require('three/examples/js/loaders/MMDLoader');
//import { MMDLoader } from 'three/examples/js/loaders/MMDLoader';
//import { MMDLoader } from 'three/examples/js/loaders/MMDLoader.js';
//import { MMDLoader } from 'three/build/three.module';
//const MMDLoader = require('three/examples/js/loaders/MMDLoader');

//require('three/examples/js/animation/MMDAnimationHelper');
//const MMDAnimationHelper = require('three/examples/js/animation/MMDAnimationHelper');

export class ThreeDLayer extends Layer {
	static	cfg			: Config | null		= null;
	static	init(cfg: Config): void {ThreeDLayer.cfg = cfg;}

	private scene_3D	= new THREE.Scene();
	private	canvas_3D	= new THREE.WebGLRenderer({antialias: true, alpha: true});
	private sprite_3D	: PIXI.Sprite	= null;
	private camera		: THREE.Camera	= null;

	constructor() {
		super();

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


		//	const loader = new THREE.MMDLoader();
			const loader = new MMDLoader();
//			const mesh = await loader.load(mmd, [vmd]);
//			const mesh = loader.load(mmd, [vmd]);

			async function f1() {
				const mesh = await loader.load(mmd, [vmd]);
			}
			f1();


//const helper = new THREE.MMDHelper();
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

			const clock = new THREE.Clock();
			const anime = ()=> {
				helper.update(clock.getDelta());
				requestAnimationFrame(anime);
			}
			anime();
*/

	lay(hArg: HArg): boolean {
		// TODO: ３Ｄレイヤ（仕様未確定・曳光弾）
		let obj: THREE.Object3D = null;
		let fncCtrl = ()=> {};

		const fbx = hArg['fbx'];
		const dae = hArg['dae'];
		const celestial_sphere = hArg['celestial_sphere'];	// 天球
		if ('fbx' in hArg) {	// FBX
/*			/// テスト用 Object3D
			this.camera = new THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
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
			this.camera = new THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置
/*
			// 立方体
			const geometry = new THREE.BoxGeometry(500, 500, 500);
			// new THREE.BoxGeometry(幅, 高さ, 奥行き)
			const material = new THREE.MeshNormalMaterial();
			obj = new THREE.Mesh(geometry, material);
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
			this.camera = new THREE.PerspectiveCamera(
				45,
				CmnLib.stageW / CmnLib.stageH,
				1,
				10000);
			// new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
			this.camera.position.set(0, 0, 0.1);	// カメラ位置

			// theta画像
			const geometry = new THREE.SphereGeometry(5, 60, 40);
			geometry.scale(-1, 1, 1);
			const ldr = new THREE.TextureLoader();
			const tx = ldr.load(ThreeDLayer.cfg.searchPath(celestial_sphere, Config.EXT_STILL_IMG));
			tx.minFilter = THREE.LinearFilter;
			const material = new THREE.MeshBasicMaterial({map: tx});
			obj = new THREE.Mesh(geometry, material);
			this.scene_3D.add(obj);

			this.camera.lookAt(obj.position);	// カメラ視野の中心座標
			fncCtrl = ()=> {obj.rotation.y += 0.004;};
		}
		else {
			/// テスト用 Object3D
			this.camera = new THREE.PerspectiveCamera(75, CmnLib.stageW / CmnLib.stageH, 1, 10000);
			this.camera.position.set(0, 0, 700);	// カメラ位置

			// 立方体
			const geometry = new THREE.BoxGeometry(500, 500, 500);
			// new THREE.BoxGeometry(幅, 高さ, 奥行き)
			const material = new THREE.MeshNormalMaterial();
			obj = new THREE.Mesh(geometry, material);
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
			const controls = new THREE.OrbitControls(this.camera);
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
		if (! this.isStart) {
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
}
