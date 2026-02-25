import type { AdStatus, ReviewStatus } from '../types';

const statusColors: Record<AdStatus, string> = {
  '라이브': 'bg-green-100 text-green-800',
  '대기': 'bg-gray-100 text-gray-700',
  '중지': 'bg-red-100 text-red-700',
  '잔액부족': 'bg-red-100 text-red-700',
  '기간종료': 'bg-gray-100 text-gray-600',
};

const reviewColors: Record<ReviewStatus, string> = {
  '승인': 'text-green-600',
  '반려': 'text-red-600',
  '검수중': 'text-gray-500',
};

interface AdStatusBadgeProps {
  status: AdStatus;
}

export function AdStatusBadge({ status }: AdStatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
  rejectionReason?: string;
  onRejectionClick?: () => void;
}

export function ReviewStatusBadge({
  status,
  rejectionReason,
  onRejectionClick,
}: ReviewStatusBadgeProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`text-xs font-medium ${reviewColors[status]}`}>
        {status === '승인' && <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 align-middle" />}
        {status === '반려' && <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1 align-middle" />}
        {status === '검수중' && <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-1 align-middle" />}
        {status}
      </span>
      {status === '반려' && rejectionReason && (
        <button
          onClick={onRejectionClick}
          className="text-xs text-blue-600 hover:underline text-left"
        >
          반려사유
        </button>
      )}
    </div>
  );
}
