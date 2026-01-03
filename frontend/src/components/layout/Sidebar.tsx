'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home,
  Users,
  Briefcase,
  MessageCircle,
  Calendar,
  BookOpen,
  HelpCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { ROUTES } from '@/lib/constants/routes';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: '홈', href: ROUTES.HOME, icon: Home },
  { name: '전문가', href: ROUTES.EXPERTS, icon: Users },
  { name: '포트폴리오', href: ROUTES.PORTFOLIOS, icon: Briefcase },
  { name: '커뮤니티', href: ROUTES.COMMUNITY, icon: MessageCircle },
  { name: 'Q&A', href: ROUTES.QUESTIONS, icon: HelpCircle },
  { name: '멘토링', href: ROUTES.MENTORING, icon: Calendar },
];

const categories = [
  { name: '개발/IT', slug: 'development' },
  { name: '디자인', slug: 'design' },
  { name: '마케팅', slug: 'marketing' },
  { name: '비즈니스', slug: 'business' },
  { name: '크리에이티브', slug: 'creative' },
  { name: '교육', slug: 'education' },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 lg:static lg:z-auto lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 lg:hidden dark:border-gray-800">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              메뉴
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Categories */}
            <div className="mt-8">
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                카테고리
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`${ROUTES.EXPERTS}?field=${category.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <BookOpen className="h-4 w-4" />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 전문가 시너지
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
