import express from "express";
import { createServer } from "node:http";
import connectDb from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import { Server } from "socket.io";
import router from "./router/student.routes.js";
import cors from "cors";
import Register from "./model/register.js";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.get("/", (req, res) => {
  res.send("server running");
});

app.use("/register", router);
io.on("connection", (socket) => {
  socket.on("input", async (message) => {
    console.log(message);
    const data = await Register.find();
    io.emit("student-table", data);
  });
});
connectDb();
app.use(errorHandler);
httpServer.listen(3000, () => {
  console.log(`listening on *:${PORT}`);
});
