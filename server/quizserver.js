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
                    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
                    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
                    { question: "What is 5 + 7?", options: ["10", "12", "14", "16"], answer: "12" }
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
