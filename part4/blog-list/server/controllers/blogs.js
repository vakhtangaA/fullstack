const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
	const authorization = request.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user");
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	const blog = await new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.json(savedBlog);

	// const usernames = [];

	// async function queryAllUsersNames() {
	// 	const usernames = [];

	// 	await User.find({}, (err, users) => {
	// 		if (err) return err;
	// 		users.forEach(user => {
	// 			usernames.push(user.username);
	// 		});
	// 	});

	// 	const random = Math.floor(Math.random() * usernames.length);
	// 	const randomUserName = usernames[random];

	// 	const randomUser = await User.findOne({ username: randomUserName });

	// const blog = await new Blog({
	// 	title: body.title,
	// 	author: body.author,
	// 	url: body.url,
	// 	likes: body.likes,
	// 	user: randomUser._id,
	// });

	// 	const savedBlog = await blog.save();
	// 	randomUser.blogs = randomUser.blogs.concat(savedBlog._id);
	// 	await randomUser.save();

	// 	response.status(201).json(blog);

	// 	response.end();
	// }

	// queryAllUsersNames();
});

module.exports = blogRouter;
