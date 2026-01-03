export const CONFIG = {
  APP_NAME: '전문가 시너지',
  APP_DESCRIPTION: '전문가들이 지식을 공유하고 네트워킹하는 커뮤니티 플랫폼',

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],

  // Session
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days

  // Rate Limiting
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minute

  // Platform Fee
  PLATFORM_FEE_PERCENT: 15,
} as const;
