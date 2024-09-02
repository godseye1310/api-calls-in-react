import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
	const onDelete = (id) => {
		props.onDelete(id);
	};

	return (
		<ul className={classes['movies-list']}>
			{props.movies.map((movie) => (
				<Movie
					key={movie.id}
					id={movie.id}
					title={movie.title}
					releaseDate={movie.releaseDate}
					openingText={movie.openingText}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
};

export default MovieList;
