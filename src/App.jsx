import { Routes, Route, BrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

import Directors from "./pages/Directors/Directors";
import AddDirector from "./pages/Directors/AddDirector";
import DirectorDetails from "./pages/Directors/DirectorDetails";
import AddMovie from "./pages/Directors/AddMovie";
import MovieCard from "./pages/MovieCard";

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="directors" element={<Directors />} />
      <Route path="directors/new" element={<AddDirector />} />

      <Route path="directors/:id" element={<DirectorDetails />}>
        <Route path="movies/new" element={<AddMovie />} />
        <Route path="movies/:movieId" element={<MovieCard />} />
      </Route>
    </Route>
  </Routes>
</BrowserRouter>
);

export default App;