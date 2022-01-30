function reverse(splitedRow) {
  let accum = [];

  for (i = 0; i < splitedRow.length; i++) {
    accum.push(splitedRow[splitedRow.length - 1 - i]);
  }

  return accum.join(",");
}

function getNumbers(originalRow) {
  return originalRow.match(/\d+/g);
}

function isFibonacciRow(splitedRow) {
  if (splitedRow.length < 3) {
    return false;
  }

  for (let i = 0; i <= splitedRow.length - 3; i++) {
    if (+splitedRow[i] + +splitedRow[i + 1] === +splitedRow[i + 2]) {
      continue;
    } else {
      return false;
    }
  }

  return true;
}

function getRestData(req, status, result) {
  return {
    method: req.method,
    url: req.url,
    requestBody: req.body,
    status,
    result,
  };
}

function fibonacciReverse(req, res, next) {
  const { row } = req.body;

  const splitedRow = getNumbers(row);

  req.restData = getRestData(
    req,
    isFibonacciRow(splitedRow),
    reverse(splitedRow),
  );

  next();
}

module.exports = { fibonacciReverse };
