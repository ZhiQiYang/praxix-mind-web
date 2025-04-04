import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AiOutlineDashboard, 
  AiOutlineTool, 
  AiOutlineProject, 
  AiOutlineRocket,
  AiOutlineBulb,
  AiOutlineSchedule,
  AiOutlineBarChart,
  AiOutlineMenu,
  AiOutlineClose
} from 'react-icons/ai';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      path: '/',
      name: '儀表板',
      icon: <AiOutlineDashboard className="w-6 h-6" />
    },
    {
      path: '/toolbox',
      name: '學習工具箱',
      icon: <AiOutlineTool className="w-6 h-6" />
    },
    {
      path: '/projects',
      name: '專案中心',
      icon: <AiOutlineProject className="w-6 h-6" />
    },
    {
      path: '/efficiency',
      name: '效率加速器',
      icon: <AiOutlineRocket className="w-6 h-6" />
    },
    {
      path: '/metalog',
      name: '元認知日誌',
      icon: <AiOutlineBulb className="w-6 h-6" />
    },
    {
      path: '/schedule',
      name: '排程中心',
      icon: <AiOutlineSchedule className="w-6 h-6" />
    },
    {
      path: '/analytics',
      name: '學習分析',
      icon: <AiOutlineBarChart className="w-6 h-6" />
    }
  ];

  // 移動端菜單切換器
  const MobileMenuToggle = () => (
    <div className="md:hidden fixed top-4 left-4 z-20">
      <button
        onClick={toggleMobileMenu}
        className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md"
      >
        {isMobileMenuOpen ? (
          <AiOutlineClose className="w-6 h-6" />
        ) : (
          <AiOutlineMenu className="w-6 h-6" />
        )}
      </button>
    </div>
  );

  return (
    <>
      <MobileMenuToggle />
      
      {/* 桌面側邊欄 */}
      <aside
        className={`
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          fixed md:relative z-10 
          h-screen bg-white shadow-md transition-all duration-300 ease-in-out
        `}
      >
        {/* Logo 區域 */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Praxis</span>
              <span className="ml-1 text-2xl font-bold text-gray-700">Mind</span>
            </div>
          )}

          {/* 切換側邊欄寬度按鈕 */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isCollapsed ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>

        {/* 導航選單 */}
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path} className="px-2 py-1">
                  <Link
                    to={item.path}
                    className={`
                      flex items-center py-3 px-4 rounded-md
                      ${isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }
                      transition-colors duration-200
                    `}
                    onClick={() => {
                      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span className="ml-4">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 