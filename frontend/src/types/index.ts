// User Types
export type UserRole = 'USER' | 'EXPERT' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'WITHDRAWN';

export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  profileImage?: string;
  role: UserRole;
  status: UserStatus;
  isExpert: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Common Types
export interface SelectOption {
  label: string;
  value: string;
}
