import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Timer from './Components/Timer'

function Root() {
  return (
    <div>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/timer" element={<Timer/>}/>
          <Route exact path="/settings" element={<Timer/>}/>
          <Route exact path="*" element={<Home/>}/>
        </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
