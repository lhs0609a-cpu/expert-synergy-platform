export const ROUTES = {
  // Auth
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',

  // Main
  EXPERTS: '/experts',
  EXPERT_DETAIL: (slug: string) => `/experts/${slug}`,
  PORTFOLIOS: '/portfolios',
  PORTFOLIO_DETAIL: (slug: string) => `/portfolios/${slug}`,
  COMMUNITY: '/community',
  POST_DETAIL: (slug: string) => `/community/${slug}`,
  QUESTIONS: '/community/questions',
  MENTORING: '/mentoring',
  MESSAGES: '/messages',
  SEARCH: '/search',

  // Dashboard
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PROFILE_EXPERT: '/profile/expert',
  PROFILE_SETTINGS: '/profile/settings',
  MY_PORTFOLIO: '/my-portfolio',
  MY_POSTS: '/my-posts',
  BOOKMARKS: '/bookmarks',
  PAYMENTS: '/payments',
  SETTLEMENTS: '/settlements',

  // API
  API: {
    AUTH: '/api/auth',
    USERS: '/api/v1/users',
    EXPERTS: '/api/v1/experts',
    PORTFOLIOS: '/api/v1/portfolios',
    POSTS: '/api/v1/posts',
    MENTORING: '/api/v1/mentoring',
    CHAT: '/api/v1/chat',
    PAYMENTS: '/api/v1/payments',
    NOTIFICATIONS: '/api/v1/notifications',
  },
} as const;
