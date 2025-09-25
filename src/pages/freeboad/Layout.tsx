import { NavLink, Outlet } from 'react-router-dom';

const BoardLayout = () => {
  return (
    <>
      <nav className='button_wrap -board'>
        <NavLink className='button -custom' to=''>
          목록
        </NavLink>
        <NavLink className='button -custom' to='/FreeBoard/write'>
          글쓰기
        </NavLink>
      </nav>
      <div className='board-wrap'>
        <Outlet />
      </div>
    </>
  );
};

export default BoardLayout;
