const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { machineId, machineIdSync } = require('node-machine-id');
const log = require('electron-log');

// function* getMachineId(){
// 	let mId = yield machineId();
// 	return mId;
// }
const createWindow = () => {
	let win = new BrowserWindow({
		minWidth: 1200,
		height: 900,
		center: true,
		webPreferences: {
			nodeIntegration: true,
			webSecurity: false,
		},
	});
	
	if (isDev) {
		// 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
		win.loadURL('http://localhost:3000/');
		win.webContents.openDevTools();
	} else {
		// 프로덕션 환경에서는 패키지 내부 리소스에 접근
		
		win.loadFile(path.join(__dirname, '../build/index.html'));
	}
	//machine guid 를 로컬스토리지에 저장
	//electron에서 자바스크립트 실행을 통해 localstorage에 저장	
	let mId = machineIdSync(true);
	win.webContents.executeJavaScript(`localStorage.setItem("mid","${mId}")`);//.then(value => value);//.then(value => value);	
	win.setMenuBarVisibility(false);
	win.webContents.on('devtools-opened', () => {
		//win.webContents.closeDevTools();
	});

	win.webContents.on('new-window',(event, url, frameName, disposition, option) =>{
		event.preventDefault();
		// log.info(url)
		winTab = new BrowserWindow({
			width: 800,
			height: 600,
			center:true,
			// frame:false,
			webPreferences: {
				nodeIntegration: true,
				webSecurity: false,
				webviewTag:true
			},
		})
		// winTab.setMenuBarVisibility(false);
		winTab.focus();
		winTab.loadURL(url);
		// winTab.webContents.on('close',()=>{
		// 	check = 0;
		// })
		// winTab.loadFile(path.join(__dirname, '../build/index.html',url));
	})
	// let check = 0;
	// let winTab
	// win.webContents.on('new-window',(event, url, frameName, disposition, option) =>{
	// 	event.preventDefault();
	// 	log.info("new Window URL")
	// 	log.info(url)

	// 	if(check === 0) {
	// 		winTab = new BrowserWindow({
	// 			width: 800,
	// 			height: 600,
	// 			center:true,
	// 			// frame:false,
	// 			webPreferences: {
	// 				nodeIntegration: true,
	// 				webSecurity: false,
	// 			},
	// 		})
	// 		check++;
	// 	}
	// 	winTab.setMenuBarVisibility(false);
	// 	log.info(winTab)
	// 	winTab.focus();
	// 	winTab.loadURL(url);
	// 	winTab.webContents.on('close',()=>{
	// 		check = 0;
	// 	})
	// 	// winTab.loadFile(path.join(__dirname, '../build/index.html',url));
	// })
	//win.webContents.on('new-window', (event, url, frameName, disposition, options) => {
		// event.preventDefault();
		// const winTab = new BrowserWindow({
		// 	webPreferences: options.webPreferences, // use existing webContents if provided
		// 	width: options.width,
		// 	height: options.height,
		// 	title: '공지사항',
		// });
		// winTab.focus();
		// winTab.setMenuBarVisibility(false);
		// winTab.loadURL(url);
		// winTab.once('ready-to-show', () => winTab.show());
		// winTab.webContents.on('devtools-opened', () => {
		// 	// winTab.webContents.closeDevTools();
		// });

		// winTab.webContents.on('new-window', (event, url, frameName, disposition, options) => {
		// 	event.preventDefault();
		// 	const winSubTab = new BrowserWindow({
		// 		webPreferences: options.webPreferences, // use existing webContents if provided
		// 		width: options.width,
		// 		height: options.height,
		// 	});
		// 	winSubTab.focus();
		// 	winSubTab.setMenuBarVisibility(false);
		// 	winSubTab.loadURL(url);
		// 	winSubTab.once('ready-to-show', () => winSubTab.show());
		// 	winSubTab.webContents.on('devtools-opened', () => {
		// 		//winSubTab.webContents.closeDevTools();
		// 	});
		// 	winSubTab.webContents.on('new-window', function (e, url) {
		// 		e.preventDefault();
		// 		require('electron').shell.openExternal(url);
		// 	});
		// });
	//});
};

// app.whenReady().then(createWindow);
app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});