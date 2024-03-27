import dotenv from "dotenv";
import express from "express";
import router from "./routes.mjs";

dotenv.config();

const app = express();

if (process.env.DEVELOPMENT) {
  app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:5500", "http://127.0.0.1:5173"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
  });
}

// app.use("/api", require("./routes"));
app.use("/api", router);

app.use(express.static("dist"));

app.get('*', (_, res) => { res.redirect('/') });

app.listen(3000, () => {
  console.log(
    "Listening on post 3000. Need to start SQL Server Browser service!!!"
  );
});
