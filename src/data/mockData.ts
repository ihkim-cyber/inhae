import type { AdEvent, MaterialEvent, AdStatus } from '../types/event';

const thumbnails = [
  '/thumbnails/thumb1.svg',
  '/thumbnails/thumb2.svg',
  '/thumbnails/thumb3.svg',
  '/thumbnails/thumb4.svg',
  '/thumbnails/thumb5.svg',
  '/thumbnails/thumb6.svg',
];

const adStatuses: AdStatus[] = ['잔액부족', '라이브', '라이브', '기간종료', '대기', '중지'];

function generateAdEvents(): AdEvent[] {
  const baseEvents: AdEvent[] = [
    {
      id: '1',
      adStatus: '잔액부족',
      adExposure: false,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[0],
      brandLabel: '바비톡',
      rating: 9.9,
      bidPrice: '21,322원',
      bidType: '입찰형',
      bidSettings: true,
      dailyBudget: '제한없음',
      avgExposureRank: 133,
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
    {
      id: '2',
      adStatus: '라이브',
      adExposure: true,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[1],
      brandLabel: '바비톡',
      region: '일본',
      rating: 9.9,
      bidPrice: '21,322원',
      bidType: '입찰형',
      bidSettings: true,
      dailyBudget: '21,322원',
      avgExposureRank: 133,
      rankTrend: 'up',
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
    {
      id: '3',
      adStatus: '라이브',
      adExposure: true,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[2],
      brandLabel: '바비톡',
      rating: 9.9,
      bidPrice: '21,322원',
      bidType: '입찰형',
      bidSettings: true,
      dailyBudget: '제한없음',
      avgExposureRank: 133,
      rankTrend: 'down',
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 0,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
    {
      id: '4',
      adStatus: '기간종료',
      adExposure: false,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[3],
      brandLabel: '바비톡',
      rating: 9.9,
      bidPrice: '221,322원',
      bidType: '입찰형',
      bidTarget: '30,322원 +타켓',
      bidSettings: true,
      dailyBudget: '21,322원',
      avgExposureRank: 0,
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
    {
      id: '5',
      adStatus: '대기',
      adExposure: false,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[4],
      brandLabel: '바비톡',
      rating: 9.9,
      bidPrice: '',
      bidSettings: false,
      dailyBudget: '제한없음',
      avgExposureRank: 133,
      rankTrend: 'up',
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
    {
      id: '6',
      adStatus: '중지',
      adExposure: false,
      eid: '2311',
      category: '피부',
      eventName: '바비톡 인모드 이벤트',
      thumbnail: thumbnails[5],
      brandLabel: '바비톡',
      rating: 9.9,
      bidPrice: '',
      bidSettings: false,
      dailyBudget: '제한없음',
      avgExposureRank: 133,
      rankTrend: 'up',
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    },
  ];

  const eventNames = [
    '바비톡 인모드 이벤트',
    '바비톡 리쥬란 이벤트',
    '바비성형외과 눈매교정',
    '바비성형외과 윤곽 3종',
    '바비성형외과 리프팅',
    '바비톡 보톡스 이벤트',
    '바비성형외과 코 성형',
    '바비톡 필러 이벤트',
    '바비성형외과 쌍꺼풀',
    '바비톡 레이저 이벤트',
  ];

  const categories = ['피부', '눈', '얼굴', '코'];
  const prices = ['21,322원', '126,000원', '50,000원', '221,322원', '89,500원'];
  const budgets = ['제한없음', '21,322원', '100,000원', '50,000원'];

  const allEvents: AdEvent[] = [...baseEvents];

  for (let i = 7; i <= 60; i++) {
    const statusIdx = (i - 1) % adStatuses.length;
    const thumbIdx = (i - 1) % thumbnails.length;
    const nameIdx = (i - 1) % eventNames.length;
    const catIdx = (i - 1) % categories.length;
    const priceIdx = (i - 1) % prices.length;
    const budgetIdx = (i - 1) % budgets.length;

    allEvents.push({
      id: String(i),
      adStatus: adStatuses[statusIdx],
      adExposure: statusIdx === 1 || statusIdx === 2,
      eid: '2311',
      category: categories[catIdx],
      eventName: eventNames[nameIdx],
      thumbnail: thumbnails[thumbIdx],
      brandLabel: '바비톡',
      rating: Number((9.0 + Math.random() * 0.9).toFixed(1)),
      region: i % 5 === 0 ? '일본' : undefined,
      bidPrice: statusIdx === 4 || statusIdx === 5 ? '' : prices[priceIdx],
      bidType: statusIdx === 4 || statusIdx === 5 ? undefined : '입찰형',
      bidTarget: i % 7 === 0 ? '30,322원 +타켓' : undefined,
      bidSettings: statusIdx !== 4 && statusIdx !== 5,
      dailyBudget: budgets[budgetIdx],
      avgExposureRank: Math.floor(Math.random() * 200),
      rankTrend: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'down' : undefined,
      eventPeriod: '25. 10. 25 ~ 26. 01. 01',
      impressions: 21322,
      views: 21322,
      consultationCount: 21322,
      payments: 21322,
      totalBilling: '21,322원',
    });
  }

  return allEvents;
}

function generateMaterialEvents(): MaterialEvent[] {
  const baseEvents: MaterialEvent[] = [
    {
      id: '1',
      adStatus: '대기',
      reviewStatus: '반려',
      rejectionReason: '반려사유',
      eid: '14438',
      category: '피부',
      eventName: '바비성형외과 인모드',
      thumbnail: thumbnails[0],
      brandLabel: '바비톡',
      region: '일본',
      price: '100,900',
      priceType: '1회체험가',
      discount: 39,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
      hasReviewConnection: false,
    },
    {
      id: '2',
      adStatus: '대기',
      reviewStatus: '승인',
      eid: '14438',
      category: '피부',
      eventName: '바비성형외과 리쥬란',
      thumbnail: thumbnails[1],
      brandLabel: '바비톡',
      price: '126,000',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
    },
    {
      id: '3',
      adStatus: '라이브',
      reviewStatus: '검수중',
      eid: '14438',
      category: '눈',
      eventName: '바비성형외과 눈매교정 올인원 글자가 늘어날 경우 늘어날',
      thumbnail: thumbnails[2],
      brandLabel: '바비톡',
      region: '일본',
      price: '126,000',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
      hasReviewConnection: true,
    },
    {
      id: '4',
      adStatus: '라이브',
      reviewStatus: '승인',
      eid: '14438',
      category: '피부',
      eventName: '바비성형외과 리프팅',
      thumbnail: thumbnails[3],
      brandLabel: '바비톡',
      price: '126,000',
      priceType: '1회체험가',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
    },
    {
      id: '5',
      adStatus: '잔액부족',
      reviewStatus: '승인',
      eid: '14438',
      category: '얼굴',
      eventName: '바비성형외과 윤곽 3종',
      thumbnail: thumbnails[4],
      brandLabel: '바비톡',
      price: '126,000',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
    },
    {
      id: '6',
      adStatus: '중지',
      reviewStatus: '반려',
      rejectionReason: '반려사유',
      eid: '14438',
      category: '눈',
      eventName: '바비성형외과 자연스러운 눈매 밸런스',
      thumbnail: thumbnails[5],
      brandLabel: '바비톡',
      region: '일본',
      price: '11,126,000',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
      hasReviewConnection: false,
    },
    {
      id: '7',
      adStatus: '중지',
      reviewStatus: '반려',
      rejectionReason: '반려사유',
      eid: '14438',
      category: '눈',
      eventName: '바비성형외과 눈매 밸런스',
      thumbnail: thumbnails[0],
      brandLabel: '바비톡',
      region: '일본',
      price: '11,126,000',
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
      hasReviewConnection: false,
    },
  ];

  const eventNames = [
    '바비성형외과 인모드',
    '바비성형외과 리쥬란',
    '바비성형외과 눈매교정',
    '바비성형외과 윤곽 3종',
    '바비성형외과 리프팅',
    '바비성형외과 보톡스',
    '바비성형외과 코 성형',
    '바비성형외과 필러',
    '바비성형외과 쌍꺼풀',
    '바비성형외과 레이저',
  ];

  const categories = ['피부', '눈', '얼굴', '코'];
  const reviewStatuses: Array<'승인' | '반려' | '검수중'> = ['승인', '반려', '검수중'];
  const prices = ['100,900', '126,000', '50,000', '221,322', '89,500', '11,126,000'];

  const allEvents: MaterialEvent[] = [...baseEvents];

  for (let i = 8; i <= 70; i++) {
    const statusIdx = (i - 1) % adStatuses.length;
    const thumbIdx = (i - 1) % thumbnails.length;
    const nameIdx = (i - 1) % eventNames.length;
    const catIdx = (i - 1) % categories.length;
    const reviewIdx = (i - 1) % reviewStatuses.length;
    const priceIdx = (i - 1) % prices.length;

    allEvents.push({
      id: String(i),
      adStatus: adStatuses[statusIdx],
      reviewStatus: reviewStatuses[reviewIdx],
      rejectionReason: reviewStatuses[reviewIdx] === '반려' ? '반려사유' : undefined,
      eid: '14438',
      category: categories[catIdx],
      eventName: eventNames[nameIdx],
      thumbnail: thumbnails[thumbIdx],
      brandLabel: '바비톡',
      region: i % 4 === 0 ? '일본' : undefined,
      price: prices[priceIdx],
      priceType: i % 3 === 0 ? '1회체험가' : undefined,
      discount: 30,
      applicationCount: 131,
      resultType: '성과',
      rating: 5.0,
      reviewCount: 22,
      hasReviewConnection: i % 3 === 0,
    });
  }

  return allEvents;
}

export const mockAdEvents: AdEvent[] = generateAdEvents();
export const mockMaterialEvents: MaterialEvent[] = generateMaterialEvents();
