import { useEffect } from 'react';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';
import { app } from '@/firebase';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/Router';
import type { AuthUser } from './types/authTypes';

//로그인 상태 감지 (페이지 새로고침시 로그인 유지)
const AuthListener = () => {
  const queryClient = useQueryClient();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const userData: AuthUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        queryClient.setQueryData(['user'], userData);
      } else {
        queryClient.setQueryData(['user'], null);
      }
    });
    return () => unsubscribe();
  }, [queryClient, auth]);

  return (
    <>
      {/* {loading && <Loading />} */}
      <RouterProvider router={router} />
    </>
  );
};

export default AuthListener;
