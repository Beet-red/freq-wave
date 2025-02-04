import React from 'react';
import { Outlet } from 'react-router-dom';
import Player from './components/Player';

const MainLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Outlet />
    <Player />
  </div>
);

export default MainLayout;