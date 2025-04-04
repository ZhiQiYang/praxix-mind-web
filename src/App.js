import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import StrategyToolbox from './pages/StrategyToolbox';
import ProjectHub from './pages/ProjectHub';
import EfficiencyBooster from './pages/EfficiencyBooster';
import MetaLog from './pages/MetaLog';
import ScheduleHub from './pages/ScheduleHub';
import Analytics from './pages/Analytics';

// Context
import { UserProvider } from './context/UserContext';
import { GoalsProvider } from './context/GoalsContext';
import { ProjectsProvider } from './context/ProjectsContext';

function App() {
  return (
    <UserProvider>
      <GoalsProvider>
        <ProjectsProvider>
          <Router>
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/toolbox" element={<StrategyToolbox />} />
                    <Route path="/projects" element={<ProjectHub />} />
                    <Route path="/efficiency" element={<EfficiencyBooster />} />
                    <Route path="/metalog" element={<MetaLog />} />
                    <Route path="/schedule" element={<ScheduleHub />} />
                    <Route path="/analytics" element={<Analytics />} />
                  </Routes>
                </main>
              </div>
            </div>
          </Router>
        </ProjectsProvider>
      </GoalsProvider>
    </UserProvider>
  );
}

export default App; 