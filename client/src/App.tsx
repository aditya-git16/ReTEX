import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Temp from './utils/Temp';
import Search from './pages/Search';

function App() {
  return (
    <Routes>
      <Route element={<Temp />} >
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
