import React, { useContext, useState } from 'react';
import { GoalsContext } from '../context/GoalsContext';
import { Link } from 'react-router-dom';

const GoalManagement = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useContext(GoalsContext);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    color: 'blue',
    icon: '📚'
  });

  // 可用的顏色選項
  const colorOptions = [
    { value: 'blue', label: '藍色', class: 'bg-blue-500' },
    { value: 'green', label: '綠色', class: 'bg-green-500' },
    { value: 'purple', label: '紫色', class: 'bg-purple-500' },
    { value: 'orange', label: '橙色', class: 'bg-orange-500' },
    { value: 'red', label: '紅色', class: 'bg-red-500' }
  ];

  // 可用的圖標選項
  const iconOptions = ['📚', '🐍', '📊', '🧠', '💻', '🔍', '🌐', '📝', '⚙️', '🔬'];

  // 處理添加新目標
  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;
    
    addGoal(newGoal);
    setNewGoal({
      title: '',
      description: '',
      color: 'blue',
      icon: '📚'
    });
    setIsAddingGoal(false);
  };

  // 處理更新目標
  const handleUpdateGoal = (goalId) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    if (!goalToUpdate) return;
    
    updateGoal(goalToUpdate);
    setEditingGoalId(null);
  };

  // 處理刪除目標確認
  const handleDeleteConfirmation = (goalId) => {
    if (window.confirm('確定要刪除這個學習目標嗎？這將刪除所有相關的子目標和資源。')) {
      deleteGoal(goalId);
    }
  };

  // 處理修改目標狀態
  const handleGoalChange = (goalId, field, value) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, [field]: value };
      }
      return goal;
    });
    
    const updatedGoal = updatedGoals.find(goal => goal.id === goalId);
    updateGoal(updatedGoal);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">管理學習目標</h1>
          <p className="text-gray-600">添加、編輯或刪除您的核心學習領域</p>
        </div>
        <button 
          onClick={() => setIsAddingGoal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          添加新目標
        </button>
      </div>
      
      {/* 現有目標列表 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">當前學習目標</h2>
        
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">尚未設定任何學習目標</p>
        ) : (
          <div className="space-y-4">
            {goals.map(goal => (
              <div 
                key={goal.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{goal.icon}</span>
                    <div>
                      {editingGoalId === goal.id ? (
                        <input 
                          type="text"
                          value={goal.title}
                          onChange={(e) => handleGoalChange(goal.id, 'title', e.target.value)}
                          className="border rounded px-2 py-1 text-lg font-semibold w-full mb-1"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                      )}
                      
                      {editingGoalId === goal.id ? (
                        <textarea 
                          value={goal.description}
                          onChange={(e) => handleGoalChange(goal.id, 'description', e.target.value)}
                          className="border rounded px-2 py-1 text-sm w-full mb-2"
                          rows="2"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-500 mr-2">進度:</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-${goal.color}-500`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {editingGoalId === goal.id ? (
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleUpdateGoal(goal.id)}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          保存
                        </button>
                        <button 
                          onClick={() => setEditingGoalId(null)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button 
                          onClick={() => setEditingGoalId(goal.id)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          編輯
                        </button>
                        <button 
                          onClick={() => handleDeleteConfirmation(goal.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          刪除
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {editingGoalId === goal.id && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center mb-3">
                      <span className="text-sm text-gray-700 mr-2">顏色:</span>
                      <div className="flex space-x-2">
                        {colorOptions.map(option => (
                          <div 
                            key={option.value}
                            onClick={() => handleGoalChange(goal.id, 'color', option.value)}
                            className={`w-6 h-6 rounded-full ${option.class} cursor-pointer ${goal.color === option.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                            title={option.label}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-2">圖標:</span>
                      <div className="flex space-x-2 flex-wrap">
                        {iconOptions.map(icon => (
                          <div 
                            key={icon}
                            onClick={() => handleGoalChange(goal.id, 'icon', icon)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer ${goal.icon === icon ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t flex justify-between">
                  <div>
                    <span className="text-xs text-gray-500">子目標: {goal.subgoals?.length || 0}</span>
                    <span className="text-xs text-gray-500 ml-4">資源: {goal.resources?.length || 0}</span>
                  </div>
                  <Link 
                    to={`/app/goals/${goal.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    查看詳情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 添加新目標表單 */}
      {isAddingGoal && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">添加新學習目標</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">目標名稱</label>
              <input 
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如: Web前端開發"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">描述</label>
              <textarea 
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="簡短描述您的學習目標..."
                rows="3"
              ></textarea>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-gray-700 mr-3">顏色:</span>
              <div className="flex space-x-2">
                {colorOptions.map(option => (
                  <div 
                    key={option.value}
                    onClick={() => setNewGoal({...newGoal, color: option.value})}
                    className={`w-6 h-6 rounded-full ${option.class} cursor-pointer ${newGoal.color === option.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    title={option.label}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-700 mr-3">圖標:</span>
              <div className="flex space-x-2 flex-wrap">
                {iconOptions.map(icon => (
                  <div 
                    key={icon}
                    onClick={() => setNewGoal({...newGoal, icon: icon})}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer ${newGoal.icon === icon ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-3">
              <button 
                onClick={() => setIsAddingGoal(false)}
                className="text-gray-600 hover:text-gray-800 mr-3"
              >
                取消
              </button>
              <button 
                onClick={handleAddGoal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newGoal.title.trim()}
              >
                確認添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalManagement; 