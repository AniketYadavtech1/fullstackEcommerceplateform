const { Pool } = require("pg");
const path = require("path");

// Load .env from backend folder or current working directory
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
require("dotenv").config();

if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
    console.warn("⚠️ WARNING: No DB_HOST or DATABASE_URL found in process.env! Render Environment Variables might be missing.");
}

const poolConfig = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false }
      }
    : {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || 5432),
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          ssl: { rejectUnauthorized: false }
      };

const pool = new Pool(poolConfig);

pool.on("connect", () => {
    console.log(" Connected to Supabase PostgreSQL successfully!");
});

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});

module.exports = pool;
