import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDirector = () => {
  const [name, setName] = useState("");  // State for the director's name
  const [bio, setBio] = useState("");    // State for the director's bio
  const navigate = useNavigate();       // Hook to navigate after director is added

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submit behavior

    const newDirector = {
      name,
      bio,
      movies: []  // Assuming new directors start without movies
    };

    fetch("http://localhost:4000/directors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDirector),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add director");
        }
        return response.json();
      })
      .then((data) => {
        // Navigate to the new director's page after successful addition
        navigate(`/directors/${data.id}`);
      })
      .catch((error) => {
        console.error(error);  // Handle error appropriately
      });
  };

  return (
    <div>
      <h2>Add New Director</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Director's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Director's Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <button type="submit">Add Director</button>
      </form>
    </div>
  );
};

export default AddDirector;