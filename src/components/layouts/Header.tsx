import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthButton from '../../components/auth/AuthButton'; // 로그인, 로그아웃 버튼
import Lottie from 'lottie-web/build/player/lottie_light';
import spaceAnimation from '@/assets/Rocket_loader.json'; // lottie free animation

const Header = () => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;

    const instance = Lottie.loadAnimation({
      container: lottieRef.current, // 렌더링할 DOM 요소
      renderer: 'svg', // 'svg' | 'canvas' | 'html'
      loop: true,
      autoplay: true,
      animationData: spaceAnimation,
    });

    return () => {
      instance.destroy(); // 언마운트 시 메모리 해제
    };
  }, []);

  return (
    <header className='layout_header'>
      <h1 className='layout_header_logo'>
        <Link to='/' className=''>
          <span className=''>WORK</span>
          SPACE
          <div className='lottie-space' ref={lottieRef}></div>
          <p>It’s a side project built with React, Vite, and Firebase.</p>
        </Link>
      </h1>

      <nav className='layout_header_nav'>
        <ul>
          <li>
            <NavLink to='/FreeBoard' className='button -dark'>
              Board
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='layout_header_join'>
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
