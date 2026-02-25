import { useState } from 'react';
import { DollarSign, User, Info } from 'lucide-react';

export function Header() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-800">999,999,999,000원</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            충전
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <Info className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-full mt-1 z-50 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                성형 CPV 전환 및 굿닥 연동 종료 안내
              </div>
            )}
          </div>
          <button className="px-5 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
            이벤트 등록
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-medium text-gray-700">marketer_01</span>
          </div>
        </div>
      </div>
    </header>
  );
}
