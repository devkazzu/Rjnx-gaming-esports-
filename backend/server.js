require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tournaments", require("./routes/tournaments"));
app.use("/api/users", require("./routes/users"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

io.on("connection", socket => {
  socket.emit("connected", { message: "Connected to RJNX Gaming" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rjnx-gaming";

mongoose.connect(MONGO_URI)
  .then(() => server.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(error => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
