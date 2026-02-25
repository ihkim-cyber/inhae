import { useState } from 'react';
import { Header } from './components/Header';
import { AdFilters, type FilterValues } from './components/AdFilters';
import { AdTable } from './components/AdTable';
import { mockAds } from './data/mockAds';

function App() {
  const [activeTab, setActiveTab] = useState<'광고' | '소재'>('광고');
  const [filters, setFilters] = useState<FilterValues>({
    adType: '',
    adStatus: '',
    category: '',
    language: '',
    searchText: '',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">이벤트 관리</h1>

        <div className="flex gap-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('광고')}
            className={`px-4 py-2 font-medium border-b-2 -mb-px transition-colors ${
              activeTab === '광고'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            광고
          </button>
          <button
            onClick={() => setActiveTab('소재')}
            className={`px-4 py-2 font-medium border-b-2 -mb-px transition-colors ${
              activeTab === '소재'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            소재
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <AdFilters onSearch={setFilters} />
          {activeTab === '광고' ? (
            <AdTable ads={mockAds} filters={filters} />
          ) : (
            <div className="py-12 text-center text-gray-500">
              소재 관리 화면은 추후 구현 예정입니다.
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            성형 CPV 전환 및 굿닥 연동 종료 안내
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
