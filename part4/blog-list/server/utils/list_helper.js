const totalLikes = blogs => {
	let totalLikes = 0;
	blogs.forEach(blog => {
		totalLikes += blog.likes;
	});
	return totalLikes;
};

const favoriteBlog = blogs => {
	let likes = 0;
	let favoriteBlogIndex;

	blogs.forEach((blog, index) => {
		if (blog.likes > likes) {
			likes = blog.likes;
			favoriteBlogIndex = index;
		}
	});

	return blogs[favoriteBlogIndex];
};

module.exports = {
	totalLikes,
	favoriteBlog,
};
