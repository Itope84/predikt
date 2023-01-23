import React from 'react';
import NavBar from './components/NavBar'
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app text-slate-700 flex justify-center px-10">
      <div className="w-full max-w-screen-lg">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
