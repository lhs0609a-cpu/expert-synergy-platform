'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, AlertCircle, Check } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/lib/constants/routes';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || '회원가입 중 오류가 발생했습니다.');
        return;
      }

      // Auto login after signup
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push('/onboarding');
        router.refresh();
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: '/onboarding' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        회원가입
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        이미 계정이 있으신가요?{' '}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          로그인
        </Link>
      </p>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <Input
          label="이름"
          type="text"
          placeholder="홍길동"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name', {
            required: '이름을 입력해주세요.',
            minLength: {
              value: 2,
              message: '이름은 2자 이상이어야 합니다.',
            },
          })}
        />

        <Input
          label="이메일"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          hint="영문, 숫자, 특수문자 조합 8자 이상"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
              message: '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
            },
          })}
        />

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 재입력"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: '비밀번호를 다시 입력해주세요.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeTerms"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            {...register('agreeTerms', {
              required: '이용약관에 동의해주세요.',
            })}
          />
          <label htmlFor="agreeTerms" className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="/terms" className="text-blue-600 hover:underline">
              이용약관
            </Link>
            {' 및 '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              개인정보처리방침
            </Link>
            에 동의합니다.
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-xs text-red-500">{errors.agreeTerms.message}</p>
        )}

        <Button type="submit" fullWidth isLoading={isLoading}>
          회원가입
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            또는
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google로 계속하기
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('kakao')}
          disabled={isLoading}
          className="bg-[#FEE500] text-[#000000] hover:bg-[#FDD800] border-[#FEE500]"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 3c-5.52 0-10 3.59-10 8 0 2.73 1.82 5.13 4.55 6.52-.16.57-.57 2.05-.66 2.38-.1.41.15.41.32.3.13-.09 2.1-1.42 2.95-2 .9.13 1.84.2 2.84.2 5.52 0 10-3.59 10-8s-4.48-8-10-8z"
            />
          </svg>
          카카오로 계속하기
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => handleSocialLogin('github')}
          disabled={isLoading}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          GitHub로 계속하기
        </Button>
      </div>
    </div>
  );
}
