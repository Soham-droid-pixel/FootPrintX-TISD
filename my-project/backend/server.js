const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
import axios from "axios";
dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Set up CORS properly
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.json());

// ✅ Connect to MongoDB with proper error handling
connectDB()
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);
  });
});

// ✅ Import routes (Pass `io` directly where needed)
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const claimRoutes = require("./routes/claimRoutes")(io); // Pass `io` only once

// ✅ Use Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/claim", claimRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
