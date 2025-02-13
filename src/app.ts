import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/main";
import { errorHandler } from "./middleware/errorHandler";
import cronJobForCheckingPromotion from "./cron/cronjob";

const app = express();

dotenv.config();

const port = Number(process.env.PORT);

cronJobForCheckingPromotion();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://192.168.100.")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on PORT : ${port}`);
});
