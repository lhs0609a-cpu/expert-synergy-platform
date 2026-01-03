'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Avatar, Badge } from '@/components/ui';

type SessionStatus = 'upcoming' | 'completed' | 'cancelled' | 'pending';

interface MentoringSession {
  id: number;
  title: string;
  participant: {
    name: string;
    image: string | null;
    role: 'mentor' | 'mentee';
  };
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'chat';
  status: SessionStatus;
  topic: string;
  price: number;
}

const tabs = [
  { id: 'upcoming', name: '예정된 세션', count: 3 },
  { id: 'pending', name: '대기중', count: 2 },
  { id: 'completed', name: '완료됨', count: 15 },
  { id: 'cancelled', name: '취소됨', count: 1 },
];

const sessions: MentoringSession[] = [
  {
    id: 1,
    title: 'React 기초 멘토링',
    participant: { name: '김철수', image: null, role: 'mentee' },
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'video',
    status: 'upcoming',
    topic: 'React Hooks와 상태 관리',
    price: 50000,
  },
  {
    id: 2,
    title: '포트폴리오 리뷰',
    participant: { name: '이영희', image: null, role: 'mentee' },
    date: '2024-01-16',
    time: '10:00',
    duration: 45,
    type: 'video',
    status: 'pending',
    topic: '프론트엔드 포트폴리오 피드백',
    price: 40000,
  },
  {
    id: 3,
    title: '커리어 상담',
    participant: { name: '박민수', image: null, role: 'mentee' },
    date: '2024-01-17',
    time: '15:30',
    duration: 30,
    type: 'chat',
    status: 'upcoming',
    topic: '시니어 개발자로의 성장 로드맵',
    price: 30000,
  },
  {
    id: 4,
    title: 'TypeScript 심화',
    participant: { name: '최지연', image: null, role: 'mentee' },
    date: '2024-01-10',
    time: '11:00',
    duration: 60,
    type: 'video',
    status: 'completed',
    topic: '제네릭과 고급 타입',
    price: 50000,
  },
  {
    id: 5,
    title: 'Next.js 프로젝트 셋업',
    participant: { name: '정다은', image: null, role: 'mentee' },
    date: '2024-01-08',
    time: '16:00',
    duration: 90,
    type: 'video',
    status: 'completed',
    topic: 'Next.js 14 앱 라우터 구조',
    price: 70000,
  },
  {
    id: 6,
    title: '면접 준비',
    participant: { name: '한승우', image: null, role: 'mentee' },
    date: '2024-01-05',
    time: '09:00',
    duration: 60,
    type: 'video',
    status: 'cancelled',
    topic: '프론트엔드 기술 면접 준비',
    price: 50000,
  },
];

const calendarDays = [
  { date: 14, isToday: false, hasSessions: false },
  { date: 15, isToday: true, hasSessions: true },
  { date: 16, isToday: false, hasSessions: true },
  { date: 17, isToday: false, hasSessions: true },
  { date: 18, isToday: false, hasSessions: false },
  { date: 19, isToday: false, hasSessions: false },
  { date: 20, isToday: false, hasSessions: false },
];

export default function MentoringPage() {
  const [activeTab, setActiveTab] = useState<SessionStatus>('upcoming');
  const [selectedDate, setSelectedDate] = useState<number | null>(15);

  const filteredSessions = sessions.filter(
    (session) => session.status === activeTab
  );

  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="primary">예정됨</Badge>;
      case 'pending':
        return <Badge variant="warning">대기중</Badge>;
      case 'completed':
        return <Badge variant="success">완료</Badge>;
      case 'cancelled':
        return <Badge variant="danger">취소됨</Badge>;
    }
  };

  const getStatusIcon = (status: SessionStatus) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            멘토링 관리
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            멘토링 세션을 관리하고 일정을 확인하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            필터
          </Button>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            새 멘토링 등록
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions List */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SessionStatus)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.name}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Session Cards */}
          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <Card key={session.id} hover className="cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar
                          name={session.participant.name}
                          src={session.participant.image}
                          size="lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {session.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {session.participant.name} ({session.participant.role === 'mentee' ? '멘티' : '멘토'})
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(session.status)}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {session.topic}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time} ({session.duration}분)
                      </span>
                      <span className="flex items-center gap-1">
                        {session.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MessageSquare className="w-4 h-4" />
                        )}
                        {session.type === 'video' ? '화상 미팅' : '채팅'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ₩{formatPrice(session.price)}
                      </span>
                      <div className="flex gap-2">
                        {session.status === 'upcoming' && (
                          <>
                            <Button variant="outline" size="sm">
                              일정 변경
                            </Button>
                            <Button size="sm" leftIcon={<Video className="w-4 h-4" />}>
                              입장하기
                            </Button>
                          </>
                        )}
                        {session.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm">
                              거절
                            </Button>
                            <Button size="sm">수락</Button>
                          </>
                        )}
                        {session.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            리뷰 보기
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    해당 상태의 멘토링 세션이 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Calendar & Stats */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>2024년 1월</CardTitle>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div
                    key={day}
                    className="py-2 text-gray-500 dark:text-gray-400 font-medium"
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`py-2 rounded-lg relative transition-colors ${
                      selectedDate === day.date
                        ? 'bg-blue-600 text-white'
                        : day.isToday
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {day.date}
                    {day.hasSessions && (
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                          selectedDate === day.date ? 'bg-white' : 'bg-blue-600'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>이번 달 통계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">완료된 세션</span>
                  <span className="font-semibold text-gray-900 dark:text-white">15회</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">총 멘토링 시간</span>
                  <span className="font-semibold text-gray-900 dark:text-white">18.5시간</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">예상 수익</span>
                  <span className="font-semibold text-green-600">₩720,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">평균 평점</span>
                  <span className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                    4.9
                    <span className="text-yellow-500">★</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" fullWidth className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                가능 시간 설정
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                멘토링 소개 수정
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <Video className="w-4 h-4 mr-2" />
                화상 미팅 테스트
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
