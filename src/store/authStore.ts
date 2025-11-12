import { create } from 'zustand';
import type { AuthUser } from '@/types/authTypes';

/**
 * user UI에 관련된 확장성을 고려하여 유저 인증 상태를 스토어로 관리하기 위해 zustand 를 선택.
 */

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }), // user 상태를 업데이트 액션
  setLoading: (isLoading) => set({ isLoading }),
}));
