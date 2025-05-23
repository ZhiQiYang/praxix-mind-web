import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 創建Context
export const GoalsContext = createContext();

// 模擬資料 (實際專案會連接到API)
const initialGoals = [
  {
    id: '1',
    title: 'Python & AI 開發',
    description: '掌握 Python 程式設計與人工智慧開發技術',
    progress: 45,
    color: 'blue',
    icon: '🐍',
    subgoals: [
      { id: 's1', title: 'Flask 路由設計', completed: true },
      { id: 's2', title: 'API 開發', completed: true },
      { id: 's3', title: 'SQLAlchemy ORM', completed: false },
      { id: 's4', title: '機器學習模型整合', completed: false },
    ],
    resources: [
      { id: 'r1', title: 'Flask 官方文檔', url: 'https://flask.palletsprojects.com/' },
      { id: 'r2', title: '實戰專案：LINE Bot', url: '/projects/linebot' },
    ]
  },
  {
    id: '2',
    title: 'GitHub 專案管理',
    description: '熟練掌握 Git 流程與專案協作方法',
    progress: 60,
    color: 'purple',
    icon: '📊',
    subgoals: [
      { id: 's5', title: 'Git 分支管理', completed: true },
      { id: 's6', title: 'Pull Request 工作流', completed: true },
      { id: 's7', title: 'CI/CD 自動化', completed: true },
      { id: 's8', title: 'Open Source 貢獻', completed: false },
    ],
    resources: [
      { id: 'r3', title: 'Pro Git 電子書', url: 'https://git-scm.com/book/zh/v2' },
      { id: 'r4', title: 'GitHub Actions 筆記', url: '/notes/github-actions' },
    ]
  },
  {
    id: '3',
    title: '生理學知識',
    description: '建立生理學原理與人體系統運作的全面理解',
    progress: 30,
    color: 'green',
    icon: '🧠',
    subgoals: [
      { id: 's9', title: '神經系統', completed: true },
      { id: 's10', title: '循環系統', completed: false },
      { id: 's11', title: '消化系統', completed: false },
      { id: 's12', title: '內分泌系統', completed: false },
    ],
    resources: [
      { id: 'r5', title: '生理學圖解筆記', url: '/notes/physiology' },
      { id: 'r6', title: '3D 解剖學資源', url: 'https://example.com/anatomy' },
    ]
  }
];

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState(() => {
    // 嘗試從本地存儲中獲取目標資料
    const localData = localStorage.getItem('praxisMindGoals');
    return localData ? JSON.parse(localData) : initialGoals;
  });

  // 當目標資料變化時，保存到本地存儲
  useEffect(() => {
    localStorage.setItem('praxisMindGoals', JSON.stringify(goals));
  }, [goals]);

  // 添加新目標
  const addGoal = (newGoal) => {
    const goalWithId = {
      ...newGoal,
      id: uuidv4(),
      progress: 0,
      subgoals: [],
      resources: []
    };
    setGoals([...goals, goalWithId]);
  };

  // 更新目標
  const updateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  // 刪除目標
  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // 添加子目標
  const addSubgoal = (goalId, subgoalTitle) => {
    const newSubgoal = {
      id: uuidv4(),
      title: subgoalTitle,
      completed: false
    };

    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          subgoals: [...goal.subgoals, newSubgoal]
        };
      }
      return goal;
    }));
  };

  // 更新子目標狀態
  const toggleSubgoalStatus = (goalId, subgoalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedSubgoals = goal.subgoals.map(sg => 
          sg.id === subgoalId ? { ...sg, completed: !sg.completed } : sg
        );
        
        // 重新計算目標進度
        const completedCount = updatedSubgoals.filter(sg => sg.completed).length;
        const totalCount = updatedSubgoals.length;
        const newProgress = totalCount > 0 
          ? Math.round((completedCount / totalCount) * 100) 
          : 0;
        
        return {
          ...goal,
          subgoals: updatedSubgoals,
          progress: newProgress
        };
      }
      return goal;
    }));
  };

  // 添加資源
  const addResource = (goalId, resource) => {
    const newResource = {
      id: uuidv4(),
      ...resource
    };

    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          resources: [...goal.resources, newResource]
        };
      }
      return goal;
    }));
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      addSubgoal,
      toggleSubgoalStatus,
      addResource
    }}>
      {children}
    </GoalsContext.Provider>
  );
}; 