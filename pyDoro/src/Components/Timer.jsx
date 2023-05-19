import "../Timer.css";
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";

function secondary() {
  // const navigate = useNavigate();
  let timer;
  const [pauseButton, setPauseButton] = useState("---");
  const [startButton, setStartButton] = useState("Start");
  const [time, setTime] = useState(0);
  const [isTime, setIsTime] = useState(false);
  const [originalTime, setOriginalTime] = useState()
  const [message, setMessage] = useState("");
  const [on, setOn] = useState(false);

  useEffect(()=>{
    invoke("getValues").then((message) =>{
      setOriginalTime(Number(message.split(",")[0]));
      console.log('time rn', time)
      setTime(originalTime);
      console.log(time);
    }, [])

    
      
  }, [])

  useEffect(() => {
    console.log('here now')
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
      clearTimeout(timer);
    }
  }, [time, on]);

  const updateData = () => {
    invoke("updateGlobal", {session: 0, amount: originalTime}).then(console.log("hi"));
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
    console.log("timeval rn", originalTime)
    setTime(originalTime);
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
      {message}
    </div>
  );
}

export default secondary;
