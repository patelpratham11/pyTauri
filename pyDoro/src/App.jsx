import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [work, setWork] = useState(0);
  const [short, setShort] = useState(0);
  const [long, setLong] = useState(0);

  const [message, setMessage] = useState("")

  const [currentState, setCurrentState] = useState(null);


  async function takeValues() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setMessage(await invoke("greet", {work: Number(work), short: Number(short), long: Number(long)}));
  }

  return (
    <div className="container">
      <h1>PyDoro</h1>

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            takeValues();
          }}
        >
          <input
            type="number"
            id="greet-input"
            onChange={(e) => setWork(e.currentTarget.value)}
            placeholder="Productive Time"
          />

          <input
            type="number"
            id="greet-input"
            onChange={(e) => setShort(e.currentTarget.value)}
            placeholder="Short Break Time"
          />

          <input
            type="number"
            id="greet-input"
            onChange={(e) => setLong(e.currentTarget.value)}
            placeholder="Long Break Time"
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <p>{message}</p>
    </div>
  );
}

export default App;
