import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

const API_URL =
	'https://react-api-http-requests-default-rtdb.asia-southeast1.firebasedatabase.app/movies';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [retry, setRetry] = useState(true);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		setRetry(true);

		try {
			const response = await fetch(`${API_URL}.json`);
			console.log(response.status);

			if (!response.ok) {
				throw new Error('Something Went Wrong... Retrying');
			}

			const data = await response.json();
			const loadedMovies = [];

			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}
			// const transformedMovies = await loadedMovies.map((movieData) => {
			// 	return {
			// 		id: movieData.episode_id,
			// 		title: movieData.title,
			// 		openingText: movieData.opening_crawl,
			// 		releaseDate: movieData.release_date,
			// 	};
			// });
			setMovies(loadedMovies);
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
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const cancelRetry = () => {
		setRetry(false);
		console.log(retry);
	};

	const addMovieHandler = useCallback(async (movie) => {
		// console.log(movie);
		const response = await fetch(`${API_URL}.json`, {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = response.json();
		console.log(data);
	}, []);

	const deleteMoviesHandler = async (id) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`${API_URL}/${id}.json`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log('Delete', response.status);

			setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

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
		content = <MoviesList movies={movies} onDelete={deleteMoviesHandler} />;
	}
	if (error) {
		content = <p>{error}</p>;
	}

	return (
		<React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
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
