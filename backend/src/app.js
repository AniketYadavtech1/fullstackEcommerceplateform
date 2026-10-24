const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const pool = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "E-Commerce API is running"
    });
});

// Test Database connection
app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            success: true,
            message: "Database connection successful",
            time: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message,
            code: error.code,
            details: error.detail || null
        });
    }
});

// Product API
app.use("/api/products", productRoutes);

module.exports = app;
