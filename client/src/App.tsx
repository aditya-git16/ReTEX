import React from 'react';
import './App.css';
import Header from './components/Header';
import { Display } from './components/Display';

function App() {
  return (
    <div className='flex items-center justify-center w-full'>
      <Header />
      <Display />
    </div>
  );
}

export default App;
