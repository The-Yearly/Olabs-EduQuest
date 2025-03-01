'use client'
import { useState,useEffect } from "react";
export default function Youtube(){
  const  YOUTUBE_API_KEY ="AIzaSyCc7D_r5S79AI98oKq-Vh3MwsL8jkjOiy8"
  const [data,setData]=useState(null)
  const [search,setSearch]=useState("deep learning")
  useEffect(()=>{const fetchdata=async()=>{
    const params = new URLSearchParams({
      part: "snippet",
      q: search+' Visual 0% learning',
      key: YOUTUBE_API_KEY,
      maxResults: 10,
      type: "video",
      videoEmbeddable: "true"
    });
    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    const res=await fetch(url)
    const youtuberes=await res.json()
    setData(youtuberes.items)
  }
  fetchdata()},[search],
  )
  if(data!=null){
    console.log(data)
    return(
      <div className="absolute top-[5vw] left-[10vw] container mx-auto p-6 bg-gray-900 text-white min-h-screen">
    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search for videos" className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 mb-6"/>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400"></h1>
        <p className="text-gray-400">Guiding Your Learning Journey</p>
      </header>
      <div className="grid grid-cols-4 gap-6">
        {data.map((video) => (
          <div key={video.id.videoId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            <div className="relative overflow-hidden">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-purple-500 bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                <i className="fas fa-play text-white text-3xl"></i>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2">{video.snippet.title}</h3>
              <p className="text-gray-400 text-sm truncate">{video.snippet.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-transform transform hover:translate-x-1 shadow-lg"
              >
                Watch <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}
}