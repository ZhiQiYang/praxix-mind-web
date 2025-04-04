import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GoalsContext } from '../context/GoalsContext';

const GoalDetail = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { goals, addSubgoal, toggleSubgoalStatus, addResource, deleteGoal } = useContext(GoalsContext);
  
  const goal = goals.find(g => g.id === goalId);
  
  const [newSubgoal, setNewSubgoal] = useState('');
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', url: '' });
  
  if (!goal) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <p className="text-red-800">找不到該學習目標，可能已被刪除。</p>
        </div>
        <Link 
          to="/app/goals/manage" 
          className="text-blue-600 hover:text-blue-800"
        >
          返回管理頁面
        </Link>
      </div>
    );
  }
  
  // 獲取顏色映射
  const getColorClass = (colorName) => {
    const colorMap = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-orange-500 text-white',
      red: 'bg-red-500 text-white'
    };
    
    return colorMap[colorName] || 'bg-gray-500 text-white';
  };
  
  // 處理添加子目標
  const handleAddSubgoal = () => {
    if (!newSubgoal.trim()) return;
    
    addSubgoal(goal.id, newSubgoal);
    setNewSubgoal('');
  };
  
  // 處理添加資源
  const handleAddResource = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) return;
    
    addResource(goal.id, newResource);
    setNewResource({ title: '', url: '' });
    setIsAddingResource(false);
  };
  
  // 處理刪除目標
  const handleDeleteGoal = () => {
    if (window.confirm('確定要刪除這個學習目標嗎？這將刪除所有相關的子目標和資源。')) {
      deleteGoal(goal.id);
      navigate('/app/goals/manage');
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link 
          to="/app/goals/manage" 
          className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
        >
          ← 返回目標管理
        </Link>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-3xl mr-2">{goal.icon}</span>
              {goal.title}
            </h1>
            <p className="text-gray-600">{goal.description}</p>
          </div>
          
          <button 
            onClick={handleDeleteGoal}
            className="text-red-600 hover:text-red-800"
          >
            刪除目標
          </button>
        </div>
      </div>
      
      {/* 進度區塊 */}
      <div className={`${getColorClass(goal.color)} rounded-lg p-6 mb-6`}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">整體進度</h2>
          <span className="text-xl font-bold">{goal.progress}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-2">
          <div 
            className="bg-white h-4 rounded-full"
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
        <p className="text-sm opacity-90">
          {goal.progress === 100 
            ? '恭喜！您已完成這個學習目標。' 
            : '繼續努力完成子目標，以提高整體進度。'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 子目標區塊 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">子目標</h2>
            
            <ul className="space-y-3 mb-4">
              {goal.subgoals && goal.subgoals.length > 0 ? (
                goal.subgoals.map(subgoal => (
                  <li 
                    key={subgoal.id} 
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={subgoal.completed}
                      onChange={() => toggleSubgoalStatus(goal.id, subgoal.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span className={subgoal.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
                      {subgoal.title}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center py-3">尚未設定子目標</p>
              )}
            </ul>
            
            <div className="mt-4 flex">
              <input 
                type="text"
                value={newSubgoal}
                onChange={(e) => setNewSubgoal(e.target.value)}
                placeholder="添加新的子目標..."
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleAddSubgoal}
                disabled={!newSubgoal.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                添加
              </button>
            </div>
          </div>
        </div>
        
        {/* 資源區塊 */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">學習資源</h2>
            
            <ul className="space-y-3 mb-4">
              {goal.resources && goal.resources.length > 0 ? (
                goal.resources.map(resource => (
                  <li key={resource.id} className="border rounded-lg overflow-hidden">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-3 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-blue-600 font-medium">{resource.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{resource.url}</p>
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center py-3">尚未添加學習資源</p>
              )}
            </ul>
            
            {isAddingResource ? (
              <div className="mt-4 border rounded-lg p-3">
                <h3 className="font-medium mb-2">添加新資源</h3>
                <input 
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  placeholder="資源名稱..."
                  className="w-full border rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="text"
                  value={newResource.url}
                  onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                  placeholder="URL..."
                  className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button 
                    onClick={() => setIsAddingResource(false)}
                    className="text-gray-600 hover:text-gray-800 mr-2"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleAddResource}
                    disabled={!newResource.title.trim() || !newResource.url.trim()}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  >
                    添加
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsAddingResource(true)}
                className="w-full py-2 text-center text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
              >
                + 添加學習資源
              </button>
            )}
          </div>
          
          {/* 學習工具快速連結 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">學習工具</h2>
            <div className="space-y-2">
              <Link 
                to={`/app/toolbox?goal=${goal.id}`}
                className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                學習策略工具
              </Link>
              <Link 
                to={`/app/schedule?goal=${goal.id}`}
                className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                建立學習計劃
              </Link>
              <Link 
                to={`/app/metalog?goal=${goal.id}`}
                className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
              >
                學習筆記與反思
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail; 