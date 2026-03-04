import { useParams } from "react-router-dom";
import { directors } from "../data/directors";

const MovieCard = () => {
  const { id, movieId } = useParams();
  const director = directors[id];

  if (!director) return <h2>Movie not found</h2>;

  const movie = director.movies.find((m) => m.id === movieId);
  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p className="movie-title">{movie.title}</p>
      <p>Duration: {movie.time} minutes</p>
      <p>{movie.genres.join(", ")}</p>
    </div>
  );
};

export default MovieCard;