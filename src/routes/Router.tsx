import { createBrowserRouter } from 'react-router-dom';
import Root from '@/components/layouts/MainLayout';
import Home from '@/pages/home/Home';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import FreeBoardRouter from './FreeBoardRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //loader: rootLoader,
    errorElement: <div>오류 발생!</div>,
    children: [
      {
        index: true,
        element: <Home />,
        //loader: homeLoader
      },
      FreeBoardRouter,
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
