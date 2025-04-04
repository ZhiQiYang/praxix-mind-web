import React, { createContext, useState, useEffect } from 'react';

// 創建Context
export const UserContext = createContext();

// 模擬用戶數據
const initialUser = null; // 預設為null，表示未登錄

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('praxisMindUser');
    return savedUser ? JSON.parse(savedUser) : initialUser;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 當用戶數據變更時保存到localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('praxisMindUser', JSON.stringify(user));
    }
  }, [user]);

  // 登錄
  const login = (userData) => {
    setUser({
      ...userData,
      preferences: userData.preferences || {
        theme: 'light',
        notifications: true,
        dailyGoal: 120,
      },
      stats: userData.stats || {
        totalStudyTime: 0,
        completedTasks: 0,
        cards: {
          created: 0,
          mastered: 0
        }
      },
      streak: userData.streak || 0,
      lastActive: userData.lastActive || new Date().toISOString()
    });
  };

  // 更新用戶個人資料
  const updateProfile = (updatedProfile) => {
    if (!user) return;
    
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  // 更新用戶設置
  const updatePreferences = (updatedPreferences) => {
    if (!user) return;
    
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
    if (!user) return;
    
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
    if (!user) return;
    
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
    if (!user) return;
    
    // 這裡簡化處理，實際應用中需要根據日期判斷連續性
    setUser(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('praxisMindUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      logout,
      updateProfile,
      updatePreferences,
      logStudyTime,
      logCompletedTask,
      updateStreak
    }}>
      {children}
    </UserContext.Provider>
  );
}; 