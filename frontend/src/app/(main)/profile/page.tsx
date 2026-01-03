'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Edit3,
  Camera,
  Star,
  Users,
  FileText,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Settings,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Avatar, Badge, Input } from '@/components/ui';

const tabs = [
  { id: 'overview', name: '개요' },
  { id: 'portfolio', name: '포트폴리오' },
  { id: 'reviews', name: '리뷰' },
  { id: 'activity', name: '활동' },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: session?.user?.name || '사용자',
    email: session?.user?.email || 'user@example.com',
    title: '시니어 프론트엔드 개발자',
    company: '네이버',
    location: '서울, 대한민국',
    bio: '10년차 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용하며, 사용자 경험 향상에 관심이 많습니다. 주니어 개발자 멘토링을 통해 함께 성장하는 것을 좋아합니다.',
    joinDate: '2024년 1월',
    isExpert: true,
    isVerified: true,
    stats: {
      followers: 156,
      following: 42,
      posts: 28,
      mentoringSessions: 87,
    },
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'TailwindCSS'],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com',
    },
  };

  const portfolioItems = [
    {
      id: 1,
      title: '이커머스 플랫폼 리뉴얼',
      description: '대규모 이커머스 사이트의 프론트엔드 전면 리뉴얼 프로젝트',
      image: '/portfolio-1.jpg',
      tags: ['React', 'Redux', 'TypeScript'],
    },
    {
      id: 2,
      title: '실시간 협업 도구',
      description: '팀 협업을 위한 실시간 문서 편집 플랫폼',
      image: '/portfolio-2.jpg',
      tags: ['Next.js', 'Socket.io', 'MongoDB'],
    },
    {
      id: 3,
      title: '금융 대시보드',
      description: '투자 현황을 시각화하는 대시보드 개발',
      image: '/portfolio-3.jpg',
      tags: ['React', 'D3.js', 'REST API'],
    },
  ];

  const reviews = [
    {
      id: 1,
      author: '김철수',
      rating: 5,
      content: '정말 친절하게 설명해주시고, 실무에서 바로 적용할 수 있는 팁들을 많이 알려주셨어요!',
      date: '2024-01-10',
    },
    {
      id: 2,
      author: '이영희',
      rating: 5,
      content: '멘토링 후 포트폴리오 퀄리티가 확실히 올라갔습니다. 감사합니다!',
      date: '2024-01-05',
    },
    {
      id: 3,
      author: '박민수',
      rating: 4,
      content: '커리어 방향에 대해 구체적인 조언을 해주셔서 많은 도움이 되었습니다.',
      date: '2023-12-28',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                name={userProfile.name}
                src={session?.user?.image}
                size="3xl"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.name}
                </h1>
                <div className="flex gap-2">
                  {userProfile.isVerified && (
                    <Badge variant="primary">인증됨</Badge>
                  )}
                  {userProfile.isExpert && (
                    <Badge variant="success">전문가</Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {userProfile.title} @ {userProfile.company}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {userProfile.joinDate} 가입
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
                {userProfile.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {userProfile.socialLinks.github && (
                  <a
                    href={userProfile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                )}
                {userProfile.socialLinks.linkedin && (
                  <a
                    href={userProfile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                )}
                {userProfile.socialLinks.website && (
                  <a
                    href={userProfile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {userProfile.stats.followers}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">팔로워</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {userProfile.stats.following}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">팔로잉</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {userProfile.stats.posts}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">게시글</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {userProfile.stats.mentoringSessions}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">멘토링</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link href="/profile/edit">
                <Button variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>
                  프로필 수정
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Skills */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                스킬
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" size="lg">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                평가
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  4.9
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  128개의 리뷰
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} hover className="cursor-pointer">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-xl" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center aspect-square cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                새 포트폴리오 추가
              </p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.author} size="md" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {review.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              최근 활동이 없습니다.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
