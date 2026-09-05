const express = require('express');  
const mongoose = require('mongoose');  
const cors = require('cors');  
const helmet = require('helmet');  
const dotenv = require('dotenv');  
const socketIo = require('socket.io');  
const http = require('http');  
  
dotenv.config();  
  
const app = express();  
const server = http.createServer(app);  
const io = socketIo(server);  
  
// Middleware  
app.use(helmet());  
app.use(cors());  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
  
// Database connection  
mongoose.connect(process.env.MONGODB_URI, {  
  useNewUrlParser: true,  
  useUnifiedTopology: true  
})  
.then(() => console.log('MongoDB connected'))  
.catch(err => console.log('MongoDB connection error:', err));  
  
// Socket.io connection  
io.on('connection', (socket) => {  
  console.log('New client connected:', socket.id);  
  
  socket.on('join-room', (roomId) => {  
    socket.join(roomId);  
  });  
  
  socket.on('chat-message', (message) => {  
    io.to(message.roomId).emit('message', message);  
  });  
  
  socket.on('leave-room', (roomId) => {  
    socket.leave(roomId);  
  });  
});  
  
// Routes  
app.use('/api/auth', require('./routes/auth'));  
app.use('/api/users', require('./routes/users'));  
app.use('/api/tournaments', require('./routes/tournaments'));  
app.use('/api/payments', require('./routes/payments'));  
app.use('/api/admin', require('./routes/admin'));  
  
// Error handling middleware  
app.use((err, req, res, next) => {  
  console.error(err.stack);  
  res.status(err.status || 500).json({  
    message: err.message || 'Internal Server Error',  
    error: process.env.NODE_ENV === 'development' ? err : {}  
  });  
});  
  
const PORT = process.env.PORT || 5000;  
server.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});  
