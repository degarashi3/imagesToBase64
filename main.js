'use strict';

// Electron�Υ⥸�塼��
const electron = require("electron");

// ���ץꥱ�������򥳥�ȥ��뤹��⥸�塼��
const app = electron.app;

// ������ɥ����������⥸�塼��
const BrowserWindow = electron.BrowserWindow;

// �ᥤ�󥦥���ɥ���GC����ʤ��褦�˥����Х����
let mainWindow;

// ���ƤΥ�����ɥ����Ĥ����齪λ
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electron�ν������λ��˼¹�
app.on('ready', function() {
  // �ᥤ����̤�ɽ����������ɥ��������⤵�����Ǥ���
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // ������ɥ����Ĥ���줿�饢�ץ�⽪λ
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
