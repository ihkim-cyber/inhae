import { useState } from 'react';

interface AdFiltersProps {
  onSearch: (filters: FilterValues) => void;
}

export interface FilterValues {
  adType: string;
  adStatus: string;
  category: string;
  language: string;
  searchText: string;
}

export function AdFilters({ onSearch }: AdFiltersProps) {
  const [adStatus, setAdStatus] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch({
      adType: '',
      adStatus,
      category,
      language,
      searchText,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-4">
      <select
        value={adStatus}
        onChange={(e) => setAdStatus(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">광고 상태</option>
        <option value="라이브">라이브</option>
        <option value="대기">대기</option>
        <option value="중지">중지</option>
        <option value="잔액부족">잔액부족</option>
        <option value="기간종료">기간종료</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">카테고리</option>
        <option value="피부">피부</option>
        <option value="눈">눈</option>
        <option value="얼굴">얼굴</option>
      </select>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">언어</option>
        <option value="한국어">한국어</option>
        <option value="일본어">일본어</option>
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="EID, 이벤트명"
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        검색
      </button>
    </div>
  );
}
