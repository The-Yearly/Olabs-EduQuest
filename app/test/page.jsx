'use client'

import { useEffect, useState } from "react"
const { GoogleGenerativeAI } = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI("AIzaSyBBm2aTU0Le0nFQykj_hbirRhNCW73Yl4g");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
export default function Test(){
    const [search,setSearch]=useState("")
    const [click,setClick]=useState(false)
    useEffect(()=>{const fetchData=async()=>{
        if(search!=""){
            const result = await model.generateContent(search);
            console.log(result.response.text())
        }
    }
    fetchData()
    },[click])
    return(
        <>
        <input value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button  onClick={()=>setClick(!click)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg text-white flex items-center justify-center transition-transform duration-300 hover:scale-110"/>
        </>
    )
}