import React from 'react';

// 啟用調試模式的工具函數
export const enableDebugMode = () => {
  console.log('正在啟用調試模式...');
  
  // 顯示調試面板
  const debugPanel = document.querySelector('.debug-info');
  if (debugPanel) {
    debugPanel.style.display = 'block';
  }
  
  // 啟用路由調試
  window.__ROUTE_DEBUG__ = true;
  
  // 顯示React版本和路由信息
  console.log('React版本:', React.version);
  console.log('當前路由:', window.location.pathname);
  
  // 顯示環境信息
  console.log('環境信息:', {
    userAgent: navigator.userAgent,
    language: navigator.language,
    viewport: `${window.innerWidth}x${window.innerHeight}`
  });

  // 檢查TailwindCSS是否正確加載
  const hasTailwind = !!document.querySelector('style[data-tailwindcss]');
  console.log('TailwindCSS已加載:', hasTailwind);
  
  // 運行所有診斷功能
  runAllDiagnostics();

  return '調試模式已啟用。在控制台執行 window.disableDebugMode() 可以關閉調試模式。';
};

// 關閉調試模式
export const disableDebugMode = () => {
  console.log('正在關閉調試模式...');
  
  // 隱藏調試面板
  const debugPanel = document.querySelector('.debug-info');
  if (debugPanel) {
    debugPanel.style.display = 'none';
  }
  
  // 關閉路由調試
  window.__ROUTE_DEBUG__ = false;
  
  return '調試模式已關閉。';
};

// 在全局命名空間中添加調試函數
window.enableDebugMode = enableDebugMode;
window.disableDebugMode = disableDebugMode;

// 運行所有診斷功能
export const runAllDiagnostics = () => {
  console.group('網站診斷');
  debugHome();
  debugRoutes();
  debugStyles();
  debugPerformance();
  console.groupEnd();
};
window.runAllDiagnostics = runAllDiagnostics;

// 調試首頁功能
export const debugHome = () => {
  console.group('首頁組件診斷');
  
  // 檢查首頁是否加載
  const homeElement = document.querySelector('.bg-gradient-to-br');
  console.log('首頁元素是否存在:', !!homeElement);
  
  // 檢查頁面結構
  console.log('頁面結構:', {
    hasNavbar: !!document.querySelector('nav'),
    hasHero: !!document.querySelector('h1'),
    hasFeatures: !!document.querySelector('#features'),
    hasCallToAction: !!document.querySelector('.bg-blue-700')
  });
  
  console.groupEnd();
  return '首頁調試完成';
};

// 調試路由掛載情況
export const debugRoutes = () => {
  console.group('路由診斷');
  
  // 檢查路由元素
  console.log('路由元素是否存在:', !!document.querySelector('main'));
  
  // 檢查路由匹配情況
  const currentPath = window.location.pathname;
  console.log('當前路徑:', currentPath);
  
  // 檢查路由載入情況
  const childElements = document.querySelectorAll('main > *');
  console.log('路由子元素數量:', childElements.length);
  
  // 分析當前URL
  try {
    const url = new URL(window.location.href);
    console.log('URL分析:', {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash
    });
  } catch (error) {
    console.error('URL分析錯誤:', error);
  }
  
  console.groupEnd();
  return '路由調試完成';
};

// 調試樣式問題
export const debugStyles = () => {
  console.group('樣式診斷');
  
  // 檢查基本樣式
  const styles = {
    bodyBg: getComputedStyle(document.body).backgroundColor,
    rootDisplay: document.getElementById('root') ? getComputedStyle(document.getElementById('root')).display : 'unknown',
    rootHeight: document.getElementById('root') ? getComputedStyle(document.getElementById('root')).height : 'unknown',
    mainFont: getComputedStyle(document.body).fontFamily
  };
  
  console.log('基本樣式:', styles);
  
  // 檢查是否有CSS文件加載錯誤
  const failedLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(link => 
    !link.sheet
  );
  
  console.log('CSS加載錯誤:', failedLinks.length ? failedLinks : '無');
  
  // 檢查關鍵TailwindCSS類
  const tailwindClasses = [
    'flex', 'bg-white', 'text-gray-800', 'min-h-screen', 'bg-gradient-to-br'
  ];
  
  const dummyElement = document.createElement('div');
  document.body.appendChild(dummyElement);
  
  const tailwindStatus = tailwindClasses.map(cls => {
    dummyElement.className = cls;
    const style = getComputedStyle(dummyElement);
    const isApplied = cls.includes('flex') ? style.display === 'flex' :
                    cls.includes('bg-white') ? style.backgroundColor !== 'rgba(0, 0, 0, 0)' :
                    cls.includes('text-') ? style.color !== 'rgb(0, 0, 0)' :
                    cls.includes('min-h-screen') ? style.minHeight !== '0px' :
                    cls.includes('bg-gradient') ? style.backgroundImage !== 'none' : false;
    
    return {
      class: cls,
      applied: isApplied
    };
  });
  
  document.body.removeChild(dummyElement);
  console.log('Tailwind類檢查:', tailwindStatus);
  
  console.groupEnd();
  return '樣式調試完成';
};

// 調試性能問題
export const debugPerformance = () => {
  console.group('性能診斷');
  
  // 檢查基本性能指標
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domReadyTime = perfData.domComplete - perfData.domLoading;
    
    console.log('頁面加載時間:', pageLoadTime + 'ms');
    console.log('DOM準備時間:', domReadyTime + 'ms');
    
    // 檢查資源加載情況
    if (window.performance.getEntriesByType) {
      const resources = window.performance.getEntriesByType('resource');
      const slowResources = resources
        .filter(res => res.duration > 500)
        .map(res => ({ name: res.name, duration: res.duration + 'ms' }));
      
      console.log('緩慢資源 (>500ms):', slowResources.length ? slowResources : '無');
    }
  } else {
    console.log('Performance API不可用');
  }
  
  console.groupEnd();
  return '性能調試完成';
};

// 添加白屏專門診斷工具
export const debugWhiteScreen = () => {
  console.group('白屏問題診斷');
  
  // 檢查根元素
  const rootElement = document.getElementById('root');
  console.log('根元素存在:', !!rootElement);
  
  if (rootElement) {
    console.log('根元素可見性:', {
      display: getComputedStyle(rootElement).display,
      visibility: getComputedStyle(rootElement).visibility,
      opacity: getComputedStyle(rootElement).opacity,
      height: getComputedStyle(rootElement).height,
      childrenCount: rootElement.childNodes.length
    });
  }
  
  // 檢查JS錯誤
  const errors = [];
  const originalConsoleError = console.error;
  console.error = function() {
    errors.push(Array.from(arguments).join(' '));
    originalConsoleError.apply(console, arguments);
  };
  
  setTimeout(() => {
    console.error = originalConsoleError;
    console.log('捕獲的JS錯誤:', errors.length ? errors : '無');
    
    // 如果頁面依然是白屏，嘗試添加一些內容
    if (!document.body.textContent.trim()) {
      const emergencyContent = document.createElement('div');
      emergencyContent.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: sans-serif;">
          <h1>緊急備用內容</h1>
          <p>應用似乎無法正常渲染。請嘗試以下操作：</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><button onclick="window.location.reload()" style="padding: 10px 20px;">重新載入頁面</button></li>
            <li style="margin: 10px 0;"><button onclick="localStorage.clear(); window.location.reload()" style="padding: 10px 20px;">清除本地存儲並重新載入</button></li>
            <li style="margin: 10px 0;"><button onclick="window.history.pushState({}, '', '/'); window.location.reload()" style="padding: 10px 20px;">返回首頁</button></li>
          </ul>
        </div>
      `;
      document.body.appendChild(emergencyContent);
      console.log('已添加緊急備用內容');
    }
  }, 1000);
  
  console.groupEnd();
  return '白屏診斷運行中...';
};

// 將白屏診斷添加到全局
window.debugWhiteScreen = debugWhiteScreen; 