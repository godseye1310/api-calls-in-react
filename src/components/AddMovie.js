import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
	const titleRef = useRef('');
	const openingTextRef = useRef('');
	const releaseDateRef = useRef('');

	function submitHandler(event) {
		event.preventDefault();
		// could add validation here...

		const movie = {
			title: titleRef.current.value,
			openingText: openingTextRef.current.value,
			releaseDate: releaseDateRef.current.value,
		};
		console.log(movie);
		props.onAddMovie(movie);

		titleRef.current.value = '';
		openingTextRef.current.value = '';
		releaseDateRef.current.value = '';
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" ref={titleRef} required placeholder="Movie Title" />
			</div>
			<div className={classes.control}>
				<label htmlFor="opening-text">Opening Text</label>
				<textarea
					rows="5"
					id="opening-text"
					ref={openingTextRef}
					required
					placeholder="Movie Description"
				></textarea>
			</div>
			<div className={classes.control}>
				<label htmlFor="date">Release Date</label>
				<input type="date" id="date" ref={releaseDateRef} required />
			</div>
			<button>Add Movie</button>
		</form>
	);
}

export default AddMovie;
