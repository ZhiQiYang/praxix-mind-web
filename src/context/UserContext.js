import React, { createContext, useState, useEffect } from 'react';

// 創建Context
export const UserContext = createContext();

// 模擬用戶數據
const initialUser = {
  id: 'user1',
  name: '學習者',
  email: 'learner@example.com',
  avatar: null,
  streak: 5, // 連續學習天數
  lastActive: new Date().toISOString(),
  preferences: {
    theme: 'light',
    notifications: true,
    dailyGoal: 120, // 每日學習目標(分鐘)
  },
  stats: {
    totalStudyTime: 6780, // 總學習時間(分鐘)
    completedTasks: 147, // 已完成任務數
    cards: {
      created: 85,
      mastered: 42
    }
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('praxisMindUser');
    return savedUser ? JSON.parse(savedUser) : initialUser;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 當用戶數據變更時保存到localStorage
  useEffect(() => {
    localStorage.setItem('praxisMindUser', JSON.stringify(user));
  }, [user]);

  // 更新用戶個人資料
  const updateProfile = (updatedProfile) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  // 更新用戶設置
  const updatePreferences = (updatedPreferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updatedPreferences
      }
    }));
  };

  // 記錄學習時間
  const logStudyTime = (minutes) => {
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalStudyTime: prev.stats.totalStudyTime + minutes
      },
      lastActive: new Date().toISOString()
    }));
  };

  // 記錄完成的任務
  const logCompletedTask = () => {
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        completedTasks: prev.stats.completedTasks + 1
      }
    }));
  };

  // 更新學習連續天數
  const updateStreak = () => {
    // 這裡簡化處理，實際應用中需要根據日期判斷連續性
    setUser(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  // 登出(重設數據)
  const logout = () => {
    localStorage.removeItem('praxisMindUser');
    setUser(initialUser);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      error,
      updateProfile,
      updatePreferences,
      logStudyTime,
      logCompletedTask,
      updateStreak,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}; 