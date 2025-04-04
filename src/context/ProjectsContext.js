import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 創建Context
export const ProjectsContext = createContext();

// 模擬專案數據
const initialProjects = [
  {
    id: 'p1',
    title: 'LINE Bot 助手開發',
    description: '使用 Python 和 Flask 框架開發一個 LINE 聊天機器人，實現個人學習助手功能',
    status: 'in_progress', // in_progress, completed, planned
    progress: 35,
    startDate: '2025-03-15',
    dueDate: '2025-04-30',
    priority: 'high',
    tags: ['Python', 'Flask', 'API', '實踐專案'],
    tasks: [
      { id: 't1', title: '建立 Flask 專案基礎架構', completed: true },
      { id: 't2', title: '實現 LINE 訊息傳遞', completed: true },
      { id: 't3', title: '設計對話流程', completed: false },
      { id: 't4', title: '整合學習資源 API', completed: false },
      { id: 't5', title: '部署到雲端伺服器', completed: false }
    ],
    notes: [
      { id: 'n1', content: 'Line Messaging API 文檔：https://developers.line.biz/en/docs/messaging-api/', createdAt: '2025-03-16' },
      { id: 'n2', content: '使用 ngrok 進行開發環境測試', createdAt: '2025-03-18' }
    ],
    resources: [
      { id: 'r1', title: 'LINE Developers', url: 'https://developers.line.biz/' },
      { id: 'r2', title: 'Flask Documentation', url: 'https://flask.palletsprojects.com/' },
    ]
  },
  {
    id: 'p2',
    title: '個人資料視覺化',
    description: '使用 D3.js 對個人學習數據進行視覺化展示，幫助分析學習模式和效率',
    status: 'planned',
    progress: 0,
    startDate: '2025-05-10',
    dueDate: '2025-06-15',
    priority: 'medium',
    tags: ['D3.js', 'JavaScript', '數據視覺化'],
    tasks: [
      { id: 't6', title: '學習 D3.js 基礎', completed: false },
      { id: 't7', title: '設計視覺化圖表', completed: false },
      { id: 't8', title: '實現數據處理邏輯', completed: false },
      { id: 't9', title: '整合到學習平台', completed: false }
    ],
    notes: [],
    resources: [
      { id: 'r3', title: 'D3.js Documentation', url: 'https://d3js.org/' },
      { id: 'r4', title: 'Data Visualization Best Practices', url: 'https://example.com/data-viz' },
    ]
  },
  {
    id: 'p3',
    title: '生理學筆記系統',
    description: '建立結構化的生理學筆記系統，整合圖解和視覺化內容',
    status: 'completed',
    progress: 100,
    startDate: '2025-01-10',
    dueDate: '2025-02-28',
    priority: 'medium',
    tags: ['生理學', '筆記系統', '知識管理'],
    tasks: [
      { id: 't10', title: '設計筆記結構', completed: true },
      { id: 't11', title: '整合圖片資源', completed: true },
      { id: 't12', title: '連結相關概念', completed: true },
      { id: 't13', title: '建立複習系統', completed: true }
    ],
    notes: [
      { id: 'n3', content: '可使用 Anki 建立神經系統相關的複習卡片', createdAt: '2025-01-20' }
    ],
    resources: [
      { id: 'r5', title: '人體解剖學資源庫', url: 'https://example.com/anatomy' },
    ]
  }
];

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('praxisMindProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });

  // 當專案數據變更時保存到localStorage
  useEffect(() => {
    localStorage.setItem('praxisMindProjects', JSON.stringify(projects));
  }, [projects]);

  // 添加新專案
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: uuidv4(),
      progress: 0,
      tasks: [],
      notes: [],
      resources: []
    };
    setProjects([...projects, projectWithId]);
  };

  // 更新專案
  const updateProject = (updatedProject) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
  };

  // 刪除專案
  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  // 添加任務
  const addTask = (projectId, taskTitle) => {
    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      completed: false
    };

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = [...project.tasks, newTask];
        return {
          ...project,
          tasks: updatedTasks
        };
      }
      return project;
    }));
  };

  // 更新任務狀態
  const toggleTaskStatus = (projectId, taskId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        
        // 重新計算專案進度
        const completedCount = updatedTasks.filter(task => task.completed).length;
        const totalCount = updatedTasks.length;
        const newProgress = totalCount > 0 
          ? Math.round((completedCount / totalCount) * 100) 
          : 0;
        
        return {
          ...project,
          tasks: updatedTasks,
          progress: newProgress
        };
      }
      return project;
    }));
  };

  // 添加筆記
  const addNote = (projectId, noteContent) => {
    const newNote = {
      id: uuidv4(),
      content: noteContent,
      createdAt: new Date().toISOString()
    };

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          notes: [...project.notes, newNote]
        };
      }
      return project;
    }));
  };

  // 添加資源
  const addResource = (projectId, resource) => {
    const newResource = {
      id: uuidv4(),
      ...resource
    };

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          resources: [...project.resources, newResource]
        };
      }
      return project;
    }));
  };

  return (
    <ProjectsContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      toggleTaskStatus,
      addNote,
      addResource
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}; 