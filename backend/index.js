const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,userCount,
  userLeave,
  getRoomUsers,findName
} = require("./utils/users");
const chatRooms = {};

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {

  socket.on("createRoom", (roomName) => {
    chatRooms[roomName] = [];
    const usersCount= userCount()
    socket.join(roomName);
  
    socket.emit("roomusers",usersCount);
    io.emit("roomList", Object.keys(chatRooms));
  });
   
  socket.on("joinRoom", (roomName,userName) => {
    const user = userJoin(socket.id, userName, roomName);

    socket.join(roomName);
   const usersCount= userCount()
  
    socket.emit("roomusers",usersCount);

    io.emit("roomList", Object.keys(chatRooms));

    socket.emit("roomMessages", chatRooms[roomName]);
  });

  socket.on("sendMessage", (data) => {
    const { roomName, message , userName } = data;
    const user = getCurrentUser(socket.id);
    const usersCount= userCount()
  
    socket.emit("roomusers",usersCount);
    const paylaod = formatMessage(userName, message);
    chatRooms[roomName].push({
      sender: paylaod.username,
      message: paylaod.text,
      time: paylaod.time,
    });
    io.to(roomName).emit("message", {
      sender: paylaod.username,
      message: paylaod.text,
      time: paylaod.time,
    });
  });

  socket.on("disconnect", () => {
    console.log('disconnect',socket.id);
    const leaveUserName = findName(socket.id)
    const user = userLeave(socket.id);
    // removeUser()
    const usersCount= userCount()
  
    socket.emit("roomusers",usersCount);
    const paylaod = formatMessage(leaveUserName, "left live chat");
    if (user) {
      io.to(user.room).emit("message", {
        sender: paylaod.username,
        message: paylaod.text,
        time: paylaod.time,
      });
      // const getRoomUser = getRoomUsers(user.room);
      // io.to(user.room).emit("roomUsers", {
      //   room: user.room,
      //   users: getRoomUser,
      // });
    }
  });
});
server.listen(3000, () => {
});
