import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpacedRepetition from '../components/learning/SpacedRepetition';
import { AiOutlineSync, AiOutlineBulb, AiOutlineLink, AiOutlineProject } from 'react-icons/ai';

const StrategyToolbox = () => {
  const [activeTab, setActiveTab] = useState('spaced');

  // 定義工具箱內的學習工具
  const tools = [
    {
      id: 'spaced',
      name: '間隔重複卡片',
      icon: <AiOutlineSync className="w-6 h-6" />,
      description: '透過科學的記憶間隔來高效記憶和複習重要知識點',
      component: <SpacedRepetition />
    },
    {
      id: 'feynman',
      name: '費曼技巧練習',
      icon: <AiOutlineBulb className="w-6 h-6" />,
      description: '運用「教給他人」的方式來測試和深化對概念的理解',
      component: <div className="bg-yellow-50 p-6 rounded-lg text-center">費曼技巧練習功能尚在開發中</div>
    },
    {
      id: 'mindmap',
      name: '主題地圖連結器',
      icon: <AiOutlineLink className="w-6 h-6" />,
      description: '建立知識點之間的連結，形成整體的知識網絡',
      component: <div className="bg-yellow-50 p-6 rounded-lg text-center">主題地圖連結器功能尚在開發中</div>
    },
    {
      id: 'analogy',
      name: '類比與視覺化筆記',
      icon: <AiOutlineProject className="w-6 h-6" />,
      description: '透過類比和視覺化方式來理解抽象概念',
      component: <div className="bg-yellow-50 p-6 rounded-lg text-center">類比與視覺化筆記功能尚在開發中</div>
    }
  ];

  // 獲取當前活動的工具
  const activeToolComponent = tools.find(tool => tool.id === activeTab)?.component;

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">學習策略工具箱</h1>
        <p className="text-gray-600">選擇適合的學習工具，幫助你更高效地學習和記憶</p>
      </div>

      {/* 工具選擇器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all
              ${activeTab === tool.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center">
              <div className={`
                p-3 rounded-full mr-3
                ${activeTab === tool.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                {tool.icon}
              </div>
              <div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 活動工具顯示 */}
      <div className="mb-8">
        {activeToolComponent}
      </div>

      {/* 相關資源連結 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">相關學習資源</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://ncase.me/remember/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">如何有效記憶？</h3>
            <p className="text-sm text-gray-600 mt-1">交互式指南解釋間隔重複記憶原理</p>
          </a>
          <a 
            href="https://fs.blog/feynman-technique/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">費曼學習技巧</h3>
            <p className="text-sm text-gray-600 mt-1">深入解析費曼學習法和實例應用</p>
          </a>
          <a 
            href="https://apps.ankiweb.net/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium">Anki 間隔重複軟體</h3>
            <p className="text-sm text-gray-600 mt-1">桌面版間隔重複學習工具</p>
          </a>
        </div>
      </div>

      {/* 學習策略提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">學習技巧提示</h2>
        <p className="text-blue-700 mb-4">
          結合多種學習策略能夠顯著提高學習效率。嘗試以下組合：
        </p>
        <ul className="list-disc pl-5 text-blue-700 space-y-2">
          <li>先使用<strong>費曼技巧</strong>確保自己理解了概念，然後創建<strong>間隔重複卡片</strong>鞏固記憶</li>
          <li>為複雜概念建立<strong>主題地圖</strong>，然後應用<strong>類比與視覺化</strong>加深理解</li>
          <li>結合這些工具與你的<Link to="/projects" className="text-blue-600 underline">實踐專案</Link>，提升應用能力</li>
        </ul>
      </div>
    </div>
  );
};

export default StrategyToolbox; 