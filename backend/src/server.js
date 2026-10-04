require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const userRoutes = require("./routes/userRoutes");

const app = express();


connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "AI Interview Simulation API is running"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is connected successfully"
    });
});



const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});