'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Header, Sidebar, Footer } from '@/components/layout';
import { Spinner } from '@/components/ui';
import { useUIStore } from '@/stores';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { sidebarOpen } = useUIStore();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:pl-64' : ''
        }`}
      >
        <div className="min-h-[calc(100vh-4rem)]">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
