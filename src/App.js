import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [retry, setRetry] = useState(true);

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

	let content = <p>No Movies Found</p>;
	if (isLoading) {
		content = loadScreen;
	}
	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}
	if (error) {
		content = <p>{error}</p>;
	}

	async function fetchMoviesHandler() {
		setIsLoading(true);
		setError(null);
		setRetry(true);

		try {
			const response = await fetch('https://swapi.dev/api/films/');
			console.log(response.status);

			if (!response.ok) {
				throw new Error('Something Went Wrong... Retrying');
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
			setRetry(false);
			// setIsLoading(false);
		} catch (error) {
			setError(error.message);
			// console.log(error.message);
			setTimeout(() => {
				setRetry((prevTry) => {
					if (prevTry) {
						fetchMoviesHandler();
					}
					return prevTry;
				});
			}, 5000);
		}
		setIsLoading(false);
	}

	const cancelRetry = () => {
		console.log(retry);
		setRetry(false);
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
				<br />
				<br />
				<button onClick={cancelRetry}>Cancel</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;

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
