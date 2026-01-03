'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Users,
  Briefcase,
  MessageCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { Header, Sidebar, Footer } from '@/components/layout';
import { Button, Card, Badge, Avatar } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';

const features = [
  {
    icon: Users,
    title: '전문가 네트워크',
    description: '다양한 분야의 검증된 전문가들과 연결하세요.',
  },
  {
    icon: Briefcase,
    title: '포트폴리오 전시',
    description: '당신의 작품과 경험을 세상에 보여주세요.',
  },
  {
    icon: MessageCircle,
    title: '실시간 멘토링',
    description: '화상/채팅으로 1:1 멘토링을 받아보세요.',
  },
  {
    icon: Shield,
    title: '안전한 거래',
    description: '에스크로 시스템으로 안전하게 거래하세요.',
  },
];

const stats = [
  { value: '10,000+', label: '등록된 전문가' },
  { value: '50,000+', label: '완료된 멘토링' },
  { value: '4.9', label: '평균 만족도' },
  { value: '100+', label: '전문 분야' },
];

const featuredExperts = [
  {
    name: '김개발',
    title: '시니어 풀스택 개발자',
    avatar: null,
    rating: 4.9,
    reviews: 128,
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
    name: '이디자인',
    title: 'UX/UI 디자이너',
    avatar: null,
    rating: 4.8,
    reviews: 96,
    skills: ['Figma', 'UX Research', 'Design System'],
  },
  {
    name: '박마케팅',
    title: '디지털 마케팅 전문가',
    avatar: null,
    rating: 4.9,
    reviews: 84,
    skills: ['SEO', 'Google Ads', '콘텐츠 마케팅'],
  },
];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-20 text-white lg:py-32">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Badge variant="secondary" size="lg" className="mb-6">
                  <Sparkles className="mr-1 h-4 w-4" />
                  새로운 전문가 플랫폼
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  전문가와 함께
                  <br />
                  <span className="text-blue-200">성장하세요</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                  다양한 분야의 전문가들과 연결하고, 지식을 공유하며, 함께
                  성장하는 커뮤니티에 참여하세요.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={ROUTES.SIGNUP}>
                    <Button size="lg" variant="secondary">
                      무료로 시작하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={ROUTES.EXPERTS}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      전문가 둘러보기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="border-b border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  왜 전문가 시너지인가요?
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  전문가와 의뢰인 모두를 위한 최적의 플랫폼
                </p>
              </div>
              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                  <Card key={feature.title} padding="lg" hover>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Experts Section */}
          <section className="bg-gray-50 py-20 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    인기 전문가
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    높은 평점의 검증된 전문가들
                  </p>
                </div>
                <Link href={ROUTES.EXPERTS}>
                  <Button variant="outline">
                    전체보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredExperts.map((expert) => (
                  <Card key={expert.name} padding="lg" hover>
                    <div className="flex items-start gap-4">
                      <Avatar name={expert.name} size="lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {expert.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {expert.title}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {expert.rating}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({expert.reviews}개 리뷰)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expert.skills.map((skill) => (
                        <Badge key={skill} variant="primary" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Card
                padding="none"
                className="overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <div className="px-8 py-16 text-center sm:px-16">
                  <h2 className="text-3xl font-bold text-white">
                    전문가로 등록하고 수익을 창출하세요
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                    당신의 전문 지식을 필요로 하는 사람들에게 공유하고, 멘토링을
                    통해 부가 수익을 얻으세요.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href={ROUTES.SIGNUP}>
                      <Button size="lg" variant="secondary">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        전문가 등록하기
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}
