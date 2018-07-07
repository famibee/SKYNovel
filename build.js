const packager = require('electron-packager');
	// https://github.com/electron-userland/electron-packager
const config = require('./package.json');
const createDMG = require('electron-installer-dmg');
//const electronInstaller = require('electron-winstaller');
	// https://github.com/electron/windows-installer
//const winInstaller = require('electron-windows-installer');	// windows環境専用？
	// https://github.com/felixrieseberg/electron-wix-msi

const opts = {
	dir: './',
	name: config.name,
	appCopyright: config.appCopyright,
 	appVersion	: config.version,
	platform: 'darwin',
	//platform: 'win32',	//	platform: 'darwin,win32',
	arch: 'x64',
		// 2018/5/1時点で
		// Allowed values: ia32, x64, armv7l, arm64 (Electron 1.8.0 and above), mips64el (Electron 1.8.2-beta.5 and above), all
	icon: 'build/icon/icon.icns',
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
packager(opts).then(appPaths => {
	console.log('🍏 %s.app Done!!', opts.name);
/*
	//process.on('unhandledRejection', console.dir);	// 4 Debug
	const fld = opts.name +'-'+ opts.platform +'-'+ opts.arch;
	createDMG({
		appPath: 'build/'+ fld +'/'+ opts.name +'.app',
		name: fld,
		icon: opts.icon,
		overwrite: true,
		out: opts.out,
	}, function (err) {
		if (err) throw Error(err);

		console.log('🍎 %s.dmg Done!!', fld);
	});
*/
});

//===============
/*
	const fld = opts.name +'-'+ opts.platform +'-'+ opts.arch;
	electronInstaller.createWindowsInstaller({
		appDirectory: opts.out + fld +'/',
		outputDirectory: opts.out,
		description: config.description,
		authors: config.authors,
		exe: config.name +'.exe',
	});
*/
/*
	const fld = opts.name +'-'+ opts.platform +'-'+ opts.arch;
	winInstaller({
		appDirectory: opts.out + fld +'/',
		outputDirectory: opts.out,
		iconUrl: opts.icon,
	});
*/

/*
	const MSICreator = require('electron-wix-msi');
	const fld = opts.name +'-'+ opts.platform +'-'+ opts.arch;
	const msiCreator = new MSICreator.MSICreator({
		appDirectory: 'build/'+ fld +'/',
		description: config.description,
		exe: opts.name,
		name: opts.name,
		manufacturer: config.appCopyright,
		version: config.version,
		outputDirectory: opts.out,
	});
	msiCreator.create();
//	await msiCreator.compile();
	msiCreator.compile();
*/
