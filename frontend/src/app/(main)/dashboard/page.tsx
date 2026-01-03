'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Users,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Avatar, Badge } from '@/components/ui';

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      title: '완료한 멘토링',
      value: '12',
      change: '+2 이번 달',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: '받은 리뷰',
      value: '28',
      change: '평균 4.8점',
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      title: '팔로워',
      value: '156',
      change: '+12 이번 주',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: '포트폴리오 조회',
      value: '1,240',
      change: '+18% 증가',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'React 기초 멘토링',
      mentee: '김철수',
      date: '2024-01-15',
      time: '14:00',
      status: 'confirmed',
    },
    {
      id: 2,
      title: '포트폴리오 리뷰',
      mentee: '이영희',
      date: '2024-01-16',
      time: '10:00',
      status: 'pending',
    },
    {
      id: 3,
      title: '커리어 상담',
      mentee: '박민수',
      date: '2024-01-17',
      time: '15:30',
      status: 'confirmed',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'review',
      content: '김철수님이 5점 리뷰를 남겼습니다.',
      time: '2시간 전',
    },
    {
      id: 2,
      type: 'follow',
      content: '새로운 팔로워가 3명 추가되었습니다.',
      time: '5시간 전',
    },
    {
      id: 3,
      type: 'booking',
      content: '새로운 멘토링 예약이 들어왔습니다.',
      time: '1일 전',
    },
    {
      id: 4,
      type: 'message',
      content: '이영희님이 메시지를 보냈습니다.',
      time: '2일 전',
    },
  ];

  const quickActions = [
    {
      title: '멘토링 일정 관리',
      description: '예정된 세션 확인 및 관리',
      icon: Calendar,
      href: '/mentoring',
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: '포트폴리오 수정',
      description: '포트폴리오 업데이트',
      icon: Briefcase,
      href: '/profile/portfolio',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: '메시지 확인',
      description: '받은 메시지 확인',
      icon: MessageSquare,
      href: '/messages',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    },
    {
      title: '글 작성하기',
      description: '새 게시글 작성',
      icon: FileText,
      href: '/community/write',
      color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          안녕하세요, {session?.user?.name || '사용자'}님!
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          오늘도 좋은 하루 되세요. 대시보드에서 활동을 확인하세요.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} padding="md">
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          빠른 작업
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card hover padding="md" className="h-full cursor-pointer">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                예정된 멘토링
              </CardTitle>
              <Link href="/mentoring">
                <Button variant="ghost" size="sm">
                  전체보기 <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {session.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {session.mentee} · {session.date} {session.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={session.status === 'confirmed' ? 'success' : 'warning'}
                    >
                      {session.status === 'confirmed' ? '확정' : '대기중'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                최근 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
