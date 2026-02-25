import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { AdTable } from '../components/AdTable';
import { MaterialTable } from '../components/MaterialTable';
import { Pagination } from '../components/Pagination';
import { mockAdEvents, mockMaterialEvents } from '../data/mockData';
import type { AdEvent, MaterialEvent } from '../types/event';

type TabType = 'ad' | 'material';

export function EventManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('ad');
  const [adEvents, setAdEvents] = useState<AdEvent[]>(mockAdEvents);
  const [materialEvents] = useState<MaterialEvent[]>(mockMaterialEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [adStatusFilter, setAdStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [adTypeFilter, setAdTypeFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');

  const categories = ['피부', '눈', '얼굴', '코'];
  const adStatuses = ['전체', '잔액부족', '라이브', '기간종료', '대기', '중지'];
  const languages = ['전체', '한국어', '일본어'];

  const filteredAdEvents = useMemo(() => {
    return adEvents.filter((event) => {
      const matchesSearch =
        !searchQuery ||
        event.eid.includes(searchQuery) ||
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAdStatus = !adStatusFilter || event.adStatus === adStatusFilter;
      const matchesCategory = !categoryFilter || event.category === categoryFilter;
      return matchesSearch && matchesAdStatus && matchesCategory;
    });
  }, [adEvents, searchQuery, adStatusFilter, categoryFilter]);

  const filteredMaterialEvents = useMemo(() => {
    return materialEvents.filter((event) => {
      const matchesSearch =
        !searchQuery ||
        event.eid.includes(searchQuery) ||
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAdStatus = !adStatusFilter || event.adStatus === adStatusFilter;
      const matchesCategory = !categoryFilter || event.category === categoryFilter;
      return matchesSearch && matchesAdStatus && matchesCategory;
    });
  }, [materialEvents, searchQuery, adStatusFilter, categoryFilter]);

  const currentEvents =
    activeTab === 'ad' ? filteredAdEvents : filteredMaterialEvents;
  const totalPages = Math.ceil(currentEvents.length / pageSize) || 1;
  const paginatedEvents = currentEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleExposureToggle = (id: string, checked: boolean) => {
    setAdEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, adExposure: checked } : e))
    );
  };

  const handleBidSettingsToggle = (id: string, checked: boolean) => {
    setAdEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, bidSettings: checked } : e))
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit', id);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate', id);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">이벤트 관리</h1>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('ad')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === 'ad'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              광고
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === 'material'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              소재
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex flex-wrap gap-3 items-center">
            {activeTab === 'ad' && (
              <select
                value={adTypeFilter}
                onChange={(e) => setAdTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[120px] bg-white"
              >
                <option value="">광고 유형</option>
                <option value="cpc">CPC</option>
                <option value="cpm">CPM</option>
              </select>
            )}
            <select
              value={adStatusFilter}
              onChange={(e) => setAdStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[120px] bg-white"
            >
              <option value="">광고 상태</option>
              {adStatuses.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[120px] bg-white"
            >
              <option value="">카테고리</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {activeTab === 'material' && (
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[120px] bg-white"
              >
                <option value="">언어</option>
                {languages.slice(1).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            )}
            <input
              type="text"
              placeholder="EID, 이벤트명"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[200px]"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              검색
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {activeTab === 'ad' ? (
            <AdTable
              events={paginatedEvents as AdEvent[]}
              onExposureToggle={handleExposureToggle}
              onBidSettingsToggle={handleBidSettingsToggle}
              onEdit={handleEdit}
            />
          ) : (
            <MaterialTable
              events={paginatedEvents as MaterialEvent[]}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            totalItems={currentEvents.length}
          />
        </div>
      </main>
    </div>
  );
}
