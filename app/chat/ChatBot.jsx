import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiMessageCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const genAI = new GoogleGenerativeAI("AIzaSyBBm2aTU0Le0nFQykj_hbirRhNCW73Yl4g");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const system_prompt = `You are a helpful study assistant AI. 
  You will provide academic assistance in subjects like mathematics, computer science, AI/ML, programming, and exams. 
  Avoid topics unrelated to studies like news, politics, and entertainment,love,volience,relationships,food,sports,literature,fiction,dramatic,fitness,characters,family relations. now give me the answer to this dont tell me anything else not even confirmation that you have understood this message `
async function a(){
  const result = await model.generateContent(system_prompt);
}
a()
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(system_prompt+" "+input);
      const botReply = await result.response.text();
      setMessages((prev) => [...prev, { sender: "bot", text: botReply || "I didn't understand that." }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error getting response" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full shadow-lg text-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
      >
        <FiMessageCircle size={26} />
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 bg-opacity-40 bg-gray-900 backdrop-blur-md border border-gray-500 rounded-xl shadow-xl text-white p-4 transition-all duration-300">
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-2">
            <h3 className="text-lg font-semibold text-blue-400">AI ChatBot</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400 transition-colors">
              <IoClose size={24} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-blue-500">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 max-w-[75%] rounded-lg ${msg.sender === "user" ? "bg-gradient-to-r from-blue-500 to-purple-500 ml-auto text-right shadow-md" : "bg-gray-700 text-left shadow-md"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition-all"
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button 
              onClick={sendMessage} 
              className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
