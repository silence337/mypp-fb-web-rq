import { useMutation } from '@tanstack/react-query';
import {
  signUp,
  userLogin,
  userLogout,
  deleteCurrentUser,
} from '@/api/authApi';
import type { FormValues } from '@/types/formTypes';
import type { AuthUser, AuthUserLogin } from '@/types/authTypes';
import { useAuthStore } from '@/store/authStore';

// 회원가입
export const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation<AuthUser, Error, FormValues>({
    mutationFn: signUp,
    onSuccess: (user) => {
      setUser(user);
    },
  });
};

// 로그인
export const useSignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation<AuthUser, Error, AuthUserLogin>({
    mutationFn: userLogin,
    onSuccess: (user) => {
      setUser(user);
    },
  });
};

// 로그아웃
export const useSignOut = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      setUser(null);
    },
  });
};

// 회원탈퇴
export const useDeleteUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation<void, Error, string>({
    mutationFn: deleteCurrentUser,
    onSuccess: () => {
      setUser(null);
    },
  });
};
