import FreeBoardList from '@/pages/freeboad/List';
import FreeBoardLayout from '@/pages/freeboad/Layout';
import FreeBoardDetail from '@/pages/freeboad/Detail';
import FreeBoardCreate from '@/pages/freeboad/Create';
import FreeBoardEdit from '@/pages/freeboad/Edit';
import PrivateRoute from './PrivateRoute';

const boardRoutes = {
  path: '/FreeBoard',
  element: <FreeBoardLayout />,
  children: [
    {
      index: true, // 기본 경로
      element: <FreeBoardList />,
    },
    {
      path: '/FreeBoard/post/:id',
      element: <FreeBoardDetail />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/FreeBoard/write',
          element: <FreeBoardCreate />,
        },
        {
          path: '/FreeBoard/edit/:id',
          element: <FreeBoardEdit />,
        },
      ],
    },
  ],
};

export default boardRoutes;
