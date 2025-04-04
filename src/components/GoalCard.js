import React from 'react';
import { Link } from 'react-router-dom';

const GoalCard = ({ goal }) => {
  const { id, title, description, progress, subgoals, color, icon } = goal;
  
  // 背景色映射
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    default: 'bg-gray-500'
  };

  const bgColor = colorMap[color] || colorMap.default;
  
  // 計算已完成的子目標數量
  const completedSubgoals = subgoals.filter(sg => sg.completed).length;
  const totalSubgoals = subgoals.length;
  const subgoalProgressPercent = totalSubgoals > 0 
    ? Math.round((completedSubgoals / totalSubgoals) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* 卡片頭部 */}
      <div className={`${bgColor} p-4 flex justify-between items-center`}>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="text-white opacity-90">
          {/* 此處可放置圖標 */}
          {icon && <span>{icon}</span>}
        </div>
      </div>
      
      {/* 卡片內容 */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* 進度顯示 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">整體進度</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${bgColor} h-2 rounded-full`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* 子目標進度 */}
        {totalSubgoals > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">子目標完成</span>
              <span className="font-medium">{completedSubgoals}/{totalSubgoals}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${bgColor} h-2 rounded-full`} 
                style={{ width: `${subgoalProgressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* 底部按鈕 */}
        <div className="flex justify-between mt-4">
          <Link 
            to={`/goals/${id}`} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            查看詳情
          </Link>
          <Link 
            to={`/toolbox/${id}`} 
            className="text-sm text-green-600 hover:text-green-800"
          >
            學習工具
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoalCard; 