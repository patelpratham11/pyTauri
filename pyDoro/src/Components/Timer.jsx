import "../Timer.css";
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { invoke } from "@tauri-apps/api/tauri";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function secondary() {
  // const navigate = useNavigate();

  const [pauseButton, setPauseButton] = useState("---");
  const [startButton, setStartButton] = useState("Start");
  const [time, setTime] = useState(0);
  const [reset, setReset] = useState(0);
  const [originalTime, setOriginalTime] = useState(12)
  const [on, setOn] = useState(false);

  useEffect(()=>{
    invoke("getValues").then((message) =>{
      setOriginalTime(Number(message.split(",")[0]));
      console.log(time, originalTime)
      // setTime(originalTime);
    }, [])

    
      
  }, [])

  useEffect(() => {
    // if( time > 0 ){
      if (on){
        setPauseButton("Pause");
        setStartButton("Reset");
      } else{
        setPauseButton("Resume")
      }
    // } else{
      // setOn(false);
    // }
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
    // setOn(true);
    if(startButton === "Start"){
      setOn(true);
      setStartButton("Reset");
    } else{
      setOn(true);
      setStartButton("Reset");
      setReset(reset + 1);
    }
  }
  

  return (
    <div className="timer-container">
      <h1 className="title">Work</h1>
      <div className="Clock">
          <CountdownCircleTimer
          key={reset}
          isPlaying = {on}
          duration={originalTime}
          colors={['#FC814A', '#CAFE48']}
          trailColor="#57886C"
          colorsTime={[2, 0]}
          trailStrokeWidth={10}
          onComplete={()=> {
            setOn(false);
            setPauseButton("---");
            setStartButton("Start");
            alert("Done")
          }}
          onUpdate={()=>{
            setTime(originalTime);
            setOn(true);
          }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      </div>
      <div className="buttons">
        <button onClick={() => pauseUnpause()}>{pauseButton}</button>
        <button onClick={() => startRestart()}>{startButton}</button>
      </div>
    </div>
  );
}

export default secondary;