import React from 'react';
import NavBar from './components/NavBar'
import './App.css';
import Table from './components/Table';

function App() {
  const data = [
    {
      id: 1,
      filename: "apple.jpg",
      size: '20.4Mb',
      time: '12:54pm',
    }
  ]

  return (
    <div className="app">
      <NavBar />
      <Table columns={[
        { name: 'Filename', id: 'filename' },
        { name: 'Size', id: 'size' },
        { name: 'Time', id: 'time' },
        { render: (row: any) => <button>Predict</button> },
      ]} data={data} />
    </div>
  );
}

export default App;
