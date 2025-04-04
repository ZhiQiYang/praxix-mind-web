import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PublicNavbar from './PublicNavbar';

const PublicLayout = () => {
  const { user } = useContext(UserContext);
  
  // 如果用戶已登錄，則重定向到應用首頁
  if (user) {
    return <Navigate to="/app" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout; 