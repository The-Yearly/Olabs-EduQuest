'use client'
import { useState,useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";
import Waiting from "./components/waiting";
import Questions from "./components/quiz";

export default function Quizz(){
  const [name,setName]=useState("")
  const [room,setRoom]=useState("")
  const [data,setData]=useState(null)
  const [quizz,setQuize]=useState(false)
  
  function startQuizz(){
      if(quizz==false){
        return <Waiting/>
      }else{
        return<Questions data={data}/>
      }
    }
  function checkCreds(){
    if(name!="" && room!=""){
      setQuize(true)
      setData({user_name:name,room_id:room})
    }
    else{
      toast("Pls Enter Proper Creds")
    }
  }
  return (
    <>
    <ToastContainer/>
    <div className={(quizz==false)?"flex flex-col lg:flex-row items-center justify-center h-screen bg-black gap-10 p-10":"hidden"}>
      <div className="details bg-white/5 p-8 rounded-xl shadow-lg text-center backdrop-blur-2xl border border-cyan-500/50 neon-border w-[30vw]">
        <h1 className="text-[2vw] text-cyan-300 font-bold neon-text mb-4">
          Enter the Quiz
        </h1>
        <label htmlFor="playerName" className="block mb-2 text-lg text-gray-300 font-semibold">
          Enter Your Name:
        </label>
        <input
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          placeholder="Enter your name"
          className="border border-cyan-500/30 bg-transparent p-2 w-full rounded-md mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        />
        <label htmlFor="roomId" className="block mb-2 text-lg text-gray-300 font-semibold">
          Enter Your Room:
        </label>
        <input
          value={room}
          onChange={(e)=>{setRoom(e.target.value)}}
          placeholder="Enter Room"
          className="border border-cyan-500/30 bg-transparent p-2 w-full rounded-md mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
        />
        <button className="neon-button" onClick={checkCreds}>
          Join Quiz
        </button>
      </div>
    </div>
    {startQuizz()}
    </>
  );
}
