import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

const AddMovie = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`New Movie "${title}" added for director ${id}`)
        navigate(`/directors/${id}`)
    }

    return (
        <main>
            <h1>Add New Movie</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Movie Title:
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add New Movie</button>
            </form>
        </main>
    )
}

export default AddMovie