import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		fetch("/api/blogs")
			.then(res => res.json())
			.then(data => setBlogs(data));
	}, []);

	const blogsIsEmpty = <h1>Loading...</h1>;
	let blogsIsntEmpty;

	function handleClick(event) {
		const index = event.target.parentElement.getAttribute("index");
		const id = event.target.getAttribute("id");
		const _id = event.target.getAttribute("_id");

		const updatedBlog = blogs[index];
		const currBlogs = [...blogs];

		if (id === "upvote") {
			updatedBlog.likes++;
		} else if (id === "downvote") {
			updatedBlog.likes--;
		}

		currBlogs[index] = updatedBlog;

		setBlogs(currBlogs);

		axios.put(`/${_id}`, updatedBlog);
	}

	async function handleDlt(event, updateState) {
		const id = event.target.getAttribute("_id");
		await axios.delete(`/${id}`);

		fetch("/api/blogs")
			.then(res => res.json())
			.then(data => setBlogs(data));
	}

	if (blogs) {
		blogsIsntEmpty = blogs.map((item, index) => {
			const { _id, title, author, url, likes } = item;
			return (
				<div key={_id} className="blog" index={index}>
					<h2>{title}</h2>
					<h3>{author}</h3>
					<a href={url}>
						reading link with{" "}
						<strong>
							<i>{author}</i>
						</strong>
					</a>
					<p>likes: {likes}</p>
					<button
						_id={_id}
						id="upvote"
						className="btn"
						onClick={handleClick}
					>
						Upvote
					</button>
					<button
						_id={_id}
						id="downvote"
						className="btn"
						onClick={handleClick}
					>
						Downvote
					</button>
					<button
						_id={_id}
						className="btn dltBtn"
						onClick={handleDlt}
					>
						Delete
					</button>
					<hr />
				</div>
			);
		});
	}

	return <div>{blogs ? blogsIsntEmpty : blogsIsEmpty}</div>;
}

export default App;
