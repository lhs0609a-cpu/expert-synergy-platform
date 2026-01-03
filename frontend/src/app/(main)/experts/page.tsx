'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  Grid,
  List,
  Heart,
} from 'lucide-react';
import { Card, CardContent, Button, Avatar, Badge, Input } from '@/components/ui';

const categories = [
  { id: 'all', name: '전체' },
  { id: 'dev', name: '개발/IT' },
  { id: 'design', name: '디자인' },
  { id: 'marketing', name: '마케팅' },
  { id: 'business', name: '비즈니스' },
  { id: 'finance', name: '금융' },
  { id: 'education', name: '교육' },
];

const sortOptions = [
  { id: 'popular', name: '인기순' },
  { id: 'rating', name: '평점순' },
  { id: 'reviews', name: '리뷰순' },
  { id: 'price-low', name: '가격 낮은순' },
  { id: 'price-high', name: '가격 높은순' },
];

const experts = [
  {
    id: 1,
    name: '김지원',
    title: '시니어 프론트엔드 개발자',
    company: '네이버',
    location: '서울',
    rating: 4.9,
    reviews: 128,
    hourlyRate: 50000,
    skills: ['React', 'TypeScript', 'Next.js'],
    image: null,
    isVerified: true,
    responseTime: '평균 2시간 이내',
    completedSessions: 156,
  },
  {
    id: 2,
    name: '박서연',
    title: 'UX/UI 디자이너',
    company: '카카오',
    location: '판교',
    rating: 4.8,
    reviews: 95,
    hourlyRate: 45000,
    skills: ['Figma', 'UX Research', 'Prototyping'],
    image: null,
    isVerified: true,
    responseTime: '평균 1시간 이내',
    completedSessions: 120,
  },
  {
    id: 3,
    name: '이준호',
    title: '백엔드 아키텍트',
    company: '토스',
    location: '서울',
    rating: 4.95,
    reviews: 87,
    hourlyRate: 60000,
    skills: ['Java', 'Spring', 'AWS', 'MSA'],
    image: null,
    isVerified: true,
    responseTime: '평균 3시간 이내',
    completedSessions: 98,
  },
  {
    id: 4,
    name: '최민지',
    title: '데이터 사이언티스트',
    company: '쿠팡',
    location: '서울',
    rating: 4.7,
    reviews: 64,
    hourlyRate: 55000,
    skills: ['Python', 'ML', 'TensorFlow', 'SQL'],
    image: null,
    isVerified: false,
    responseTime: '평균 4시간 이내',
    completedSessions: 72,
  },
  {
    id: 5,
    name: '정다희',
    title: '마케팅 매니저',
    company: '배달의민족',
    location: '서울',
    rating: 4.85,
    reviews: 112,
    hourlyRate: 40000,
    skills: ['디지털마케팅', 'GA', '콘텐츠마케팅'],
    image: null,
    isVerified: true,
    responseTime: '평균 2시간 이내',
    completedSessions: 145,
  },
  {
    id: 6,
    name: '한승우',
    title: 'DevOps 엔지니어',
    company: '라인',
    location: '판교',
    rating: 4.9,
    reviews: 76,
    hourlyRate: 55000,
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
    image: null,
    isVerified: true,
    responseTime: '평균 1시간 이내',
    completedSessions: 89,
  },
];

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          전문가 찾기
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          다양한 분야의 검증된 전문가들을 만나보세요
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="전문가 이름, 기술, 회사 검색..."
              leftIcon={<Search className="w-5 h-5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            상세 필터
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {experts.length}명의 전문가
            </span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                    : 'bg-white dark:bg-gray-800 text-gray-500'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                    : 'bg-white dark:bg-gray-800 text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Experts Grid */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {experts.map((expert) => (
          <Link key={expert.id} href={`/experts/${expert.id}`}>
            <Card hover className="h-full cursor-pointer">
              <CardContent className="p-6">
                {/* Top Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar
                      name={expert.name}
                      src={expert.image}
                      size="xl"
                      showOnline
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {expert.name}
                        </h3>
                        {expert.isVerified && (
                          <Badge variant="primary" size="sm">
                            인증
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {expert.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Briefcase className="w-3 h-3" />
                        {expert.company}
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <MapPin className="w-3 h-3" />
                        {expert.location}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {expert.rating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({expert.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {expert.responseTime}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₩{formatPrice(expert.hourlyRate)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /시간
                    </span>
                  </div>
                  <Button size="sm">프로필 보기</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          더 많은 전문가 보기
        </Button>
      </div>
    </div>
  );
}
