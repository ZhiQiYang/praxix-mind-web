import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  // 快速操作項目
  const quickActionItems = [
    { 
      id: 1, 
      title: 'Python 練習',
      description: '練習最新的Python語法和功能',
      icon: '💻',
      color: 'blue',
      link: '/app/toolbox' 
    },
    { 
      id: 2, 
      title: '統計練習',
      description: '使用R語言進行統計分析練習',
      icon: '📊',
      color: 'purple',
      link: '/app/efficiency' 
    },
    { 
      id: 3, 
      title: '學習筆記',
      description: '整理今天的學習內容和筆記',
      icon: '📝',
      color: 'green',
      link: '/app/metalog' 
    },
    { 
      id: 4, 
      title: '番茄工作法',
      description: '使用定時器進行專注學習',
      icon: '⏱️',
      color: 'orange',
      link: '/app/efficiency' 
    }
  ];

  return (
    <div className="space-y-3">
      {quickActionItems.map((item) => (
        <Link 
          key={item.id} 
          to={item.link}
          className={`block p-3 rounded-md bg-${item.color}-100 hover:bg-${item.color}-200 transition-colors`}
        >
          <div className="flex items-center">
            <div className="mr-3 text-xl">{item.icon}</div>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions; 