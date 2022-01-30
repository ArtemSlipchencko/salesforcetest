const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const reportRouter = require("./reports/reportsRouter");

dotenv.config();

const uriDb = process.env.DB_URI;

const PORT = process.env.PORT || 5500;

class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.connectToDb();
    this.listen();
  }

  connectToDb() {
    mongoose
      .connect(uriDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("DB connected");
      })
      .catch((err) => console.log(`DB not connected. Error: ${err}`));
  }

  initMiddlewares() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use("/fibonacci", reportRouter);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

const server = new Server();

server.start();
