import React from 'react';

const DailyTasksList = () => {
  // 示例任務數據
  const tasks = [
    {
      id: 1,
      title: '複習間隔重複卡片',
      category: '記憶鞏固',
      timeEstimate: '25分鐘',
      priority: 'high',
      color: 'blue'
    },
    {
      id: 2,
      title: '完成專案第一階段',
      category: '實踐應用',
      timeEstimate: '90分鐘',
      priority: 'medium',
      color: 'green'
    },
    {
      id: 3,
      title: '閱讀《深度學習》第三章',
      category: '知識獲取',
      timeEstimate: '60分鐘',
      priority: 'medium',
      color: 'purple'
    }
  ];

  // 根據優先級獲取對應的顏色
  const getPriorityColor = (priority, color) => {
    const baseColor = color || 'blue';
    
    const colorMap = {
      blue: {
        high: 'border-blue-500',
        medium: 'border-blue-400',
        low: 'border-blue-300'
      },
      green: {
        high: 'border-green-500',
        medium: 'border-green-400',
        low: 'border-green-300'
      },
      purple: {
        high: 'border-purple-500',
        medium: 'border-purple-400',
        low: 'border-purple-300'
      },
      orange: {
        high: 'border-orange-500',
        medium: 'border-orange-400',
        low: 'border-orange-300'
      }
    };

    return colorMap[baseColor]?.[priority] || 'border-gray-300';
  };

  // 獲取類別背景色
  const getCategoryBgColor = (color) => {
    const bgColorMap = {
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      orange: 'bg-orange-100 text-orange-700'
    };

    return bgColorMap[color] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">總計: {tasks.length} 項任務</span>
        <button className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
          新增任務
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map(task => (
          <li 
            key={task.id}
            className={`flex items-center p-3 border-l-4 ${getPriorityColor(task.priority, task.color)} bg-white rounded-lg shadow-sm hover:shadow transition-all duration-200`}
          >
            <input 
              type="checkbox" 
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" 
            />
            
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{task.category}</p>
            </div>
            
            <span className={`text-xs px-2 py-1 rounded ${getCategoryBgColor(task.color)}`}>
              {task.timeEstimate}
            </span>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">今天沒有待辦任務</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800">
            添加新任務
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyTasksList; 