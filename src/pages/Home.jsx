import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main>
      <h1>🎬 Welcome to the Movie Directory 🎥</h1>
      <p>Explore a collection of famous directors and their iconic movies. Click below to start!</p>
      <nav>
        <Link to="/directors">View Directors</Link> |{" "}
        <Link to="/about">Learn More About This App</Link>
      </nav>
    </main>
  )
}

export default Home