import type { AdStatus, ReviewStatus } from '../types/event';

interface AdStatusBadgeProps {
  status: AdStatus;
}

export function AdStatusBadge({ status }: AdStatusBadgeProps) {
  const config: Record<AdStatus, { dot: string; text: string; bg: string }> = {
    잔액부족: { dot: 'bg-orange-400', text: 'text-orange-600', bg: 'bg-orange-50' },
    라이브: { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
    기간종료: { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
    대기: { dot: '', text: 'text-gray-600', bg: 'bg-white' },
    중지: { dot: 'bg-red-400', text: 'text-red-600', bg: 'bg-red-50' },
  };

  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium ${c.text} ${c.bg}`}>
      {status !== '대기' && (
        <span className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
      )}
      {status}
    </span>
  );
}

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
  rejectionReason?: string;
}

export function ReviewStatusBadge({ status, rejectionReason }: ReviewStatusBadgeProps) {
  const config: Record<ReviewStatus, { dot: string; text: string }> = {
    승인: { dot: 'bg-green-500', text: 'text-green-700' },
    반려: { dot: 'bg-red-500', text: 'text-red-600' },
    검수중: { dot: 'bg-yellow-500', text: 'text-gray-600' },
  };

  const c = config[status];

  return (
    <div className="flex flex-col gap-0.5">
      <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.text}`}>
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        {status}
      </span>
      {status === '반려' && rejectionReason && (
        <span className="text-red-500 text-xs">{rejectionReason}</span>
      )}
    </div>
  );
}
