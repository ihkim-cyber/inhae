export type AdStatus = '라이브' | '대기' | '중지' | '잔액부족' | '기간종료';
export type ReviewStatus = '승인' | '반려' | '검수중';

export interface Advertisement {
  id: string;
  eid: number;
  status: AdStatus;
  reviewStatus: ReviewStatus;
  reviewRejectionReason?: string;
  category: string;
  eventName: string;
  eventSubtitle?: string;
  thumbnail: string;
  badge?: string;
  region?: string;
  price: number;
  discount?: number;
  isFirstTrial?: boolean;
  bidPrice?: number;
  bidType?: '입찰형';
  bidSettingsEnabled: boolean;
  adExposureEnabled: boolean;
  dailyBudget: number | null;
  avgExposureRank?: number;
  applicationCount?: number;
  eventStart: string;
  eventEnd: string;
  impressions?: number;
  views?: number;
  consultations?: number;
  payments?: number;
  totalBilling?: number;
  rating?: number;
  reviewCount?: number;
}
