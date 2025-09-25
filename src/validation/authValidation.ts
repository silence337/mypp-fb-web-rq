import { type RegisterOptions } from 'react-hook-form';
import { type FormValues } from '@/types/formTypes';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

// email, displayName 중복 체크
// db 에 저장된 필드에 존재 유무 체크
const dataCheckUser = async (
  type: 'email' | 'displayNameLower',
  val: string
) => {
  if (type === 'email') {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, val);
      if (methods.length > 0) {
        // 'auth/email-already-in-use'
        return '이미 사용중인 이메일입니다.';
      }
    } catch (error) {
      console.error('Email check error:', error);
      return true;
    }
  } else {
    const q = query(
      collection(db, 'users'),
      where('displayNameLower', '==', val)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return '이미 사용중인 닉네임입니다.';
    }
  }
};

type AuthRulesType = Record<keyof FormValues, RegisterOptions<FormValues>>;

export const AuthRules: AuthRulesType = {
  email: {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: '이메일 형식에 맞지 않습니다.',
    },
    validate: (value) => dataCheckUser('email', value as string),
  },
  displayName: {
    required: '닉네임을 입력해주세요.',
    validate: (value) =>
      dataCheckUser('displayNameLower', (value as string).toLowerCase()),
  },
  password: {
    required: '비밀번호는 필수입니다',
    minLength: {
      value: 6,
      message: '비밀번호는 최소 6자리 이상이어야 합니다',
    },
    maxLength: {
      value: 20,
      message: '비밀번호는 최대 20자리 이하만 가능합니다',
    },
  },
  confirmPassword: {
    required: '비밀번호 확인은 필수입니다',
    validate: (value, formValues) =>
      value === formValues.password || '비밀번호가 일치하지 않습니다',
  },
};

/**
 *  Partial<typeof AuthRules>
 *  getAuthRules에서 AuthRules 를 파셜 타입으로 지정, optional한 값으로 정의( 로그인 일 경우에는 email, password 만 사용하기에 )
 *  login, register form 을 재사용을 위해 하나의 컴포넌트로 작업 해보았지만, 작업하다보니 소셜로그인 등의 확장이 될 경우엔 분리하는게 나을까 하는 생각이 듬.
 */
export const getAuthRules = (
  type: 'login' | 'register'
): Partial<typeof AuthRules> => {
  if (type === 'login') {
    return {
      email: {
        required: '이메일 주소를 입력해주세요',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: '이메일 형식에 맞지 않습니다.',
        },
      },
      password: {
        required: '비밀번호를 입력해주세요',
      },
    } as const;
  }
  return AuthRules;
};
