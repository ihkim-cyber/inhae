export type AdStatus = '잔액부족' | '라이브' | '기간종료' | '대기' | '중지';
export type ReviewStatus = '승인' | '반려' | '검수중';

export interface AdEvent {
  id: string;
  adStatus: AdStatus;
  adExposure: boolean;
  eid: string;
  category: string;
  eventName: string;
  thumbnail?: string;
  thumbnailColor?: string;
  rating?: number;
  reviewCount?: number;
  region?: string;
  brandLabel?: string;
  bidPrice: string;
  bidType?: string;
  bidTarget?: string;
  bidSettings: boolean;
  dailyBudget: string;
  avgExposureRank: number;
  rankTrend?: 'up' | 'down';
  eventPeriod: string;
  impressions: number;
  views: number;
  consultationCount: number;
  payments: number;
  totalBilling: string;
}

export interface MaterialEvent {
  id: string;
  adStatus: AdStatus;
  reviewStatus: ReviewStatus;
  rejectionReason?: string;
  eid: string;
  category: string;
  eventName: string;
  thumbnail?: string;
  thumbnailColor?: string;
  region?: string;
  brandLabel?: string;
  price: string;
  priceType?: string;
  discount?: number;
  applicationCount: number;
  resultType?: string;
  rating?: number;
  reviewCount?: number;
  hasReviewConnection?: boolean;
}
