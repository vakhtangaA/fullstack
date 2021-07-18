const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
	const body = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	if (body.username.length < 3 || body.password.length < 3) {
		return response.status(400).json({
			error: "invalid username or password. both need to be at least three characters long",
		});
	} else {
		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		});

		const savedUser = await user.save();
		response.json(savedUser);
		response.end();
	}
});

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs");
	response.json(users);
	response.end();
});
module.exports = usersRouter;
