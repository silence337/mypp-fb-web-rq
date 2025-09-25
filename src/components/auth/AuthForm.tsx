import React from 'react';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import Input from '@/components/form/Input';
import { type FormValues } from '@/types/formTypes';
import { getAuthRules } from '@/validation/authValidation';

/**
 * 로그인, 회원가입 form 을 한번 재활용 해보려고 이렇게도 작업해본다.
 */

interface AuthFormProps {
  control: Control<FormValues>;
  type: 'login' | 'register';
  errors: FieldErrors<FormValues>;
}

const AuthForm = ({ type, control, errors }: AuthFormProps) => {
  const rules = getAuthRules(type);
  //console.log(errors);
  return (
    <>
      <div className='ring'>
        <i style={{ '--clr': '#00ff0a' } as Record<string, string>}></i>
        <i style={{ '--clr': '#ff0057' } as Record<string, string>}></i>
        <i style={{ '--clr': '#fffd44' } as Record<string, string>}></i>
        <div className='login'>
          <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
          <p className='info-ms'>
            테스트용 회원가입, 이메일 인증절차는 제외되어
            <br />
            임의 이메일로 생성가능합니다.
          </p>
          <Controller
            name='email'
            control={control}
            rules={rules.email}
            render={({ field }) => (
              <Input
                label='이메일'
                type='text'
                placeholder='email address'
                error={errors.email}
                {...field}
              />
            )}
          />
          {type === 'register' && (
            <Controller
              name='displayName'
              control={control}
              rules={rules.displayName}
              render={({ field }) => (
                <Input
                  label='닉네임'
                  type='text'
                  placeholder='게시판에 사용될 닉네임'
                  error={errors.displayName}
                  {...field}
                />
              )}
            />
          )}
          <Controller
            name='password'
            control={control}
            rules={rules.password}
            render={({ field }) => (
              <Input
                label='비밀번호'
                type='password'
                placeholder='Password'
                error={errors.password}
                {...field}
              />
            )}
          />

          {type === 'register' && (
            <Controller
              name='confirmPassword'
              control={control}
              rules={rules.confirmPassword}
              render={({ field }) => (
                <Input
                  label='비밀번호 확인'
                  type='password'
                  placeholder='confirm Password'
                  error={errors.confirmPassword}
                  {...field}
                />
              )}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
