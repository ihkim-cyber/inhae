import { useState } from 'react';

export function Header() {
  const [balance] = useState(999999999000);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR') + '원';
  };

  const handleCharge = () => {
    alert('충전 기능: 결제 페이지로 이동합니다.');
  };

  const handleEventRegistration = () => {
    alert('이벤트 등록: 새 이벤트 등록 페이지로 이동합니다.');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {formatPrice(balance)}
          </span>
          <button
            onClick={handleCharge}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            충전
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">M</span>
            </div>
            <span className="font-medium">marketer_01</span>
          </div>
          <button
            onClick={handleEventRegistration}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            이벤트 등록
          </button>
        </div>
      </div>
    </header>
  );
}
