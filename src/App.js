import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// function fetchMoviesHandler() {
	// 	fetch('https://swapi.dev/api/films/')
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			const transformedMovies = data.results.map((movieData) => {
	// 				return {
	// 					id: movieData.episode_id,
	// 					title: movieData.title,
	// 					openingText: movieData.opening_crawl,
	// 					releaseDate: movieData.release_date,
	// 				};
	// 			});
	// 			setMovies(transformedMovies);
	// 		});
	// }
	const loadScreen = (
		<div>
			<p>Loading Movies...</p>
			<img
				src="https://i.gifer.com/WMDx.gif"
				alt="loading spinner"
				height="30"
				width="30"
			/>
		</div>
	);

	async function fetchMoviesHandler() {
		setIsLoading(true);

		try {
			const response = await fetch('https://swapi.dev/api/films/');

			if (!response.ok) {
				throw new Error('Something Went Wrong...');
			}

			const data = await response.json();

			const transformedMovies = await data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

				{isLoading && loadScreen}
			</section>
		</React.Fragment>
	);
}

export default App;
