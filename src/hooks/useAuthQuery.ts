import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  signUp,
  userLogin,
  userLogout,
  deleteCurrentUser,
} from '@/api/authApi';
import type { FormValues } from '@/types/formTypes';
import type { AuthUser, AuthUserLogin } from '@/types/authTypes';

export const useCurrentUser = () => {
  // AuthListener 사용자 데이터를 읽어옴
  return useQuery<AuthUser | null>({
    queryKey: ['user'],
    queryFn: () => new Promise(() => {}),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
// onAuthStateChanged 에서 유저 상태를 감지하기 때문에 invalidateQueries 는 불필요.

// 회원가입
export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthUser, Error, FormValues>({
    mutationFn: signUp,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
    },
  });
};

// 로그인
export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthUser, Error, AuthUserLogin>({
    mutationFn: userLogin,
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(['user'], user);
    },
  });
};

// 로그아웃
export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });
};

// 회원탈퇴
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteCurrentUser,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });
};
