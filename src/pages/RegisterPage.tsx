import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import AuthForm from '@/components/auth/AuthForm';
import { useSignUp } from '@/hooks/useAuthQuery';
import type { FormValues } from '@/types/formTypes';
import { useAuthStore } from '@/store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  //const { data: user, isPending: isUserLoading } = useCurrentUser();
  const { user, isLoading } = useAuthStore();
  /*
    페이지에서 처리할 뮤테이션이 하나라면 간단히 이렇게도 사용..
    const { mutate, isPending } = useSignUp(); 
  */
  const { mutate: mutateSignUp, isPending } = useSignUp(); // isPending 도 여러개의 뮤테이션이 있다면 isPending: 작명
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 회원가입
  const registerAction = (data: FormValues) => {
    setRegisterError(null);
    mutateSignUp(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setError('email', {
                type: 'server',
                message: '이미 사용 중인 이메일입니다.',
              });
              break;
            case 'auth/weak-password':
              setError('password', {
                type: 'server',
                message: '비밀번호는 6자리 이상이어야 합니다.',
              });
              break;
            default:
              setRegisterError('회원가입에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          setRegisterError('알 수 없는 오류가 발생했습니다.');
        }
      },
    });
  };

  // 로그인 한 유저가 /regiter 직접 접근시 리다이렉트
  useEffect(() => {
    if (!isLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return null;

  return (
    <form onSubmit={handleSubmit(registerAction)}>
      <AuthForm type='register' control={control} errors={errors} />
      <div className='form-message-area'>
        {registerError && <p className='form-ms-text'>{registerError}</p>}
        {isPending && <p className='form-ms-text'>회원가입 진행 중...</p>}
      </div>
      <div className='button-box'>
        <button
          type='submit'
          disabled={isPending}
          className={'button -salmon active'}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};
export default RegisterPage;
