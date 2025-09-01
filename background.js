// background.js

chrome.action.onClicked.addListener(() => {
    // 打开侧边面板
    chrome.sidePanel.setOptions({
      path: 'popup.html',  // 加载你的 popup.html 页面
      enabled: true        // 确保启用侧边面板
    });
  });
  