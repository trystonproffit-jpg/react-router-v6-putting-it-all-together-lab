import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const AddMovie = () => {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`New movie "${title}" added for director ${id}`)
    navigate(`/directors/${id}`)
  }

  return (
    <main>
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </main>
  )
}

export default AddMovie