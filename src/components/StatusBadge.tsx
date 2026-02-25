import { Info, Circle } from 'lucide-react';
import type { AdStatus, ReviewStatus } from '../types/event';

const adStatusStyles: Record<AdStatus, string> = {
  잔액부족: 'bg-red-100 text-red-700',
  라이브: 'bg-green-100 text-green-700',
  기간종료: 'bg-gray-100 text-gray-700',
  대기: 'bg-white text-gray-700 border border-gray-300',
  중지: 'bg-red-100 text-red-700',
};

const reviewStatusStyles: Record<ReviewStatus, string> = {
  승인: 'text-green-600',
  반려: 'text-red-600',
  검수중: 'text-gray-600',
};

interface AdStatusBadgeProps {
  status: AdStatus;
  showIcon?: boolean;
}

export function AdStatusBadge({ status, showIcon = true }: AdStatusBadgeProps) {
  const isLive = status === '라이브';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${adStatusStyles[status]}`}
    >
      {showIcon && isLive && <Circle className="w-2.5 h-2.5 fill-current" />}
      {showIcon && !isLive && status !== '대기' && <Info className="w-3.5 h-3.5" />}
      {status}
    </span>
  );
}

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
  rejectionReason?: string;
}

export function ReviewStatusBadge({ status, rejectionReason }: ReviewStatusBadgeProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${reviewStatusStyles[status]}`}>
        <span className={`w-2 h-2 rounded-full ${
          status === '승인' ? 'bg-green-500' :
          status === '반려' ? 'bg-red-500' : 'bg-gray-400'
        }`} />
        {status}
      </span>
      {status === '반려' && rejectionReason && (
        <button className="text-blue-600 text-xs text-left hover:underline">반려사유</button>
      )}
    </div>
  );
}
