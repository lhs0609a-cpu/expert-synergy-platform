import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/server/auth/config';
import { prisma } from '@/server/db/client';

// GET /api/mentoring - 멘토링 세션 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const role = searchParams.get('role'); // mentor or mentee
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    const where: any = {};

    // 역할에 따른 필터링
    if (role === 'mentor') {
      where.mentor = {
        userId: session.user.id,
      };
    } else if (role === 'mentee') {
      where.menteeId = session.user.id;
    } else {
      // 기본: 멘토 또는 멘티로 참여한 모든 세션
      where.OR = [
        { mentor: { userId: session.user.id } },
        { menteeId: session.user.id },
      ];
    }

    // 상태 필터링
    if (status) {
      where.status = status.toUpperCase();
    }

    const [sessions, total] = await Promise.all([
      prisma.mentoringSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { scheduledAt: 'desc' },
        select: {
          id: true,
          title: true,
          topic: true,
          scheduledAt: true,
          duration: true,
          price: true,
          status: true,
          meetingType: true,
          meetingUrl: true,
          mentor: {
            select: {
              id: true,
              title: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          mentee: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          review: {
            select: {
              rating: true,
              content: true,
            },
          },
        },
      }),
      prisma.mentoringSession.count({ where }),
    ]);

    return NextResponse.json({
      sessions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('멘토링 세션 조회 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/mentoring - 새 멘토링 세션 요청
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { mentorId, title, topic, scheduledAt, duration, meetingType } = body;

    // 필수 필드 검증
    if (!mentorId || !title || !scheduledAt || !duration) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 멘토 프로필 조회
    const mentorProfile = await prisma.expertProfile.findUnique({
      where: { id: mentorId },
      select: {
        id: true,
        hourlyRate: true,
        userId: true,
      },
    });

    if (!mentorProfile) {
      return NextResponse.json(
        { error: '멘토를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 자기 자신에게 멘토링 신청 불가
    if (mentorProfile.userId === session.user.id) {
      return NextResponse.json(
        { error: '자기 자신에게 멘토링을 신청할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 가격 계산 (시간당 요금 기준)
    const price = Math.round((mentorProfile.hourlyRate || 0) * (duration / 60));

    const mentoringSession = await prisma.mentoringSession.create({
      data: {
        mentorId,
        menteeId: session.user.id,
        title,
        topic: topic || '',
        scheduledAt: new Date(scheduledAt),
        duration,
        price,
        meetingType: meetingType || 'VIDEO',
        status: 'PENDING',
      },
      select: {
        id: true,
        title: true,
        topic: true,
        scheduledAt: true,
        duration: true,
        price: true,
        status: true,
        meetingType: true,
      },
    });

    return NextResponse.json(mentoringSession, { status: 201 });
  } catch (error) {
    console.error('멘토링 세션 생성 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
