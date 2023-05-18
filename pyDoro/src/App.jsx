import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preferences from './Components/Preferences'
import Timer from './Components/Timer'

function Root() {
  return (
    <div>
      <Routes>
          <Route exact path="/" element={<Timer/>}/>
          <Route exact path="/timer" element={<Timer/>}/>
          <Route exact path="/settings" element={<Preferences/>}/>
          <Route exact path="*" element={<Preferences/>}/>
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
