import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

// Layout Components
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const { user } = useContext(UserContext);
  
  // 檢查用戶是否已認證，否則重定向到登錄頁面
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Outlet /> {/* 這裡渲染子路由 */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 