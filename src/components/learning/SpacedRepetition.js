import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// SM-2 間隔重複演算法
const calculateNextReview = (card, rating) => {
  // 初始值
  let { easeFactor, interval, repetitions } = card;
  
  if (!easeFactor) easeFactor = 2.5;
  if (!interval) interval = 0;
  if (!repetitions) repetitions = 0;
  
  // 根據評分調整
  if (rating < 3) {
    // 如果回想困難，重置
    repetitions = 0;
    interval = 1;
  } else {
    // 增加重複次數
    repetitions += 1;
    
    // 計算下一個間隔
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    // 更新難易度因子 (0.8 - 0.3)
    easeFactor += (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    
    // 約束難易度因子
    if (easeFactor < 1.3) easeFactor = 1.3;
  }
  
  // 計算下一個複習日期
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  
  return {
    easeFactor,
    interval,
    repetitions,
    nextReviewDate
  };
};

const SpacedRepetition = () => {
  // 所有卡片
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('spacedRepetitionCards');
    return savedCards 
      ? JSON.parse(savedCards) 
      : [
          // 示例卡片
          {
            id: '1',
            front: '類神經網路中的激勵函數有哪些？',
            back: '常見的激勵函數包括：\n1. Sigmoid\n2. Tanh\n3. ReLU\n4. Leaky ReLU\n5. Softmax',
            tags: ['AI', 'Python', '深度學習'],
            createdAt: new Date().toISOString(),
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReviewDate: new Date().toISOString()
          },
          {
            id: '2',
            front: 'Flask 中如何定義路由？',
            back: '使用裝飾器 @app.route()\n\n```python\n@app.route(\'/hello\')\ndef hello_world():\n    return \'Hello, World!\'\n```',
            tags: ['Python', 'Flask', 'Web開發'],
            createdAt: new Date().toISOString(),
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReviewDate: new Date().toISOString()
          }
        ];
  });
  
  // 當前學習會話
  const [studySession, setStudySession] = useState({
    isActive: false,
    currentIndex: 0,
    showAnswer: false,
    cardsToReview: []
  });
  
  // 表單狀態
  const [newCard, setNewCard] = useState({
    front: '',
    back: '',
    tags: ''
  });
  
  // 過濾器
  const [filter, setFilter] = useState({
    searchTerm: '',
    selectedTags: [],
    showAll: false
  });

  // 當卡片變更時保存到 localStorage
  useEffect(() => {
    localStorage.setItem('spacedRepetitionCards', JSON.stringify(cards));
  }, [cards]);
  
  // 獲取今天需要複習的卡片
  const getTodayCards = () => {
    const today = new Date();
    return cards.filter(card => {
      const reviewDate = new Date(card.nextReviewDate);
      return reviewDate <= today;
    });
  };
  
  // 篩選卡片
  const getFilteredCards = () => {
    return cards.filter(card => {
      // 搜尋詞篩選
      const matchesSearch = 
        card.front.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
        card.back.toLowerCase().includes(filter.searchTerm.toLowerCase());
      
      // 標籤篩選
      const matchesTags = 
        filter.selectedTags.length === 0 ||
        filter.selectedTags.every(tag => card.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  };
  
  // 開始學習會話
  const startStudySession = () => {
    const cardsToReview = filter.showAll ? getFilteredCards() : getTodayCards();
    if (cardsToReview.length === 0) return;
    
    // 洗牌算法
    const shuffled = [...cardsToReview].sort(() => Math.random() - 0.5);
    
    setStudySession({
      isActive: true,
      currentIndex: 0,
      showAnswer: false,
      cardsToReview: shuffled
    });
  };
  
  // 顯示答案
  const showAnswer = () => {
    setStudySession({
      ...studySession,
      showAnswer: true
    });
  };
  
  // 評分並繼續
  const rateCard = (rating) => {
    const { cardsToReview, currentIndex } = studySession;
    const currentCard = cardsToReview[currentIndex];
    
    // 計算下一個複習日期
    const { easeFactor, interval, repetitions, nextReviewDate } = 
      calculateNextReview(currentCard, rating);
    
    // 更新卡片
    const updatedCards = cards.map(card => 
      card.id === currentCard.id 
        ? { 
            ...card, 
            easeFactor, 
            interval, 
            repetitions, 
            nextReviewDate: nextReviewDate.toISOString() 
          } 
        : card
    );
    
    setCards(updatedCards);
    
    // 繼續下一張卡片或結束會話
    if (currentIndex < cardsToReview.length - 1) {
      setStudySession({
        ...studySession,
        currentIndex: currentIndex + 1,
        showAnswer: false
      });
    } else {
      // 結束會話
      setStudySession({
        isActive: false,
        currentIndex: 0,
        showAnswer: false,
        cardsToReview: []
      });
    }
  };
  
  // 添加新卡片
  const addCard = (e) => {
    e.preventDefault();
    
    // 分割標籤
    const tagArray = newCard.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    const card = {
      id: uuidv4(),
      front: newCard.front,
      back: newCard.back,
      tags: tagArray,
      createdAt: new Date().toISOString(),
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReviewDate: new Date().toISOString()
    };
    
    setCards([...cards, card]);
    
    // 重置表單
    setNewCard({
      front: '',
      back: '',
      tags: ''
    });
  };
  
  // 獲取所有唯一標籤
  const getAllTags = () => {
    const tagSet = new Set();
    cards.forEach(card => {
      card.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };
  
  // 切換標籤篩選
  const toggleTagFilter = (tag) => {
    const isSelected = filter.selectedTags.includes(tag);
    if (isSelected) {
      setFilter({
        ...filter,
        selectedTags: filter.selectedTags.filter(t => t !== tag)
      });
    } else {
      setFilter({
        ...filter,
        selectedTags: [...filter.selectedTags, tag]
      });
    }
  };
  
  // 當前學習中的卡片
  const currentCard = studySession.isActive 
    ? studySession.cardsToReview[studySession.currentIndex] 
    : null;
  
  const todayCardsCount = getTodayCards().length;
  const allTags = getAllTags();
  const filteredCards = getFilteredCards();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">間隔重複學習卡片</h2>
      
      {/* 學習會話 */}
      {studySession.isActive ? (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>卡片 {studySession.currentIndex + 1} / {studySession.cardsToReview.length}</span>
          </div>
          
          <div className="border rounded-lg overflow-hidden mb-4">
            {/* 問題面 */}
            <div className="p-6 bg-blue-50">
              <h3 className="text-xl font-medium mb-4">{currentCard.front}</h3>
              
              {!studySession.showAnswer && (
                <button
                  onClick={showAnswer}
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  顯示答案
                </button>
              )}
            </div>
            
            {/* 答案面 */}
            {studySession.showAnswer && (
              <div className="p-6 border-t">
                <div className="prose max-w-none mb-6">
                  {currentCard.back.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {currentCard.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  如何評價您對這張卡片的回憶程度？
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  <button
                    onClick={() => rateCard(1)}
                    className="py-2 px-4 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                  >
                    1 - 完全忘記
                  </button>
                  <button
                    onClick={() => rateCard(2)}
                    className="py-2 px-4 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                  >
                    2 - 勉強記得
                  </button>
                  <button
                    onClick={() => rateCard(3)}
                    className="py-2 px-4 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
                  >
                    3 - 有困難
                  </button>
                  <button
                    onClick={() => rateCard(4)}
                    className="py-2 px-4 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                  >
                    4 - 比較順利
                  </button>
                  <button
                    onClick={() => rateCard(5)}
                    className="py-2 px-4 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200"
                  >
                    5 - 非常簡單
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-6">
          {/* 學習統計 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">學習統計</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-center p-3 bg-white rounded shadow-sm">
                <p className="text-2xl font-bold text-blue-600">{todayCardsCount}</p>
                <p className="text-xs text-gray-600">今日待複習</p>
              </div>
              <div className="text-center p-3 bg-white rounded shadow-sm">
                <p className="text-2xl font-bold text-green-600">{cards.filter(c => c.repetitions > 0).length}</p>
                <p className="text-xs text-gray-600">已學習</p>
              </div>
              <div className="text-center p-3 bg-white rounded shadow-sm">
                <p className="text-2xl font-bold text-purple-600">{cards.length}</p>
                <p className="text-xs text-gray-600">總卡片數</p>
              </div>
              <div className="text-center p-3 bg-white rounded shadow-sm">
                <p className="text-2xl font-bold text-orange-600">{allTags.length}</p>
                <p className="text-xs text-gray-600">主題標籤</p>
              </div>
            </div>
          </div>

          {/* 開始學習按鈕 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setFilter({ ...filter, showAll: false });
                startStudySession();
              }}
              className={`flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 ${
                todayCardsCount === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={todayCardsCount === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              開始今日複習 ({todayCardsCount})
            </button>
            
            <button
              onClick={() => {
                setFilter({ ...filter, showAll: true });
                startStudySession();
              }}
              className="py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              瀏覽所有卡片
            </button>
          </div>
          
          {/* 標籤過濾器 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">依標籤篩選</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTagFilter(tag)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter.selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* 搜尋框 */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋卡片..."
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter.searchTerm}
                onChange={(e) => setFilter({ ...filter, searchTerm: e.target.value })}
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
          
          {/* 卡片列表 */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">卡片庫 ({filteredCards.length})</h3>
            {filteredCards.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {filteredCards.map(card => {
                  const nextReview = new Date(card.nextReviewDate);
                  const isToday = nextReview <= new Date();
                  
                  return (
                    <div
                      key={card.id}
                      className={`border rounded-lg p-4 hover:shadow-sm ${
                        isToday ? 'border-blue-300 bg-blue-50' : ''
                      }`}
                    >
                      <h4 className="font-medium mb-1 line-clamp-1">{card.front}</h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {card.tags.map(tag => (
                          <span
                            key={`${card.id}-${tag}`}
                            className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>複習次數: {card.repetitions}</span>
                        <span>
                          下次複習: {format(nextReview, 'MM/dd')}
                          {isToday && (
                            <span className="ml-1 text-blue-600 font-medium">
                              今天
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                無符合條件的卡片
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 新增卡片表單 */}
      {!studySession.isActive && (
        <div className="border-t pt-6">
          <h3 className="font-bold mb-4">新增卡片</h3>
          <form onSubmit={addCard}>
            <div className="mb-4">
              <label htmlFor="front" className="block text-sm font-medium text-gray-700 mb-1">
                問題面
              </label>
              <textarea
                id="front"
                rows="2"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="輸入問題或概念..."
                value={newCard.front}
                onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
                答案面
              </label>
              <textarea
                id="back"
                rows="4"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="輸入答案、解釋或圖表..."
                value={newCard.back}
                onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                標籤 (以逗號分隔)
              </label>
              <input
                id="tags"
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例如: Python, Flask, API"
                value={newCard.tags}
                onChange={(e) => setNewCard({ ...newCard, tags: e.target.value })}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              新增卡片
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpacedRepetition; 