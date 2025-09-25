import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useForm } from 'react-hook-form';
import { useSignIn, useCurrentUser } from '@/hooks/useAuthQuery';
import type { FormValues } from '@/types/formTypes';
import type { AuthUserLogin } from '@/types/authTypes';
import { FirebaseError } from 'firebase/app';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const { data: user, isPending: isUserLoading } = useCurrentUser();
  const [loginError, setLoginError] = useState<string | null>(null);

  /*
    페이지에서 처리할 뮤테이션이 하나라면 간단히 이렇게도 사용..
    const { mutate, isPending } = useSignIn(); 
  */
  const { mutate: mutateSignIn, isPending } = useSignIn(); // isPending 도 여러개의 뮤테이션이 있다면 isPending: 작명
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  // 로그인
  const loginAction = (data: AuthUserLogin) => {
    setLoginError(null); // 이전 에러 메시지 초기화
    mutateSignIn(data, {
      onSuccess: () => {
        if (from === '/login' || from === '/register') {
          navigate('/', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      },
      onError: (error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-email':
              setLoginError('입력한 이메일로 등록된 사용자가 없습니다.');
              break;
            case 'auth/wrong-password':
              setLoginError('입력한 비밀번호가 일치하지 않습니다.');
              break;
            default:
              setLoginError('로그인에 실패하였습니다. 다시 시도해주세요.');
          }
        } else {
          setLoginError('알 수 없는 오류가 발생했습니다.');
        }
      },
    });
  };

  // 로그인 한 유저가 /login 직접 접근시 리다이렉트
  useEffect(() => {
    if (!isUserLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isUserLoading, navigate]);

  if (isUserLoading) return null;

  return (
    <form onSubmit={handleSubmit(loginAction)}>
      <AuthForm type='login' control={control} errors={errors} />
      <div className='form-message-area'>
        {loginError && <p className='form-ms-text'>{loginError}</p>}
        {isPending && <p className='form-ms-text'>로그인 진행 중...</p>}
      </div>
      <div className='button-box'>
        <button
          type='submit'
          disabled={isPending}
          className={'button -blue active'}
        >
          로그인
        </button>
      </div>
    </form>
  );
};
export default LoginPage;
