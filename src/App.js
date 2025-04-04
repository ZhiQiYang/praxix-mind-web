import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import StrategyToolbox from './pages/StrategyToolbox';
import ProjectHub from './pages/ProjectHub';
import EfficiencyBooster from './pages/EfficiencyBooster';
import MetaLog from './pages/MetaLog';
import ScheduleHub from './pages/ScheduleHub';
import Analytics from './pages/Analytics';

// Context
import { UserProvider } from './context/UserContext';
import { GoalsProvider } from './context/GoalsContext';
import { ProjectsProvider } from './context/ProjectsContext';

// 導入路由配置
import routes from './routes';

// 路由渲染組件
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

// 包裝App以處理路由
const RoutedApp = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <GoalsProvider>
        <ProjectsProvider>
          <RoutedApp />
        </ProjectsProvider>
      </GoalsProvider>
    </UserProvider>
  );
}

export default App; 