const { Router } = require("express");
const { createReport } = require("./reportsController");
const { fibonacciReverse } = require("../middlewares/middlewares");

const reportRouter = Router();

reportRouter.post("/", fibonacciReverse, createReport);

module.exports = reportRouter;
