const Report = require("./Report");
const fs = require("fs");

function getDate(date) {
  return {
    date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
    time: `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`,
  };
}

function createLogData(restData, timeData) {
  return { ...restData, ...timeData };
}

function createLogFile(fileName, logData) {
  fs.writeFileSync(fileName, JSON.stringify(logData));
}

async function sendReportToDB(logData) {
  return await Report.create(logData);
}

function responseForClient(res, logData) {
  if (logData.status) {
    res.status(200).json({ reversedRow: logData.result });
  } else {
    res.status(401).json({
      text: "The passed string is not a Fibonacci sequence. Pass a string in the following format: '0,1,1,2,3,5,8,13,21'. Minimum 3 numbers required",
      row: `You passed: '${logData.requestBody.row}'`,
    });
  }
}

function createReport(req, res) {
  const { restData } = req;

  const currentDate = getDate(new Date());

  const logData = createLogData(restData, currentDate);

  createLogFile(
    `reportsStore/Report on ${currentDate.date}.${currentDate.time}.json`,
    logData,
  );

  sendReportToDB(logData).catch((err) => {
    res.status(500).send("Something went wrong!" + err);
  });

  responseForClient(res, logData);
}

module.exports = { createReport };
