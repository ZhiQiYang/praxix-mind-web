import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

// Context
import { UserProvider } from './context/UserContext';
import { GoalsProvider } from './context/GoalsContext';
import { ProjectsProvider } from './context/ProjectsContext';

// 導入路由配置
import routes from './routes';

// 錯誤邊界組件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("渲染錯誤:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, margin: 20, border: '1px solid red', borderRadius: 5 }}>
          <h1>出現錯誤</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>查看詳情</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// 路由渲染組件
const AppRoutes = () => {
  // 添加調試日誌
  useEffect(() => {
    console.log("AppRoutes 已掛載");
    return () => console.log("AppRoutes 已卸載");
  }, []);

  try {
    const element = useRoutes(routes);
    console.log("路由匹配結果:", element ? "路由已匹配" : "無匹配路由");
    return element;
  } catch (error) {
    console.error("路由渲染錯誤:", error);
    return <div>路由錯誤: {error.message}</div>;
  }
};

// 包裝App以處理路由
const RoutedApp = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("RoutedApp 已掛載");
    setIsLoaded(true);
    return () => console.log("RoutedApp 已卸載");
  }, []);

  // 添加簡單的載入指示器
  if (!isLoaded) {
    return <div>載入中...</div>;
  }

  return (
    <Router>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
};

function App() {
  useEffect(() => {
    console.log("App 已掛載");
    return () => console.log("App 已卸載");
  }, []);

  return (
    <ErrorBoundary>
      <div className="debug-info" style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '5px 10px',
        fontSize: '12px',
        zIndex: 9999,
        display: 'none'
      }}>
        版本: {process.env.REACT_APP_VERSION || '開發版'}
      </div>
      <UserProvider>
        <GoalsProvider>
          <ProjectsProvider>
            <RoutedApp />
          </ProjectsProvider>
        </GoalsProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App; 