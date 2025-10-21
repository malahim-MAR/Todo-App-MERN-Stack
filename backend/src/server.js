import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/api/notes", notesRoutes);
connectDB();

// app.get('/api/notes', (req, res) => {
//     res.send("Running Server Successfully");
// }
// )
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
