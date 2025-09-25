import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Foooter from './Foooter';

const Root = () => {
  return (
    <div className='container'>
      <Header />
      <main className=''>
        <div className=''>
          <Outlet />
        </div>
      </main>
      <Foooter />
    </div>
  );
};

export default Root;
