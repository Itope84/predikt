import React from 'react';
import NavBar from './components/NavBar'
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app text-slate-700 flex justify-center px-10">
      <div className="w-full max-w-screen-lg">
        <NavBar />
        <Outlet />
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
      </div>
    </div>
  );
}

export default App;
