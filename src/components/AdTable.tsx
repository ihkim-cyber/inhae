import { TrendingUp, TrendingDown } from 'lucide-react';
import { AdStatusBadge } from './StatusBadge';
import { ToggleSwitch } from './ToggleSwitch';
import type { AdEvent } from '../types/event';

interface AdTableProps {
  events: AdEvent[];
  onExposureToggle: (id: string, checked: boolean) => void;
  onBidSettingsToggle: (id: string, checked: boolean) => void;
  onEdit: (id: string) => void;
}

function EventThumbnail({ name, rating }: { name: string; rating?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
        {name.slice(0, 2)}
      </div>
      <div>
        {rating && (
          <span className="text-primary-600 font-bold text-lg">{rating}</span>
        )}
        <p className="text-sm text-gray-800 line-clamp-1">{name}</p>
      </div>
    </div>
  );
}

export function AdTable({ events, onExposureToggle, onBidSettingsToggle, onEdit }: AdTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1400px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              광고 상태
              <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">광고 노출</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">EID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">카테고리</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">이벤트</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">입찰가</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">입찰 설정</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">일예산</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">평균 노출 순위</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">이벤트 기간</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">노출수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">조회수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">상담신청수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">결제수</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">과금 총액</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">광고 수정</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-3">
                <AdStatusBadge status={event.adStatus} />
              </td>
              <td className="px-4 py-3">
                <ToggleSwitch
                  checked={event.adExposure}
                  onChange={(checked) => onExposureToggle(event.id, checked)}
                />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.eid}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.category}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <EventThumbnail name={event.eventName} rating={event.rating} />
                  {event.region && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                      {event.region}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm">
                  <div>{event.bidPrice}</div>
                  {event.bidType && <span className="text-gray-500 text-xs">{event.bidType}</span>}
                  {event.bidTarget && (
                    <div className="text-xs text-gray-500">{event.bidTarget}</div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <ToggleSwitch
                  checked={event.bidSettings}
                  onChange={(checked) => onBidSettingsToggle(event.id, checked)}
                />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.dailyBudget}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{event.avgExposureRank}위</span>
                  {event.rankTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {event.rankTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                  {event.avgExposureRank > 0 && (
                    <button className="text-blue-600 text-xs hover:underline">내역</button>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.eventPeriod}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {event.impressions.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {event.views.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {event.consultationCount.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {event.payments.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{event.totalBilling}</td>
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
