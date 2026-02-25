import { AdStatusBadge } from './StatusBadge';
import { ToggleSwitch } from './ToggleSwitch';
import type { AdEvent } from '../types/event';

interface AdTableProps {
  events: AdEvent[];
  onExposureToggle: (id: string, checked: boolean) => void;
  onBidSettingsToggle: (id: string, checked: boolean) => void;
  onEdit: (id: string) => void;
}

function EventThumbnail({
  name,
  thumbnail,
  rating,
  region,
  brandLabel,
}: {
  name: string;
  thumbnail?: string;
  rating?: number;
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
        {rating !== undefined && (
          <span className="text-primary-600 font-bold text-xl leading-tight block">{rating}</span>
        )}
        <p className="text-sm text-gray-700 line-clamp-1 leading-tight">{name}</p>
      </div>
    </div>
  );
}

function RankDisplay({ rank, trend }: { rank: number; trend?: 'up' | 'down' }) {
  if (rank === 0) return <span className="text-sm text-gray-400">-</span>;

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-1">
        {trend === 'down' && <span className="text-red-500 text-xs">↘</span>}
        {trend === 'up' && <span className="text-green-500 text-xs">↗</span>}
        <span className="text-sm">{rank}위</span>
      </div>
      <button className="text-primary-600 text-xs hover:underline">내역</button>
    </div>
  );
}

export function AdTable({ events, onExposureToggle, onBidSettingsToggle, onEdit }: AdTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1400px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
              광고 상태 <span className="text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">광고 노출</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">EID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">카테고리</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">이벤트</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">입찰가</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">입찰 설정</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">일예산</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">평균 노출 순위</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">이벤트 기간</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">노출수</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">조회수</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 whitespace-nowrap">상담신청수</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">결제수</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 whitespace-nowrap">과금 총액</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 whitespace-nowrap">광고 수정</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50/50">
              <td className="px-4 py-4">
                <AdStatusBadge status={event.adStatus} />
              </td>
              <td className="px-4 py-4">
                <ToggleSwitch
                  checked={event.adExposure}
                  onChange={(checked) => onExposureToggle(event.id, checked)}
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">{event.eid}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{event.category}</td>
              <td className="px-4 py-4">
                <EventThumbnail
                  name={event.eventName}
                  thumbnail={event.thumbnail}
                  rating={event.rating}
                  region={event.region}
                  brandLabel={event.brandLabel}
                />
              </td>
              <td className="px-4 py-4">
                {event.bidPrice ? (
                  <div className="text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium">{event.bidPrice}</span>
                      {event.bidType && (
                        <span className="px-1.5 py-0.5 bg-primary-100 text-primary-700 text-[10px] rounded font-medium">
                          {event.bidType}
                        </span>
                      )}
                    </div>
                    {event.bidTarget && (
                      <div className="text-xs text-gray-500 mt-0.5">{event.bidTarget}</div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-4">
                <ToggleSwitch
                  checked={event.bidSettings}
                  onChange={(checked) => onBidSettingsToggle(event.id, checked)}
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">{event.dailyBudget}</td>
              <td className="px-4 py-4">
                <RankDisplay rank={event.avgExposureRank} trend={event.rankTrend} />
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{event.eventPeriod}</td>
              <td className="px-4 py-4 text-sm text-gray-700 text-right">
                {event.impressions.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 text-right">
                {event.views.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 text-right">
                {event.consultationCount.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 text-right">
                {event.payments.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 text-right">{event.totalBilling}</td>
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
