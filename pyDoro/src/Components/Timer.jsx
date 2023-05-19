import "../Timer.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";

function secondary() {
  const navigate = useNavigate();
  let timer;
  const [pauseButton, setPauseButton] = useState("---");
  const [startButton, setStartButton] = useState("Start");
  const [time, setTime] = useState();
  var timeVal; 
  const [message, setMessage] = useState("");
  const [on, setOn] = useState(false);

  useEffect(()=>{
    () => getVals();
  }, [])

  useEffect(() => {
    if( time > 0 ){
      if (on){
        setPauseButton("Pause");
        setStartButton("Reset");
        timer = setTimeout(() => setTime(time - 1), 1000);
        console.log(time)
        setOn(true);
      } else{
        setPauseButton("Resume")
      }
    } else{
      setOn(false);
      setMessage("done")
      clearTimeout(timer)
    }
  }, [time, on]);
  

  async function getVals() {
      await invoke("getValues")
      .then((message) => {
      timeVal = Number(message.split(",")[0]);
      console.log(timeVal, typeof(timeVal))
      setTime(timeVal);
      })

  }
  const pauseUnpause = () =>{
    setOn(!on); 
    if(on){
      setPauseButton("Pause");
    } else{
      setPauseButton("Resume")
    }
  }

  const startRestart = () =>{
    clearTimeout(timer);
    setTime(10);
    setOn(true);
  }
  

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <div className="Clock">
        <div className="Clock-sofar" style={{'width': `${(1-(time/10))*100}%`}}></div>
      </div>
      <div className="time-left">
        <h3>Time Left: {time}</h3>
      </div>
      <div className="buttons">
        <button onClick={() => pauseUnpause()}>{pauseButton}</button>
        <button onClick={() => startRestart()}>{startButton}</button>
      </div>
    </div>
  );
}

export default secondary;
