import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 lg:flex lg:flex-col lg:justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">전문가 시너지</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-white">
            전문가와 함께
            <br />
            성장하세요
          </h1>
          <p className="text-lg text-blue-100">
            다양한 분야의 전문가들과 연결하고, 지식을 공유하며, 함께 성장하는
            커뮤니티에 참여하세요.
          </p>
        </div>

        <p className="text-sm text-blue-200">
          © 2025 전문가 시너지. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                전문가 시너지
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
