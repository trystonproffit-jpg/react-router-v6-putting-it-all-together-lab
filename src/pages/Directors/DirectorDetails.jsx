import { useParams, Link, Outlet } from "react-router-dom";
import { directors } from "../../data/directors";

const DirectorDetails = () => {
  const { id } = useParams();
  const director = directors[id];

  if (!director) return <h2>Director not found</h2>;

  return (
    <div>
      <h2>{director.name}</h2>
      <p>{director.bio}</p>

      <h3>Movies:</h3>
      <ul>
        {director.movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/directors/${id}/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>

      <Link to={`/directors/${id}/movies/new`}>Add Movie</Link>

      <Outlet />
    </div>
  );
};

export default DirectorDetails;