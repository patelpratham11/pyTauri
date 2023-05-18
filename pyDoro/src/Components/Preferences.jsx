import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";
import { ask } from '@tauri-apps/api/dialog';
import "../App.css";
// added a comment
function Preferences() {
  const navigate = useNavigate();
  const [work, setWork] = useState(0);
  const [short, setShort] = useState(0);
  const [long, setLong] = useState(0);



  async function takeValues() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // await invoke("takeValues", {work: Number(work), short: Number(short), long: Number(long)});
    // navigate('/timer');
    await invoke("takeValues", { work: Number(work), short: Number(short), long: Number(long) })
    await invoke("getValues")
    .then((message) => console.log(message))
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
    </div>
  );
}

export default Preferences;
