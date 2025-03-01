'use client'
import Link from "next/link";
import { useState } from "react";
export default function NavBar(){
    const [activeTab, setActiveTab] = useState('home');
    return(
        <div className="fixed top-0 left-0 right-0 z-50 glass-card bg-opacity-80">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xl font-bold">O</span>
              </div>
              <h1 className="text-xl font-bold uppercase tracking-wider neon-text">OLABS</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['home', 'videos', 'quiz', 'analytics', 'about'].map((tab) => (
                <Link 
                  href={(tab=="home")?"/":tab}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`uppercase tracking-wide text-sm font-medium py-2 border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'border-blue-500 text-blue-400' 
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center">
              <button className="gradient-btn px-4 py-2 rounded-md text-sm font-medium">
                START LEARNING
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}