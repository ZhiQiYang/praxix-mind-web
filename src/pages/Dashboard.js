import React, { useContext } from 'react';
import { GoalsContext } from '../context/GoalsContext';
import { Link } from 'react-router-dom';

// Components
import GoalCard from '../components/dashboard/GoalCard';
import DailyTasksList from '../components/dashboard/DailyTasksList';
import ProgressSummary from '../components/dashboard/ProgressSummary';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const { goals } = useContext(GoalsContext);

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">學習儀表板</h1>
        <p className="text-gray-600">歡迎回來！這是你的個人化學習中心</p>
      </div>

      {/* 核心學習領域 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">核心學習領域</h2>
          <Link to="/app/goals/manage" className="text-blue-600 hover:text-blue-800">
            管理目標
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
          
          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>添加新領域</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 今日任務 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">今日任務</h2>
            <DailyTasksList />
          </div>
        </div>

        {/* 右側面板 */}
        <div className="space-y-6">
          {/* 進度摘要 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">本週進度</h2>
            <ProgressSummary />
          </div>

          {/* 快速操作 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">快速操作</h2>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 