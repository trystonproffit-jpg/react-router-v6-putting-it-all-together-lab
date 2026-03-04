import { Link } from "react-router-dom"

const Directors = () => {
  const directors = [
    { id: 1, name: "Christopher Nolan" },
    { id: 2, name: "Quentin Tarantino" },
    { id: 3, name: "Sofia Coppola" },
  ]

  return (
    <main>
      <h1>Directors</h1>
      <nav>
        <Link to="add">Add New Director</Link>
      </nav>
      <ul>
        {directors.map((director) => (
          <li key={director.id}>
            <Link to={`${director.id}`}>{director.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Directors