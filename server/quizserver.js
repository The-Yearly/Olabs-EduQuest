const express = require("express");
const cors=require("cors")
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express())
app.use(cors())
app.use(express.json())
let rooms = {};
io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`)
    socket.on("JOIN_ROOM", ({ playerName, roomId }) => {
        console.log("Got Request")
        if (!rooms[roomId]) {
            rooms[roomId] = {
                players: {},
                currentQuestionIndex: 0,
                currentAnswers: {},
                quizQuestions: [
                    {           question: "What is the unit of electric current?", 
                        options: ["Volt", "Ohm", "Ampere", "Watt"], 
                        answer: "Ampere" 
                    },
                    { 
                        question: "Which of the following is a scalar quantity?", 
                        options: ["Velocity", "Force", "Acceleration", "Energy"], 
                        answer: "Energy" 
                    },
                    { 
                        question: "What is the speed of light in a vacuum?", 
                        options: ["3 × 10^8 m/s", "2 × 10^8 m/s", "1.5 × 10^8 m/s", "4 × 10^8 m/s"], 
                        answer: "3 × 10^8 m/s" 
                    },
                    { 
                        question: "What is the chemical symbol for Gold?", 
                        options: ["Ag", "Au", "Pb", "Fe"], 
                        answer: "Au" 
                    },
                    { 
                        question: "Which gas is most abundant in Earth's atmosphere?", 
                        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
                        answer: "Nitrogen" 
                    },
                    { 
                        question: "What is the pH value of pure water?", 
                        options: ["5", "7", "9", "11"], 
                        answer: "7" 
                    },
                    { 
                        question: "What is the derivative of sin(x)?", 
                        options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"], 
                        answer: "cos(x)" 
                    },
                    { 
                        question: "What is the value of 2^5?", 
                        options: ["16", "32", "64", "128"], 
                        answer: "32" 
                    },
                    { 
                        question: "What is the area of a triangle with base 10 cm and height 5 cm?", 
                        options: ["25 cm²", "50 cm²", "15 cm²", "30 cm²"], 
                        answer: "25 cm²" 
                    }
                ]
            };
        }

        rooms[roomId].players[socket.id] = { name: playerName, score: 0 };
        socket.join(roomId);
        console.log(`${playerName} joined room: ${roomId}`);
        socket.emit("WELCOME", { playerId: socket.id, playerName });

        if (Object.keys(rooms[roomId].players).length === 1) {
            startQuestion(roomId);
        }
    });

    socket.on("ANSWER", ({ roomId, answer }) => {
        if(answer!=null){
        if (!rooms[roomId]) return;
    
        const currentQuestion = rooms[roomId].quizQuestions[rooms[roomId].currentQuestionIndex];
        console.log(answer,currentQuestion.answer)
        if (answer === currentQuestion.answer) {
            rooms[roomId].players[socket.id].score += 10;
        }
    
        rooms[roomId].currentAnswers[socket.id] = answer;
        console.log(`${socket.id} in room ${roomId} answered: ${answer}`);
    }
    });
    
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        for (const roomId in rooms) {
            if (rooms[roomId].players[socket.id]) {
                delete rooms[roomId]
            }
        }
    });
});




function startQuestion(roomId) {
    if (!roomId || !rooms[roomId]) return;

    let room = rooms[roomId];
    const playersInRoom = Object.keys(room.players);
    room.currentAnswers = {};
    Object.keys(room.players).forEach(playerId => {
        room.currentAnswers[playerId] = null;
    });
    io.to(roomId).emit("QUESTION", room.quizQuestions[room.currentQuestionIndex]);
    setTimeout(() => {
        if (room.currentQuestionIndex < room.quizQuestions.length - 1) {
            room.currentQuestionIndex++;
            startQuestion(roomId);
        } else {
            io.to(roomId).emit("END", { scores: room.players });
        }
    }, 10000);
}

server.listen(8080, () => {
    console.log(`Server Starting ;)`);
});
