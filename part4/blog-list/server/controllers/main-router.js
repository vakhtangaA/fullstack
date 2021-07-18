const mainRouter = require("express").Router();
const Blog = require("../models/blog");

mainRouter.delete("/:id", async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id);

	try {
		response.status(204).end();
	} catch (err) {
		return console.error(err);
	}
});

mainRouter.put("/:id", (request, response) => {
	Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		function (err, blog) {
			if (err) {
				return console.log(err);
			}
			response.send(blog);
		}
	);
});

module.exports = mainRouter;
