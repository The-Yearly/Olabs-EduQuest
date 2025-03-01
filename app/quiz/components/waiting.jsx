export default function Waiting(){
    return(
      <div className="flex flex-col items-center justify-center w-[40vw] p-[3vw] h-[25vw] font-sans text-white bg-white/5 backdrop-blur-3xl border border-cyan-500/50 rounded-xl shadow-lg cursor-pointer neon-border">
  
        <h1 className="text-[2vw] text-cyan-300 font-bold neon-text">
          Real-Time Quiz
        </h1>
        
        <h2 className="mt-[2vw] text-gryyay-400 text-lg">
          Waiting for the quiz to start...
        </h2>
        <div className="options" id="options"></div>
        <p id="score" className="text-gray-500"></p>
      </div>
    )  
  }