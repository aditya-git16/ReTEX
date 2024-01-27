import React from 'react';
import './App.css';
import Header from './components/Header';
import { Display } from './components/Display';
import CounterApp from './components/Counter';

function App() {
  return (
    <div className='flex flex-col items-center justify-around w-full'>
      <Header />
      <Display />
      <CounterApp />
    </div>
  );
}

export default App;
