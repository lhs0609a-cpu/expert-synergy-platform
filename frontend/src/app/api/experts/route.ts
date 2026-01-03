import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/server/db/client';
import { Prisma } from '@prisma/client';

// GET /api/experts - 전문가 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'popular';
    const minRate = searchParams.get('minRate');
    const maxRate = searchParams.get('maxRate');

    const skip = (page - 1) * limit;

    // 필터 조건 구성
    const where: Prisma.ExpertProfileWhereInput = {
      isVerified: true,
    };

    if (category && category !== 'all') {
      where.primaryField = category;
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { title: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minRate) {
      where.hourlyRate = { ...where.hourlyRate as object, gte: parseInt(minRate) };
    }

    if (maxRate) {
      where.hourlyRate = { ...where.hourlyRate as object, lte: parseInt(maxRate) };
    }

    // 정렬 조건 구성
    let orderBy: Prisma.ExpertProfileOrderByWithRelationInput | Prisma.ExpertProfileOrderByWithRelationInput[] = {};
    switch (sort) {
      case 'rating':
        orderBy = { averageRating: 'desc' };
        break;
      case 'reviews':
        orderBy = { totalReviews: 'desc' };
        break;
      case 'price-low':
        orderBy = { hourlyRate: 'asc' };
        break;
      case 'price-high':
        orderBy = { hourlyRate: 'desc' };
        break;
      default: // popular
        orderBy = [{ totalReviews: 'desc' }, { averageRating: 'desc' }];
    }

    const [experts, total] = await Promise.all([
      prisma.expertProfile.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          title: true,
          bio: true,
          primaryField: true,
          hourlyRate: true,
          isVerified: true,
          averageRating: true,
          totalReviews: true,
          responseTime: true,
          slug: true,
          user: {
            select: {
              id: true,
              name: true,
              profileImage: true,
            },
          },
          skills: {
            take: 5,
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.expertProfile.count({ where }),
    ]);

    return NextResponse.json({
      experts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('전문가 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
