'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ChatBot from './chat/ChatBot';
import { motion } from 'framer-motion';
const subjects = [
  { id: 'physics', name: 'PHYSICS', icon: '⚛', color: '#00f3ff' },
  { id: 'chemistry', name: 'CHEMISTRY', icon: '🧪', color: '#bf00ff' },
  { id: 'biology', name: 'BIOLOGY', icon: '🧬', color: '#00d964' },
  { id: 'maths', name: 'MATHEMATICS', icon: '📐', color: '#ff00aa' },
];
export default function Home() {

  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Future of Learning
              </span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8">
              Explore scientific concepts through interactive simulations, AI-powered quizzes, and video summaries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/videos" className="neon-border px-8 py-3 rounded-md hover:bg-blue-900/20 transition-all">
                EXPLORE VIDEOS
              </Link>
              <Link href="/quiz" className="neon-purple-border px-8 py-3 rounded-md hover:bg-purple-900/20 transition-all">
                AI QUIZ
              </Link>
            </div>
          </motion.div>
          <div className="glass-card p-6 max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">System Initialization</h3>
              <span className="text-sm text-blue-400">{loadingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Neural Network', 'Knowledge Base', 'Visual Engine', 'AI Models'].map((system, i) => (
                <div key={system} className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{system}</span>
                  <span className={`w-3 h-3 rounded-full ${loadingProgress > (i+1)*25 ? 'bg-green-400' : 'bg-gray-600'}`}></span>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                variants={item}
                whileHover={{ 
                  y: -5, 
                  boxShadow: `0 0 20px ${subject.color}`,
                  borderColor: subject.color 
                }}
                className="glass-card p-6 border border-gray-800 rounded-xl cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <span style={{ color: subject.color }} className="text-4xl">
                    {subject.icon}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: `${subject.color}20` }}>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M6 12L10 8L6 4" 
                        stroke={subject.color} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3 style={{ color: subject.color }} className="text-xl font-bold tracking-wider mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Explore interactive {subject.name.toLowerCase()} experiments and concepts
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">24 MODULES</span>
                  <span className="text-xs px-2 py-1 rounded-full" 
                        style={{ backgroundColor: `${subject.color}20`, color: subject.color }}>
                    NEW
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold tracking-wider">FEATURED <span className="text-blue-400">CONTENT</span></h2>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              VIEW ALL
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card overflow-hidden holographic group">
              <div className="aspect-video bg-gray-900 relative">
                <img src="https://via.placeholder.com/600x340" alt="Video Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-blue-500/40 transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
                  10:24
                </div>
              </div>

              <div className="p-5">
                <Link href="/videos">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">DNA Replication Process</h3>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-400/20 text-green-400">BIOLOGY</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">Detailed explanation of how DNA replicates during cell division</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mr-1">
                      <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs text-gray-400">Updated 2 days ago</span>
                  </div>
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mr-1">
                      <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.45825 12C3.73253 7.94288 7.52281 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.2684 16.0571 16.4781 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs text-gray-400">1.2k views</span>
                  </div>
                </div>
                </Link>
              </div>
            </div>
            <div className="glass-card overflow-hidden group neon-purple-border">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11H12V14H9V11ZM9 18H12V20H9V18ZM9 6H12V9H9V6ZM13 11H16V14H13V11ZM13 18H16V20H13V18ZM13 6H16V9H13V6Z" fill="#bf00ff"/>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-purple-400 transition-colors">AI Personalized Quiz</h3>
                <p className="text-gray-400 text-sm mb-6">Test your knowledge with questions tailored to your learning style</p>
                
                <div className="space-y-3 mb-6">
                  {[85, 65,56].map((progress, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{['Physics', 'Chemistry', 'Biology'][i]}</span>
                        <span className="text-purple-400">{progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full 57overflow-hidden">
                        <div 
                          className="h-full bg-purple-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/quiz">
                <button className="w-full py-2 rounded-md text-sm font-medium bg-purple-500/20 text-purple-400 hover:bg-purple-500/40 transition-colors">
                  START QUIZ
                </button>
                </Link>
              </div>
            </div>
            <div className="glass-card overflow-hidden group neon-pink-border">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 14H15M9 18H13" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-pink-400 transition-colors">Video Summaries</h3>
                <p className="text-gray-400 text-sm mb-6">Get concise summaries of educational videos for quick review</p>
                <div className="space-y-4 mb-6">
                  {['Cell Division', 'Periodic Table', 'Quantum Physics'].map((topic, i) => (
                    <div key={i} className="flex items-center p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">{i+1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{topic}</h4>
                        <p className="text-xs text-gray-400">5 min read</p>
                      </div>
                      <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ))}
                </div>
                
                <Link href={"/summary"} className="w-full py-2 rounded-md text-sm font-medium bg-pink-500/20 text-pink-400 hover:bg-pink-500/40 transition-colors">
                  VIEW ALL SUMMARIES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChatBot/>
    </div>
  );
}