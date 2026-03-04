import { Link } from "react-router-dom";

const DirectorCard = ({ director }) => {
    // Check if director is provided; if not, show "Director not found"
    if (!director) {
        return <h2>Director not found.</h2>;
    }

    return (
        <div>
            <h2>{director.name}</h2>
            <p>{director.bio}</p>
            <h3>Movies:</h3>
            {director.movies && director.movies.length > 0 ? (
                <ul>
                    {director.movies.map((movie) => (
                        <li key={movie.id}>
                            <Link to={`/directors/${director.id}/movies/${movie.id}`}>
                                {movie.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies available</p> // Fallback if no movies are available
            )}
            <Link to={`/directors/${director.id}/movies/new`}>Add New Movie</Link>
        </div>
    );
};

export default DirectorCard;