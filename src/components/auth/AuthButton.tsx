import React from 'react';
import { FirebaseError } from 'firebase/app';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignOut, useDeleteUser } from '@/hooks/useAuthQuery';
import { useAuthStore } from '@/store/authStore';

const AuthButton = () => {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  /*
    페이지에서 처리할 뮤테이션이 하나라면 간단히 이렇게도 사용..
    const { mutate, isPending } = useSignUp(); 
    
    또는
    
ex) const signoutfn = useSignOut();
    signoutfn.mutate(data, {...})

  */
  const { mutate: signOutMutation, isPending: signOutIsPending } = useSignOut();
  const { mutate: deleteUserMutation, isPending: deleteUserIsPending } =
    useDeleteUser();

  // 로그인 페이지로 이동
  const handleSignIn = () => {
    navigate('/login', { state: { from: location } });
  };

  // 로그아웃
  const handleSignOut = () => {
    signOutMutation(undefined, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.error('로그아웃 실패:', error);
      },
    });
  };

  // 회원탈퇴
  const handleDeleteUser = () => {
    if (user?.email === 'admin@naver.com') {
      alert('제공해드린 관리자 계정은 회원탈퇴가 불가능합니다.');
      return;
    }
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) {
      return;
    }
    const password = window.prompt('계정인증을 위해 비밀번호 입력해주세요.');
    if (!password) {
      alert('비밀번호가 입력되지 않아 취소되었습니다.');
      return;
    }
    deleteUserMutation(password, {
      onSuccess: () => {
        alert('회원탈퇴가 완료되었습니다.');
        // queryClient 조작은 더 이상 필요 없습니다. onAuthStateChanged가 상태를 null로 변경합니다.
        //queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate('/');
      },
      onError: (error) => {
        if (
          error instanceof FirebaseError &&
          error.code === 'auth/wrong-password'
        ) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert('회원탈퇴 중 오류가 발생했습니다.');
          console.error('회원탈퇴 실패:', error);
        }
      },
    });
  };

  if (isLoading) return null;

  return (
    <span>
      {user ? (
        <>
          <button
            type='button'
            onClick={handleSignOut}
            className='button -blue'
            disabled={signOutIsPending}
          >
            Logout
          </button>
          <button
            type='button'
            onClick={handleDeleteUser}
            className='button -salmon'
            disabled={deleteUserIsPending}
          >
            회원탈퇴
          </button>
        </>
      ) : (
        <>
          <button type='button' onClick={handleSignIn} className='button -blue'>
            Login
          </button>
          <Link to='/register'>
            <button type='button' className='button -salmon'>
              Register
            </button>
          </Link>
        </>
      )}
    </span>
  );
};

export default AuthButton;
