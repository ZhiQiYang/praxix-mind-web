import React from 'react';
import { Navigate } from 'react-router-dom';

// 頁面
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import StrategyToolbox from '../pages/StrategyToolbox';
import ProjectHub from '../pages/ProjectHub';
import EfficiencyBooster from '../pages/EfficiencyBooster';
import MetaLog from '../pages/MetaLog';
import ScheduleHub from '../pages/ScheduleHub';
import Analytics from '../pages/Analytics';
import GoalManagement from '../pages/GoalManagement';
import GoalDetail from '../pages/GoalDetail';

// 佈局
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import PublicLayout from '../components/layout/PublicLayout';

// 認證頁面
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// 錯誤頁面
import NotFound from '../pages/error/NotFound';

// 簡化的路由配置，避免複雜的嵌套結構
const routes = [
  // 公共頁面 - 首頁
  {
    path: '/',
    element: <Home />
  },
  
  // 應用頁面 - 需要登錄
  {
    path: 'app',
    element: <MainLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'toolbox', element: <StrategyToolbox /> },
      { path: 'projects', element: <ProjectHub /> },
      { path: 'efficiency', element: <EfficiencyBooster /> },
      { path: 'metalog', element: <MetaLog /> },
      { path: 'schedule', element: <ScheduleHub /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'profile', element: <Navigate to="/app/profile/overview" /> },
      { path: 'profile/overview', element: <div>個人資料</div> },
      { path: 'profile/settings', element: <div>設置</div> },
      { path: 'goals/manage', element: <GoalManagement /> },
      { path: 'goals/:goalId', element: <GoalDetail /> },
    ]
  },
  
  // 認證頁面
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ]
  },
  
  // 404頁面
  {
    path: '404',
    element: <NotFound />
  },
  
  // 所有其他路徑重定向到首頁
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

export default routes; 