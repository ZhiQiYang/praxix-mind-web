import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const AuthLayout = () => {
  const { user } = useContext(UserContext);
  
  // 如果用戶已登錄，則重定向到首頁
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Praxis Mind
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          高效學習與個人成長平台
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet /> {/* 這裡渲染登錄、註冊等子組件 */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 