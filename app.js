const express = require("express");
const essaysRouter = require("./src/routes");
const { createError, initialize } = require("./src/api");

const app = express();
app.use(express.json());

const STATUS_OK = 200;

app.get("/init", async (req, res, next) => {
  try {
    await initialize();
  } catch (error) {
    createError(500, error.message, next);
    return;
  }
  res.status(STATUS_OK).json("ok");
});

app.use("/essays", essaysRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else {
    console.error(err);
    res.status(err.status || 500);
    res.send("an error occured");
  }
});

module.exports = app;
