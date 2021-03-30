import React, { useState, useEffect } from "react";

function App() {
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		fetch("/api/blogs")
			.then(res => res.json())
			.then(data => setBlogs(data));
	}, []);

	const blogsIsEmpty = <h1>Loading...</h1>;
	let blogsIsntEmpty;

	if (blogs) {
		blogsIsntEmpty = blogs.map(item => {
			const { _id, title, author, url, likes } = item;
			return (
				<div key={_id}>
					<h2>{title}</h2>
					<h3>{author}</h3>
					<a href={url}>
						reading link with{" "}
						<strong>
							<i>{author}</i>
						</strong>
					</a>
					<p>likes: {likes}</p>
					<hr />
				</div>
			);
		});
	}

	return <div>{blogs ? blogsIsntEmpty : blogsIsEmpty}</div>;
}

export default App;
