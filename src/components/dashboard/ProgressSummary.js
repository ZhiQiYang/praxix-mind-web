import React from 'react';

const ProgressSummary = () => {
  // 示例數據
  const weeklyData = {
    completedTasks: 18,
    totalTasks: 25,
    studyHours: 14.5,
    weeklyGoal: 20,
    streak: 5,
    categories: [
      { id: 1, name: '理論學習', percentage: 35, color: 'blue' },
      { id: 2, name: '實踐項目', percentage: 45, color: 'green' },
      { id: 3, name: '複習鞏固', percentage: 20, color: 'purple' }
    ]
  };
  
  const tasksCompletionRate = Math.round((weeklyData.completedTasks / weeklyData.totalTasks) * 100);
  const studyHoursRate = Math.round((weeklyData.studyHours / weeklyData.weeklyGoal) * 100);
  
  // 獲取進度條顏色
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };
  
  // 獲取類別進度條顏色
  const getCategoryColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    
    return colorMap[color] || 'bg-gray-500';
  };
  
  return (
    <div className="space-y-5">
      {/* 任務完成率 */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">任務完成率</span>
          <span className="text-sm text-gray-500">{weeklyData.completedTasks}/{weeklyData.totalTasks}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(tasksCompletionRate)}`} 
            style={{ width: `${tasksCompletionRate}%` }}
          ></div>
        </div>
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">{tasksCompletionRate}%</span>
        </div>
      </div>
      
      {/* 學習時間進度 */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">學習時數</span>
          <span className="text-sm text-gray-500">{weeklyData.studyHours}/{weeklyData.weeklyGoal}小時</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(studyHoursRate)}`} 
            style={{ width: `${studyHoursRate}%` }}
          ></div>
        </div>
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-500">{studyHoursRate}%</span>
        </div>
      </div>
      
      {/* 連續學習天數 */}
      <div className="flex items-center bg-blue-50 p-3 rounded-lg">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">連續學習天數</p>
          <p className="text-xl font-bold text-blue-600">{weeklyData.streak} 天</p>
        </div>
      </div>
      
      {/* 學習時間分配 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">學習時間分配</h4>
        <div className="space-y-3">
          {weeklyData.categories.map(category => (
            <div key={category.id}>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">{category.name}</span>
                <span className="text-xs text-gray-500">{category.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${getCategoryColor(category.color)}`} 
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary; 