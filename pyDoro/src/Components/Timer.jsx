import "../Timer.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function secondary() {
  const navigate = useNavigate();
  let timer;
  const [time, setTime] = useState(10);
  const [message, setMessage] = useState("")


  useEffect(() => {
    if( time > 0 ){
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else{
      setMessage("done")
      clearTimeout(timer)
    }
  }, [time]);
  

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <div className="Clock">
        <div className="Clock-sofar" style={{'width': `${(1-(time/10))*100}%`}}></div>
      </div>
      <div className="time-left">
        <h3>Time Left: {time}</h3>
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default secondary;
