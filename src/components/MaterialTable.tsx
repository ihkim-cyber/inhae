import { Copy } from 'lucide-react';
import { AdStatusBadge, ReviewStatusBadge } from './StatusBadge';
import type { MaterialEvent } from '../types/event';

interface MaterialTableProps {
  events: MaterialEvent[];
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function EventThumbnail({
  name,
  thumbnail,
  region,
  brandLabel,
}: {
  name: string;
  thumbnail?: string;
  region?: string;
  brandLabel?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[52px] h-[64px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            {name.slice(0, 2)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {brandLabel && (
            <span className="inline-block px-1.5 py-0.5 bg-primary-100 text-primary-700 text-[10px] rounded font-medium">
              {brandLabel}
            </span>
          )}
          {region && (
            <span className="inline-flex items-center gap-0.5 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-red-600 font-medium">{region}</span>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700 line-clamp-2 leading-snug">{name}</p>
      </div>
    </div>
  );
}

export function MaterialTable({
  events,
  onEdit,
  onDuplicate,
}: MaterialTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1200px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
              광고 상태 <span className="text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">검수 상태</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">EID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">카테고리</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">이벤트</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">가격</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">신청 수</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
              후기 <span className="text-gray-400">한국어 후기 연결</span> <span className="text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">외부 노출</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">히스토리</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">복제</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500">수정</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50/50">
              <td className="px-4 py-4">
                <AdStatusBadge status={event.adStatus} />
              </td>
              <td className="px-4 py-4">
                <ReviewStatusBadge
                  status={event.reviewStatus}
                  rejectionReason={event.rejectionReason}
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">{event.eid}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{event.category}</td>
              <td className="px-4 py-4">
                <EventThumbnail
                  name={event.eventName}
                  thumbnail={event.thumbnail}
                  region={event.region}
                  brandLabel={event.brandLabel}
                />
              </td>
              <td className="px-4 py-4">
                <div className="text-sm">
                  {event.priceType && (
                    <span className="text-gray-500 text-xs block">{event.priceType}</span>
                  )}
                  <span className="font-medium">{event.price}</span>
                  {event.discount && (
                    <span className="text-primary-600 ml-1.5 font-medium">{event.discount}%</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">{event.applicationCount}건</span>
                  {event.resultType && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {event.resultType}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col items-start gap-1.5">
                  <span className="text-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{event.rating}</span>
                    <span className="text-gray-500">({event.reviewCount})</span>
                  </span>
                  <button
                    className={`text-xs px-2.5 py-1 rounded font-medium ${
                      event.hasReviewConnection
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {event.hasReviewConnection ? '후기 관리' : '후기 연결'}
                  </button>
                </div>
              </td>
              <td className="px-4 py-4">
                <button className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 font-medium">
                  설정
                </button>
              </td>
              <td className="px-4 py-4">
                <button className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 font-medium">
                  내역
                </button>
              </td>
              <td className="px-4 py-4 text-center">
                <button
                  onClick={() => onDuplicate(event.id)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded"
                  title="복제"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </td>
              <td className="px-4 py-4 text-center">
                <button
                  onClick={() => onEdit(event.id)}
                  className="px-4 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-500 font-medium"
                >
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
