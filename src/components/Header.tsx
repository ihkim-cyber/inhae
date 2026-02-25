import { useState } from 'react';
import { User, Info } from 'lucide-react';

export function Header() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
            <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs font-bold text-gray-600">$</span>
            <span className="font-semibold text-gray-800">999,999,999,000원</span>
          </div>
          <button className="px-5 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-500 transition-colors text-sm">
            충전
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg relative"
            >
              <Info className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-full mt-1 z-50 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg">
                설명 CPV 전환 및 굿닥 연동 종료 안내
              </div>
            )}
          </div>
          <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
            이벤트 등록
          </button>
          <div className="flex items-center gap-2.5 pl-4 border-l border-gray-200">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <span className="font-medium text-gray-700 text-sm">marketer_01</span>
          </div>
        </div>
      </div>
    </header>
  );
}
