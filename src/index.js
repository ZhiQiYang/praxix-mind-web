import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './debugging'; // 導入調試工具

// 創建全局錯誤處理器
window.addEventListener('error', (event) => {
  console.error('全局錯誤:', event.error);
  
  // 嘗試顯示錯誤信息在頁面上
  const rootElement = document.getElementById('root');
  if (rootElement && event.error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding: 20px; margin: 20px; border: 1px solid red; background: #fff3f3;';
    errorDiv.innerHTML = `
      <h2>頁面載入錯誤</h2>
      <p>${event.error.message || '未知錯誤'}</p>
      <details>
        <summary>查看詳情</summary>
        <pre style="white-space: pre-wrap;">${event.error.stack || '無堆棧信息'}</pre>
      </details>
    `;
    
    if (rootElement.childNodes.length === 0) {
      rootElement.appendChild(errorDiv);
    }
  }
});

// 確保React掛載過程被包裝在try-catch中
try {
  console.log('開始渲染應用...');
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  // 啟用嚴格模式以幫助檢測潛在問題
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('應用渲染完成');
} catch (error) {
  console.error('應用渲染失敗:', error);
  
  // 嘗試使用基本HTML顯示錯誤
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; margin: 20px; border: 1px solid red; background: #fff3f3;">
        <h2>渲染錯誤</h2>
        <p>${error.message || '未知錯誤'}</p>
        <details>
          <summary>查看詳情</summary>
          <pre style="white-space: pre-wrap;">${error.stack || '無堆棧信息'}</pre>
        </details>
      </div>
    `;
  }
}

// 添加啟用調試模式的說明
console.log('提示: 在控制台執行 window.enableDebugMode() 啟用調試模式');

reportWebVitals();

// 添加一個基本的檢查，確保頁面至少有內容
setTimeout(() => {
  const rootContent = document.getElementById('root');
  if (rootContent && (!rootContent.childNodes.length || rootContent.innerHTML.trim() === '')) {
    console.error('警告: 應用渲染後頁面為空');
    
    // 嘗試顯示一個基本的調試信息
    rootContent.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>應用似乎沒有正確渲染</h2>
        <p>請檢查控制台是否有錯誤信息。</p>
        <button onclick="window.location.reload()">重新加載頁面</button>
      </div>
    `;
  }
}, 2000); // 給應用2秒鐘加載時間 