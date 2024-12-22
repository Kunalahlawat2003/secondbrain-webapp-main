import express from "express";
import jwt from "jsonwebtoken";
import {userRouter} from './user';
import { contentRouter } from "./content";
import { LinkRouter } from "./link";
import cors from "cors";
import path from "path";
import axios from "axios";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.options("*", cors());
app.use(cors({
  origin: 'https://secondbrain-webapp-rosy.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use("/api/v1/user", userRouter);

app.use("/api/v1/content", contentRouter);

app.use("/api/v1/link", LinkRouter);

const url = `https://secondbrain-backend-rcc4p0sdc-kunalahlawats-projects.vercel.app/`; // Replace with your Render URL
const interval = 30000; // Interval in milliseconds (30 seconds)

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;