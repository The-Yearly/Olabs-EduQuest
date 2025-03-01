'use client'
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";

export default function Questions(props) {
  const [quizover, setQuizOver] = useState(false);
  const [socket, setSocket] = useState(null);
  const [question, setQuestion] = useState(null);
  const [blocked,setBlocked]=useState(false)
  const [choices, setChoices] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [finalScore, setFinalScore] = useState([]);
  const [time, setTime] = useState(10);
  const [answer, setAnswer] = useState(null);

  function autoSubmitAnswer(ans) {
    setAnswer(ans)
    setBlocked(true)
    socket.emit("ANSWER", { PlayerId: playerId, roomId: props.data.room_id, answer: ans });
  }

  useEffect(() => {
    const changeTime = () => {
      let c = time;
      c -= 1;
      if (c == 0) {
        c = 10;
      }
      setTime(c);
    };
    const i = setInterval(changeTime, 950);
    return () => clearInterval(i);
  });

  useEffect(() => {
    const newSocket = io("http://localhost:8080", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("WELCOME", (data) => {
      setPlayerId(data.playerId);
      toast(`Welcome ${data.playerName}`);
    });

    newSocket.on("QUESTION", (data) => {
      setBlocked(false)
      setQuestion(data.question);
      setChoices(data.options);
    });

    newSocket.on("END", (data) => {
      console.log(data);
      setQuizOver(true);
      const d=[];
      for (let g in data.scores) {
        d.push(data.scores[g]);
      }

      setFinalScore(d)
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && props.data) {
      socket.emit("JOIN_ROOM", {
        playerName: props.data.user_name,
        roomId: props.data.room_id,
      });
    }
  }, [socket, props.data]);

  if (choices != null && question != null) {
    return (
      <>
        <ToastContainer />
        <div className={(quizover !== true) ? "absolute top-[10vw] left-[30vw] flex flex-col items-center justify-center w-[40vw] p-[3vw] h-[30vw] font-sans text-white bg-white/5 backdrop-blur-3xl border border-cyan-500/50 rounded-xl shadow-lg cursor-pointer neon-border" : "hidden"}>
          <p className="absolute top-[10vw] text-lg text-gray-300 animate-pulse countdown">
            Time left: <span className="countdown">{time}</span>
          </p>
          <h1 className="absolute top-[2vw] text-[2vw] text-cyan-300 font-bold neon-text">
            Real-Time Quiz
          </h1>
          <h2 className="mt-[5vw] text-white text-xl text-center font-semibold">
            {question}
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-6 w-full px-6">
            {choices.map((choice, index) => (
              <button
               disabled={blocked}
                key={index}
                className={(answer !== choice) ? "px-6 py-3 bg-gray-800 hover:bg-cyan-500 text-white rounded-lg text-lg transition-all duration-300 shadow-md" : "px-6 py-3 bg-green-400  text-white rounded-lg text-lg transition-all duration-300 shadow-md"}
                onClick={() => { autoSubmitAnswer(choice);}}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
        <div className={(quizover === true) ? "absolute top-[10vw] left-[30vw] flex flex-col items-center justify-center w-[40vw] p-[3vw] h-[30vw] font-sans text-white bg-white/5 backdrop-blur-3xl border border-cyan-500/50 rounded-xl shadow-lg cursor-pointer neon-border" : "hidden"}>
          {finalScore.length > 0 ? (
            finalScore.map((player, index) => (
              <div key={index}>
                <p className="absolute top-[3vw] text-[4vw] left-[9vw]">LeaderBoard</p>
                <span className="text-[1vw]">{player.name}</span> - <span className="text-[1vw]">{player.score}</span>
              </div>
            ))
          ) : (
            <p>Loading final scores...</p>
          )}
        </div>
      </>
    );
  }

}
