import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineBell, AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: '記憶卡片複習提醒',
      message: '今天有25張卡片需要複習',
      time: '10分鐘前',
      isRead: false
    },
    {
      id: 2,
      title: '專案截止日提醒',
      message: 'LINE Bot 專案計畫將在3天後截止',
      time: '2小時前',
      isRead: true
    }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const handleSearch = (e) => {
    e.preventDefault();
    // 實作搜尋功能
    console.log('搜尋:', searchQuery);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
      {/* 搜尋列 */}
      <div className="w-full max-w-xl">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="搜尋目標、工具、筆記..."
            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <AiOutlineSearch className="w-5 h-5" />
          </button>
        </form>
      </div>
      
      {/* 右側功能區 */}
      <div className="flex items-center space-x-4">
        {/* 通知按鈕 */}
        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleNotifications}
          >
            <AiOutlineBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
          </button>
          
          {/* 通知下拉選單 */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border">
              <div className="px-4 py-2 border-b flex justify-between items-center">
                <h3 className="font-medium">通知</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    全部標為已讀
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    無通知
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* 幫助按鈕 */}
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <AiOutlineQuestionCircle className="w-6 h-6" />
        </button>
        
        {/* 用戶選單 */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center focus:outline-none"
          >
            <AiOutlineUser className="w-5 h-5" />
          </button>
          
          {/* 用戶下拉選單 */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                個人資料
              </a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                設定
              </a>
              <a href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                幫助中心
              </a>
              <div className="border-t my-1"></div>
              <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                登出
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 