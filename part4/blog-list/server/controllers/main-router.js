const mainRouter = require("express").Router();
const Blog = require("../models/blog");

mainRouter.delete("/:id", (request, response, next) => {
	Blog.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch(error => next(error));
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
