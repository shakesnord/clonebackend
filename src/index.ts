import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { EmailRouter } from "./routes/email-routes/email.route";
import { UserRouter } from "./routes/email-routes/user.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", EmailRouter);
app.use("/api", UserRouter);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server is running 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
