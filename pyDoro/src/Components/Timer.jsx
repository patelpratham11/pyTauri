import "../Timer.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function secondary() {
  const navigate = useNavigate();
  let timer;
  const [time, setTime] = useState(6);
  const [message, setMessage] = useState("")


  const updateCount = () => {
    timer = setInterval(() => {
      setTime(time - 1) // new
      if(time === 0){
        clearInterval(timer);
        navigate('/');
      }
    }, 1000)
  }

  
  
  useEffect(() => {
    updateCount();
  })
  

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <div className="Clock">
        <div className="Clock-sofar" style={{'width': `${(1-(time/3600))*100}%`}}></div>
      </div>
      <div className="time-left">
        <h3>Time Left: {Math.ceil(time/60)}</h3>
        {message}
      </div>
    </div>
  );
}

export default secondary;
