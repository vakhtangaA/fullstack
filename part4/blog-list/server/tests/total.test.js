const config = require("../utils/config");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const listHelper = require("../utils/list_helper");

beforeAll(async () => {
	connection = await mongoose.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
	db = mongoose.connection;
});

afterAll(async () => {
	await db.close();
});

describe("total likes", () => {
	test("sum of likes is 703", async () => {
		const response = await Blog.find({});
		const result = listHelper.totalLikes(response);
		expect(result).toBe(703);
	});
});

describe("favorite blog", () => {
	const mostLoved = {
		_id: "60633b594780df85d2171090",
		title: "PHP",
		author: " Rasmus Lerdorf",
		url:
			"https://thenewstack.io/php-creator-rasmus-lerdorf-shares-lessons-learned-from-the-last-25-years/",
		likes: 301,
		__v: 0,
	};
	test("sum of likes is 703", async () => {
		const response = await Blog.find({});
		const result = listHelper.favoriteBlog(response);
		expect(JSON.stringify(result)).toEqual(JSON.stringify(mostLoved));
	});
});
