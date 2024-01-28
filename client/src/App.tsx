import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Temp from './utils/Temp';
import Search from './pages/Search';
import Market from './pages/Table';

function App() {
  return (
    <Routes>
      <Route element={<Temp />} >
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/market" element={<Market />} />
      </Route>
    </Routes>
  );
}

export default App;
