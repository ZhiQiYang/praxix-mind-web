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

// 路由配置
const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: '*', element: <Navigate to="/" /> }
    ]
  },
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
      
      // 用戶管理
      { path: 'profile', element: <Navigate to="/app/profile/overview" /> },
      { path: 'profile/overview', element: <div>個人資料</div> },
      { path: 'profile/settings', element: <div>設置</div> },
      
      // 目標管理
      { path: 'goals/manage', element: <div>管理目標</div> },
      
      // 重定向
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: '*', element: <Navigate to="/auth/login" /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

export default routes; 