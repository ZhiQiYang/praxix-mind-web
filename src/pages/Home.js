import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { AiOutlineRocket, AiOutlineBulb, AiOutlineBarChart, AiOutlineTool } from 'react-icons/ai';
import PublicNavbar from '../components/layout/PublicNavbar';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  // 如果用戶已登錄，重定向到應用頁面
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  // 添加調試日誌
  useEffect(() => {
    console.log('Home組件已加載');
    return () => console.log('Home組件已卸載');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <PublicNavbar />
      <main className="flex-grow">
        {/* 頂部英雄區 */}
        <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="absolute inset-0">
            <div className="h-1/3 bg-white sm:h-2/3"></div>
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Praxis Mind</span>
                <span className="block text-blue-600">高效學習與個人成長平台</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                將您的學習轉化為持久的知識和技能。我們的平台幫助您有效學習、系統思考，並在實踐中不斷成長。
              </p>
              <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/auth/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                  >
                    開始使用
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/auth/login"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg"
                  >
                    登錄
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特點展示 */}
        <div id="features" className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
                核心特點
              </h2>
              <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                更聰明的學習方式
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                我們的平台結合了認知科學和現代技術，幫助您以最有效的方式學習和成長。
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                      <AiOutlineTool className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      智能學習工具
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    間隔重複、思維導圖、概念關聯和主動回憶等科學學習方法，幫助您更有效地吸收和保留知識。
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                      <AiOutlineBulb className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      元認知日誌
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    記錄您的學習過程、困難和突破，培養元認知能力，深入理解自己的學習方式和習慣。
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                      <AiOutlineRocket className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      效率加速器
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    專注計時器、目標追蹤和學習儀式，幫助您克服拖延症，建立穩定的學習習慣。
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
                      <AiOutlineBarChart className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      學習分析
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    可視化您的學習模式和進度，找出最佳學習時間和方法，不斷優化學習策略。
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 使用方式 */}
        <div id="how-it-works" className="bg-gray-50 py-16 lg:py-24">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  三步開始高效學習
                </h2>
              </div>
              <dl className="mt-10 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:space-y-0 lg:col-span-2 lg:mt-0">
                <div>
                  <dt>
                    <p className="text-2xl font-extrabold text-blue-600">01</p>
                    <p className="mt-2 text-lg font-medium leading-6 text-gray-900">
                      設定明確目標
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    在儀表板上設定您的學習目標和專案，為您的學習之旅制定清晰的路線圖。
                  </dd>
                </div>

                <div>
                  <dt>
                    <p className="text-2xl font-extrabold text-blue-600">02</p>
                    <p className="mt-2 text-lg font-medium leading-6 text-gray-900">
                      使用學習工具
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    利用我們的學習工具箱，應用間隔重複、思維導圖等科學方法進行高效學習。
                  </dd>
                </div>

                <div>
                  <dt>
                    <p className="text-2xl font-extrabold text-blue-600">03</p>
                    <p className="mt-2 text-lg font-medium leading-6 text-gray-900">
                      反思與調整
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    通過元認知日誌和學習分析，反思您的學習過程並不斷調整學習策略。
                  </dd>
                </div>

                <div>
                  <dt>
                    <p className="text-2xl font-extrabold text-blue-600">04</p>
                    <p className="mt-2 text-lg font-medium leading-6 text-gray-900">
                      持續實踐
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    將所學知識應用到實際項目中，通過實踐鞏固和深化理解。
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 行動呼籲 */}
        <div className="bg-blue-700">
          <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">準備好提升您的學習效率了嗎？</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-200">
              現在註冊，開始您的高效學習之旅。
            </p>
            <Link
              to="/auth/register"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 sm:w-auto"
            >
              免費註冊
            </Link>
          </div>
        </div>

        {/* 頁腳 */}
        <footer className="bg-white">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <button className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">關於我們</span>
                <span className="hover:text-gray-900">關於我們</span>
              </button>
              <button className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">聯繫我們</span>
                <span className="hover:text-gray-900">聯繫我們</span>
              </button>
              <button className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">隱私政策</span>
                <span className="hover:text-gray-900">隱私政策</span>
              </button>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-base text-gray-400">
                &copy; 2023 Praxis Mind. 保留所有權利。
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home; 