import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
// import { useQueryClient } from '@tanstack/react-query';
import { auth } from '@/firebase';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes/Router';
import { useAuthStore } from '@/store/authStore';
import { fetchUser } from '@/api/userApi';
import { Loading } from './components/Loading';

//로그인 상태 감지 (페이지 새로고침시 로그인 유지)
const AuthListener = () => {
  const { setUser, setLoading, isLoading } = useAuthStore();
  //const queryClient = useQueryClient();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUser(user.uid);
        setUser(userData);
      } else {
        // 사용자가 로그아웃했거나 없는 경우
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (isLoading) return <Loading />;
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AuthListener;
