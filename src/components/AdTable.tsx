import { useState, useMemo } from 'react';
import type { Advertisement } from '../types';
import { AdStatusBadge, ReviewStatusBadge } from './AdStatusBadge';
import { Toggle } from './Toggle';
import type { FilterValues } from './AdFilters';

interface AdTableProps {
  ads: Advertisement[];
  filters: FilterValues;
}

const formatPrice = (price: number) => price.toLocaleString('ko-KR') + '원';

function AdTableRow({
  ad,
  onExposureChange,
  onModify,
  onDuplicate,
  onHistory,
  onExternalSettings,
  onReviewLink,
  onReviewManage,
  onPerformance,
  onRejectionReason,
}: {
  ad: Advertisement;
  onExposureChange: (id: string, enabled: boolean) => void;
  onModify: (id: string) => void;
  onDuplicate: (id: string) => void;
  onHistory: (id: string) => void;
  onExternalSettings: (id: string) => void;
  onReviewLink: (id: string) => void;
  onReviewManage: (id: string) => void;
  onPerformance: (id: string) => void;
  onRejectionReason: (id: string, reason: string) => void;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td className="px-4 py-3">
        <AdStatusBadge status={ad.status} />
      </td>
      <td className="px-4 py-3">
        <ReviewStatusBadge
          status={ad.reviewStatus}
          rejectionReason={ad.reviewRejectionReason}
          onRejectionClick={() =>
            ad.reviewRejectionReason &&
            onRejectionReason(ad.id, ad.reviewRejectionReason)
          }
        />
      </td>
      <td className="px-4 py-3">
        <Toggle
          checked={ad.adExposureEnabled}
          onChange={(checked) => onExposureChange(ad.id, checked)}
          disabled={ad.status === '기간종료' || ad.status === '잔액부족'}
        />
      </td>
      <td className="px-4 py-3 font-mono text-sm">{ad.eid}</td>
      <td className="px-4 py-3 text-sm">{ad.category}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={ad.thumbnail}
              alt=""
              className="w-16 h-12 object-cover rounded"
            />
            {ad.badge && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1 rounded min-w-[20px] text-center">
                {ad.badge}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium text-sm">{ad.eventName}</div>
            {ad.eventSubtitle && (
              <div className="text-xs text-gray-500">{ad.eventSubtitle}</div>
            )}
            {ad.region && (
              <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                {ad.region}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm">
          <span className="font-medium">{formatPrice(ad.price)}</span>
          {ad.discount && (
            <span className="ml-1 text-red-600">{ad.discount}%</span>
          )}
          {ad.isFirstTrial && (
            <div className="text-xs text-blue-600">1회체험가</div>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {ad.applicationCount !== undefined && (
            <span className="text-sm">{ad.applicationCount}건</span>
          )}
          {ad.applicationCount !== undefined && ad.applicationCount > 0 && (
            <button
              onClick={() => onPerformance(ad.id)}
              className="text-xs text-blue-600 hover:underline text-left"
            >
              성과
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col gap-1">
          {ad.rating !== undefined && (
            <span className="text-sm">
              ★ {ad.rating} ({ad.reviewCount})
            </span>
          )}
          <div>
            {ad.reviewCount && ad.reviewCount > 0 ? (
              <button
                onClick={() => onReviewManage(ad.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                후기 관리
              </button>
            ) : (
              <button
                onClick={() => onReviewLink(ad.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                후기 연결
              </button>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onExternalSettings(ad.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          설정
        </button>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onHistory(ad.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          내역
        </button>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onDuplicate(ad.id)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-gray-700"
          title="복제"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onModify(ad.id)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          수정
        </button>
      </td>
    </tr>
  );
}

export function AdTable({ ads, filters }: AdTableProps) {
  const [localAds, setLocalAds] = useState(ads);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredAds = useMemo(() => {
    return localAds.filter((ad) => {
      if (filters.adStatus && ad.status !== filters.adStatus) return false;
      if (filters.category && ad.category !== filters.category) return false;
      if (
        filters.searchText &&
        !ad.eventName.toLowerCase().includes(filters.searchText.toLowerCase()) &&
        !ad.eid.toString().includes(filters.searchText)
      )
        return false;
      return true;
    });
  }, [localAds, filters]);

  const totalPages = Math.ceil(filteredAds.length / pageSize);
  const paginatedAds = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAds.slice(start, start + pageSize);
  }, [filteredAds, currentPage, pageSize]);

  const handleExposureChange = (id: string, enabled: boolean) => {
    setLocalAds((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, adExposureEnabled: enabled } : ad))
    );
  };

  const handlers = {
    onModify: (id: string) => alert(`광고 수정: ${id}`),
    onDuplicate: (id: string) => alert(`광고 복제: ${id}`),
    onHistory: (id: string) => alert(`히스토리 내역: ${id}`),
    onExternalSettings: (id: string) => alert(`외부 노출 설정: ${id}`),
    onReviewLink: (id: string) => alert(`후기 연결: ${id}`),
    onReviewManage: (id: string) => alert(`후기 관리: ${id}`),
    onPerformance: (id: string) => alert(`성과 내역: ${id}`),
    onRejectionReason: (_id: string, reason: string) =>
      alert(`반려 사유: ${reason}`),
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                광고 상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                검수 상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                광고 노출
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                EID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                카테고리
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                이벤트
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                가격
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                신청 수
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                후기
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                외부 노출
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                히스토리
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                복제
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                광고 수정
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedAds.map((ad) => (
              <AdTableRow
                key={ad.id}
                ad={ad}
                onExposureChange={handleExposureChange}
                {...handlers}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &laquo;
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lsaquo;
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-sm ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            );
          })}
          {totalPages > 5 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="w-8 h-8 rounded text-sm hover:bg-gray-200"
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &rsaquo;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &raquo;
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value={10}>10개씩 보기</option>
            <option value={20}>20개씩 보기</option>
            <option value={50}>50개씩 보기</option>
          </select>
        </div>
      </div>
    </div>
  );
}
