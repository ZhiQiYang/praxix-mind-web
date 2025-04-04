import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 如果您想開始測量應用程序的性能，請傳遞一個函數
// 來記錄結果（例如：reportWebVitals(console.log)）
// 或發送到分析端點。了解更多：https://bit.ly/CRA-vitals
reportWebVitals(); 