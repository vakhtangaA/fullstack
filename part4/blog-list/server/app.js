require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then(blogs => {
		response.json(blogs);
	});
});

app.post("/api/blogs", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then(result => {
		response.status(201).json(result);
	});
});

module.exports = app;
