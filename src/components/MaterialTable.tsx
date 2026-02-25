import { Copy } from 'lucide-react';
import { AdStatusBadge } from './StatusBadge';
import { ReviewStatusBadge } from './StatusBadge';
import type { MaterialEvent } from '../types/event';

interface MaterialTableProps {
  events: MaterialEvent[];
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function EventThumbnail({ name, region }: { name: string; region?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
        {name.slice(0, 2)}
      </div>
      <div className="min-w-0">
        {region && (
          <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded mr-1">
            {region}
          </span>
        )}
        <p className="text-sm text-gray-800 line-clamp-2">{name}</p>
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
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              광고 상태
              <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">검수 상태</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">EID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">카테고리</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">이벤트</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">가격</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">신청 수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              후기 한국어 후기 연결
              <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">외부 노출</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">히스토리</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">복제</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">수정</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">
                <AdStatusBadge status={event.adStatus} />
              </td>
              <td className="px-4 py-3">
                <ReviewStatusBadge
                  status={event.reviewStatus}
                  rejectionReason={event.rejectionReason}
                />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.eid}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.category}</td>
              <td className="px-4 py-3">
                <EventThumbnail name={event.eventName} region={event.region} />
              </td>
              <td className="px-4 py-3">
                <div className="text-sm">
                  {event.priceType && (
                    <span className="text-gray-500 text-xs block">{event.priceType}</span>
                  )}
                  <span>{event.price}</span>
                  {event.discount && (
                    <span className="text-primary-600 ml-1">{event.discount}%</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{event.applicationCount}건</span>
                  <button className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">
                    성과
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {event.rating} ({event.reviewCount})
                  </span>
                  <button
                    className={`text-xs px-2 py-1 rounded ${
                      event.hasReviewConnection === false
                        ? 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {event.hasReviewConnection ? '후기 관리' : '후기 연결'}
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <button className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">
                  설정
                </button>
              </td>
              <td className="px-4 py-3">
                <button className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200">
                  내역
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onDuplicate(event.id)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                  title="복제"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(event.id)}
                  className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
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
