const config = require('./package.json');
const opts = {
	dir: './',
	name: config.name,
	appCopyright: config.appCopyright,
 	appVersion	: config.version,
//	platform: 'win32',
	platform: 'darwin',
//	platform: 'darwin,win32',
//	arch: 'ia32',
	arch: 'x64',
		// 2018/5/1時点で
		// Allowed values: ia32, x64, armv7l, arm64 (Electron 1.8.0 and above), mips64el (Electron 1.8.2-beta.5 and above), all
	icon: 'build/icon/icon',
	out: 'build/',

	overwrite: true,
	//asar: {unpackDir: 'prj'},	// 絵や動画など、2018/04/30 時点で不要だった
	asar: true,
	ignore: "^/([\\x00-\\x60]|[b-oq-z]|a[^p]|p[^ar]|package-|[\\u007b-\\uffff])",

	appBundleId	: config.appBundleId,
	helperBundleId: config.appBundleId,
	win32metadata: {
		CompanyName: config.appCopyright,
		FileDescription: config.description,
		OriginalFilename: config.name,
		FileVersion: config.version,
		ProductVersion: config.version,
		ProductName: config.name,
		InternalName: config.name
	}
};
const packager = require('electron-packager');
packager(opts).then(appPaths => {
	const aPlatform = opts.platform.split();
	// Win
	if (aPlatform.includes('win32')) {
		console.log('🍦 🍩 %s.exe Done!!', opts.name);
//		console.log('🍦 📦 %s.exe Done!!', opts.name);

		const electronInstaller = require('electron-winstaller');
		const fld = opts.name +'-win32-'+ opts.arch;
console.log(`fld:${fld}`);
		resultPromise = electronInstaller.createWindowsInstaller({
			appDirectory: 'build/'+ fld +'/',
			outputDirectory: opts.out,
			authors: config.authors,
			exe: opts.name +'.exe'
		});
		resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
/*
		resultPromise.then(() => {
			console.log("It worked!")
			e=> console.log(`No dice: ${e.message}`)
		});
*/
	}

	// Mac
	if (aPlatform.includes('darwin')) {
		console.log('🍏 🍔 %s.app Done!!', opts.name);

		const fld = opts.name +'-darwin-'+ opts.arch;
		const createDMG = require('electron-installer-dmg');
		createDMG({
			appPath: 'build/'+ fld +'/'+ opts.name +'.app',
			name: fld,
			icon: opts.icon +'.icns',
			overwrite: true,
			out: opts.out,
		}, err=> {
			if (err) throw Error(err);
			console.log('🍎 📦 %s.dmg Done!!', fld);
		});
	}
});
