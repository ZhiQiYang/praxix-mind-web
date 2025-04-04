import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // 模擬密碼重置請求
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError('發送重置密碼請求時發生錯誤');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">重置密碼說明已發送</h3>
        <p className="mt-2 text-sm text-gray-600">
          我們已向 {email} 發送了重置密碼的說明。請檢查您的電子郵件。
        </p>
        <div className="mt-6">
          <Link to="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            返回登錄頁面
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">忘記密碼?</h3>
        <p className="mt-2 text-sm text-gray-600">
          請輸入您的電子郵件地址，我們將發送重置密碼的說明。
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            電子郵件
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? '發送中...' : '發送重置說明'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link to="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          返回登錄頁面
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword; 