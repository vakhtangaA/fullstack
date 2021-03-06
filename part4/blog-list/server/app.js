const config = require("./utils/config");
const path = require("path");
const express = require("express");
const blogRouter = require("./controllers/blogs");
const mainRouter = require("./controllers/main-router");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

logger.info("connecting to", config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch(error => {
		logger.error("error connecting to MongoDB: ", error.message);
	});

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/", mainRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
