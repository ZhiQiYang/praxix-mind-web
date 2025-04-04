import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  // 快速操作選項
  const actions = [
    {
      id: 1,
      name: '複習卡片',
      description: '今日待複習: 12',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: '/toolbox/spaced',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    {
      id: 2,
      name: '新增筆記',
      description: '快速記錄想法',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      link: '/metalog/new',
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    {
      id: 3,
      name: '專案進度',
      description: '檢視進行中的專案',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      link: '/projects',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    {
      id: 4,
      name: '設定學習時間',
      description: '今日排程',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/schedule',
      color: 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(action => (
        <Link 
          key={action.id}
          to={action.link}
          className={`p-3 rounded-lg flex flex-col transition-colors duration-200 ${action.color}`}
        >
          <div className="flex items-center mb-2">
            {action.icon}
            <span className="ml-1 font-medium">{action.name}</span>
          </div>
          <span className="text-xs">{action.description}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions; 