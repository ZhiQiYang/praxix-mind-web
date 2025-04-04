import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// 創建Context
export const ProjectsContext = createContext();

// 模擬資料
const initialProjects = [
  {
    id: 'p1',
    title: '個人學習助手 Bot',
    description: '使用 Python 和 OpenAI API 創建的學習助手',
    goalId: '1', // 關聯到 Python & AI 學習目標
    progress: 65,
    status: 'active',
    startDate: '2023-10-10',
    targetDate: '2023-12-20',
    tags: ['Python', 'AI', 'Bot'],
    steps: [
      { id: 'step1', title: '定義功能需求', completed: true },
      { id: 'step2', title: '設計系統架構', completed: true },
      { id: 'step3', title: '實現核心 API 整合', completed: true },
      { id: 'step4', title: '添加學習追蹤功能', completed: false },
      { id: 'step5', title: '部署和測試', completed: false },
    ],
    resources: [
      { id: 'res1', title: 'OpenAI API 文檔', url: 'https://platform.openai.com/docs/api-reference' },
      { id: 'res2', title: 'Flask-RESTful', url: 'https://flask-restful.readthedocs.io/en/latest/' },
    ]
  },
  {
    id: 'p2',
    title: '統計學習研究',
    description: '應用統計學理論分析教育數據，找出學習效果的關鍵因素',
    goalId: '2', // 關聯到統計學學習目標
    progress: 40,
    status: 'active',
    startDate: '2023-11-05',
    targetDate: '2024-01-15',
    tags: ['統計', 'R語言', '數據分析'],
    steps: [
      { id: 'step6', title: '收集教育數據集', completed: true },
      { id: 'step7', title: '數據清洗與預處理', completed: true },
      { id: 'step8', title: '探索性數據分析', completed: false },
      { id: 'step9', title: '建立統計模型', completed: false },
      { id: 'step10', title: '撰寫研究報告', completed: false },
    ],
    resources: [
      { id: 'res3', title: 'R語言教程', url: 'https://r4ds.had.co.nz/' },
      { id: 'res4', title: '教育統計數據集', url: 'https://www.kaggle.com/datasets/topic/education' },
    ]
  },
  {
    id: 'p3',
    title: '生理學視覺化工具',
    description: '開發交互式生理系統視覺化工具，幫助理解人體結構',
    goalId: '3', // 關聯到生理學學習目標
    progress: 25,
    status: 'planning',
    startDate: '2023-12-01',
    targetDate: '2024-03-30',
    tags: ['生理學', '視覺化', 'Web開發'],
    steps: [
      { id: 'step11', title: '收集視覺化資源', completed: true },
      { id: 'step12', title: '設計界面原型', completed: false },
      { id: 'step13', title: '建立基礎模型', completed: false },
      { id: 'step14', title: '添加交互功能', completed: false },
      { id: 'step15', title: '整合學習資源', completed: false },
    ],
    resources: [
      { id: 'res5', title: '人體3D模型庫', url: 'https://www.turbosquid.com/Search/3D-Models/human-anatomy' },
      { id: 'res6', title: 'D3.js 視覺化', url: 'https://d3js.org/' },
    ]
  }
];

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    // 嘗試從本地存儲中獲取項目資料
    const localData = localStorage.getItem('praxisMindProjects');
    return localData ? JSON.parse(localData) : initialProjects;
  });

  // 當項目資料變化時，保存到本地存儲
  useEffect(() => {
    localStorage.setItem('praxisMindProjects', JSON.stringify(projects));
  }, [projects]);

  // 添加新項目
  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: uuidv4(),
      progress: 0,
      steps: [],
      resources: []
    };
    setProjects([...projects, projectWithId]);
  };

  // 更新項目
  const updateProject = (updatedProject) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
  };

  // 刪除項目
  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  // 添加項目步驟
  const addProjectStep = (projectId, stepTitle) => {
    const newStep = {
      id: uuidv4(),
      title: stepTitle,
      completed: false
    };

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          steps: [...project.steps, newStep]
        };
      }
      return project;
    }));
  };

  // 更新項目步驟狀態
  const toggleStepStatus = (projectId, stepId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedSteps = project.steps.map(step => 
          step.id === stepId ? { ...step, completed: !step.completed } : step
        );
        
        // 重新計算項目進度
        const completedCount = updatedSteps.filter(step => step.completed).length;
        const totalCount = updatedSteps.length;
        const newProgress = totalCount > 0 
          ? Math.round((completedCount / totalCount) * 100) 
          : 0;
        
        return {
          ...project,
          steps: updatedSteps,
          progress: newProgress
        };
      }
      return project;
    }));
  };

  // 添加項目資源
  const addProjectResource = (projectId, resource) => {
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
      addProjectStep,
      toggleStepStatus,
      addProjectResource
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}; 