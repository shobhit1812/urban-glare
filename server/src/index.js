import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { app, server } from "./app.js";
import setupSocket from "./utils/socket.js";

dotenv.config({
  path: "./.env",
});

app.get("/", (_, res) => {
  res.send({ status: 200, message: "ok" });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // Initialize Socket.IO
    const io = setupSocket(server);

    // Pass `io` to your controllers or store it globally
    global.io = io;
  } catch (error) {
    console.error("Failed to start server: ", error.message);
  }
};

startServer();
