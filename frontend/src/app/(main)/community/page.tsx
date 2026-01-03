'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  PenSquare,
  MessageCircle,
  Heart,
  Eye,
  TrendingUp,
  Clock,
  Star,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react';
import { Card, CardContent, Button, Avatar, Badge, Input } from '@/components/ui';

const categories = [
  { id: 'all', name: '전체', count: 1234 },
  { id: 'free', name: '자유게시판', count: 456 },
  { id: 'qna', name: 'Q&A', count: 321 },
  { id: 'tips', name: '팁 & 노하우', count: 234 },
  { id: 'career', name: '커리어', count: 123 },
  { id: 'showcase', name: '작업물 공유', count: 100 },
];

const tabs = [
  { id: 'popular', name: '인기', icon: TrendingUp },
  { id: 'latest', name: '최신', icon: Clock },
  { id: 'following', name: '팔로잉', icon: Star },
];

const posts = [
  {
    id: 1,
    title: '주니어 개발자 3년차, 이직 준비 어떻게 해야 할까요?',
    content: '현재 스타트업에서 프론트엔드 개발자로 3년째 일하고 있습니다. 이직을 준비하려고 하는데, 포트폴리오 정리나 면접 준비 등 어떻게 해야 할지...',
    author: {
      name: '김개발',
      image: null,
      title: '프론트엔드 개발자',
    },
    category: 'career',
    tags: ['이직', '커리어', '면접'],
    likes: 42,
    comments: 15,
    views: 234,
    createdAt: '2시간 전',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'Next.js 14 App Router 실무 적용 후기',
    content: '최근 회사 프로젝트에 Next.js 14 App Router를 적용했는데요, 기존 Pages Router와 비교해서 느낀 점들을 공유합니다...',
    author: {
      name: '박서버',
      image: null,
      title: '풀스택 개발자',
    },
    category: 'tips',
    tags: ['Next.js', 'React', '실무'],
    likes: 89,
    comments: 23,
    views: 567,
    createdAt: '5시간 전',
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    title: 'TypeScript 제네릭 완벽 정리',
    content: 'TypeScript의 제네릭은 처음에 어렵게 느껴지지만, 한번 이해하면 정말 강력한 도구입니다. 오늘은 제네릭의 기초부터 고급 활용까지...',
    author: {
      name: '이타입',
      image: null,
      title: '시니어 개발자',
    },
    category: 'tips',
    tags: ['TypeScript', '제네릭', '튜토리얼'],
    likes: 156,
    comments: 31,
    views: 892,
    createdAt: '1일 전',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    title: '개인 포트폴리오 사이트 리뉴얼했습니다!',
    content: '3개월 동안 준비한 포트폴리오 사이트가 드디어 완성됐습니다. React와 Three.js를 활용해서 인터랙티브한 경험을 구현했어요...',
    author: {
      name: '최디자인',
      image: null,
      title: 'UI/UX 디자이너',
    },
    category: 'showcase',
    tags: ['포트폴리오', 'React', 'Three.js'],
    likes: 234,
    comments: 45,
    views: 1203,
    createdAt: '2일 전',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 5,
    title: 'React Query vs SWR, 어떤 걸 선택해야 할까요?',
    content: '새 프로젝트를 시작하면서 데이터 페칭 라이브러리를 선택해야 하는데요, React Query와 SWR 중에 고민되네요...',
    author: {
      name: '정리액트',
      image: null,
      title: '프론트엔드 개발자',
    },
    category: 'qna',
    tags: ['React Query', 'SWR', '데이터 페칭'],
    likes: 28,
    comments: 19,
    views: 345,
    createdAt: '3일 전',
    isLiked: false,
    isBookmarked: false,
  },
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            커뮤니티
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            전문가들과 지식을 나누고 함께 성장하세요
          </p>
        </div>
        <Link href="/community/write">
          <Button leftIcon={<PenSquare className="w-4 h-4" />}>
            글쓰기
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="검색어를 입력하세요"
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                카테고리
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-400 text-xs">{category.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                인기 태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', '커리어', '이직', '면접', 'Node.js', 'AWS'].map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm" className="cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              필터
            </Button>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} hover className="cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Author */}
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar name={post.author.name} src={post.author.image} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {post.author.title} · {post.createdAt}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <Link href={`/community/${post.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <button
                          className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                            post.isLiked ? 'text-red-500' : ''
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`}
                          />
                          {post.likes}
                        </button>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                          post.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`}
                        />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              더 많은 글 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
