'use client'
import React, { useState, useEffect, useRef } from "react";

const Page = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const faqSectionRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (faqSectionRef.current) {
        const faqPosition = faqSectionRef.current.getBoundingClientRect().top;
        if (faqPosition < window.innerHeight * 0.75) {
          faqSectionRef.current.classList.add('visible');
        }
      }

      if (featuresRef.current) {
        const featuresPosition = featuresRef.current.getBoundingClientRect().top;
        if (featuresPosition < window.innerHeight * 0.75) {
          featuresRef.current.classList.add('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: "🌐",
      title: "Multiplayer Quizzes",
      description: "Engage in real-time lab-based quizzes with a dynamic leaderboard and challenge friends globally."
    },
    {
      icon: "🤖",
      title: "AI-Powered Learning",
      description: "Adaptive difficulty, personalized feedback, and educator insights tailored to your learning style."
    },
    {
      icon: "🧠",
      title: "AI Lab Assistant",
      description: "Get real-time guidance and step-by-step explanations during complex experiments from your AI companion."
    },
    {
      icon: "📹",
      title: "YouTube Summarizer",
      description: "Quickly extract key insights from educational videos with AI-generated summaries and key points."
    },
    {
      icon: "🔬",
      title: "3D Interactive Models",
      description: "Explore complex scientific concepts through immersive 3D models you can manipulate and investigate."
    },
    {
      icon: "👥",
      title: "Collaborative Workspaces",
      description: "Work together in real-time virtual labs with classmates from anywhere in the world."
    }
  ];

  const faqs = [
    { question: "What is OLabs?", answer: "OLabs provides next-gen virtual experiments in science and mathematics using AI-powered simulations for immersive learning." },
    { question: "How do OLabs work?", answer: "It offers interactive simulations and hands-on virtual experiments with real-time AI guidance and collaborative features." },
    { question: "Can I access OLabs anywhere?", answer: "Yes, OLabs is accessible globally with an internet connection on any modern device or browser." },
    { question: "Is OLabs mobile-friendly?", answer: "Yes, OLabs works seamlessly on tablets, iPads, and Android devices with a responsive touch interface." },
    { question: "How does AI enhance learning?", answer: "AI personalizes the learning experience with smart recommendations, adaptive difficulty levels, and real-time feedback on experiments." },
    { question: "Do I need special software?", answer: "No, OLabs runs fully in the browser without additional software, leveraging WebGL for 3D simulations." },
    { question: "Is OLabs free to use?", answer: "Yes, OLabs is free for students and educators with premium features available for institutions." },
    { question: "What subjects does OLabs cover?", answer: "OLabs covers Physics, Chemistry, Biology, Mathematics, Computer Science, and Engineering fundamentals." }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background with particles */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-black to-purple-950">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 5 + 1}px`,
                height: `${Math.random() * 5 + 1}px`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 5 + 1}px rgba(255, 255, 255, 0.3)`,
                animation: `float ${Math.random() * 20 + 10}s linear infinite`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      {/* Navbar Space */}
      <div className="h-16 opacity-0 transition-opacity duration-500 ease-in-out" id="navbar-space"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-8 animate-pulse-slow">
            OLabs
          </h1>
          <div className="inline-block p-1 rounded-lg bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-16 transform hover:scale-105 transition-all duration-300">
            <div className="bg-black bg-opacity-90 rounded-lg p-6 backdrop-blur">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2">The Future of Virtual Labs & AI-Driven Learning</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Transforming online learning with AI-powered virtual labs, gamified quizzes, and real-time collaboration.
              </p>
            </div>
          </div>
        </div>
        
        {/* Features Section with staggered animation */}
        <div ref={featuresRef} className="mb-32 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out">
          <h2 className="text-3xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Revolutionary Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(123,104,238,0.4)] hover:shadow-[0_0_30px_rgba(123,104,238,0.6)] transition-all duration-500 group hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="h-full p-8 flex flex-col">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    {feature.description}
                  </p>
                  <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-6 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div ref={faqSectionRef} className="opacity-0 transform translate-y-10 transition-all duration-1000 ease-out">
          <h2 className="text-3xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="faq-item bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-[0_0_10px_rgba(123,104,238,0.3)] hover:shadow-[0_0_20px_rgba(123,104,238,0.5)] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <h3 className="text-xl font-medium text-white">{faq.question}</h3>
                  <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    activeFaq === index ? 'max-h-40 py-4' : 'max-h-0 py-0'
                  }`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add global styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .feature-card {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .faq-item {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes slideIn {
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Page;