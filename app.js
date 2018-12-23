/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
const {crashReporter, app, Menu, BrowserWindow} = require('electron');

crashReporter.start({
	productName	: app.getName(),
	companyName	: 'famibee',
	submitURL	: 'http://famibee.blog38.fc2.com/',
	autoSubmit	: false,
});
if (! app.requestSingleInstanceLock()) app.quit();

let guiWin = null;
app.on('second-instance', ()=> {
	if (! guiWin) return;

	if (guiWin.isMinimized()) guiWin.restore();
	guiWin.focus();
});
app.on('ready', ()=> {
	const openAboutWindow = require('about-window').default;
	const menu = Menu.buildFromTemplate([{
		label: app.getName(),
		submenu: [
			{
				label: 'About This App',
				click: ()=> openAboutWindow({
					icon_path: 'file://'+ __dirname.replace(/\\/g, '/') +'/app/icon.png',
					package_json_dir: __dirname,
					copyright: 'Copyright '+ process.env.npm_package_appCopyright +' 2018',
					homepage: 'http://famibee.blog38.fc2.com/',
					license: '',
					use_version_info: false,
				}),
			},
		],
	}]);
	Menu.setApplicationMenu(menu);

	guiWin = new BrowserWindow({
		id			: 'SKYNovel-'+ app.getName(),
		width		: 600,
		height		: 400,
		min_width	: 300,
		min_height	: 300,
		acceptFirstMouse		: true,
		textAreasAreResizable	: false,
		resizable	: false,
		fullscreenable	: true,
	});
	try {
		guiWin.loadURL('file://'+ __dirname.replace(/\\/g, '/') +'/app/index.htm');
	}
	catch (e) {
		guiWin.webContents.openDevTools();
		console.error(`ealy err:${e}`);
	}
	guiWin.on('closed', ()=> app.quit());
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	// 2018/05/08
	// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970

app.on('window-all-closed', ()=> app.quit());
