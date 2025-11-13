import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// import { useQueryClient } from '@tanstack/react-query';
import { auth } from '@/firebase';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/Router';
import { useAuthStore } from '@/store/authStore';
import { fetchUser } from '@/api/userApi';

//로그인 상태 감지 (페이지 새로고침시 로그인 유지)
const AuthListener = () => {
  const { setUser, setInitialized, initialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUser(user.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      setInitialized(true);
    });
    return () => unsubscribe();
  }, [setUser, setInitialized]);

  if (!initialized) return;

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AuthListener;
