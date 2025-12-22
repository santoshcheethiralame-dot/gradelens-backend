import express from 'express';
import cors from 'cors'; //allows frontend to communicate with backend

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
  res.send('GradeLens Backend is running');
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "GradeLens backend" });
});


export default app;