/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
const {crashReporter, app, BrowserWindow} = require('electron');

crashReporter.start({
	productName	: 'SKYNovel',
	companyName	: 'famibee',
	submitURL	: 'http://famibee.blog38.fc2.com/',
	autoSubmit	: false,
});

let guiWin = null;
const shouldQuit = app.makeSingleInstance(cmdLine=> {
	if (guiWin) {
		if (guiWin.isMinimized()) guiWin.restore();
		guiWin.focus();

		guiWin.webContents.send('invoke', cmdLine.slice(1));
	}
})
if (shouldQuit) app.quit();

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	// 2018/05/08
	// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970

app.on('ready', ()=> {
	guiWin = new BrowserWindow({
		id			: 'SKYNovel',
		width		: 600,
		height		: 400,
		min_width	: 300,
		min_height	: 300,
		acceptFirstMouse		: true,
		textAreasAreResizable	: false,
		resizable	: false,
		fullscreenable	: true,
	});
	//guiWin.webContents.openDevTools();
	guiWin.loadURL('file://'+ __dirname.replace(/\\/g, '/') +'/app/index.htm');
	guiWin.on('closed', ()=> app.quit());
})
app.on('window-all-closed', ()=> app.quit());
