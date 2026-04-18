import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("TypeScript Docker 🚀");
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.listen(3000, () => {
  console.log("Server runningg");
});