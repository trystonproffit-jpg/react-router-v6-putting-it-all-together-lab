import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

// Create a wrapper component that provides router context
const renderWithRouter = (component, initialRoute = '/') => {
  window.history.pushState({}, '', initialRoute)
  
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: "1",
            name: 'Christopher Nolan',
            bio: 'Director of mind-bending films.',
            movies: [{ id: 'm1', title: 'Inception', time: 148, genres: ['Sci-Fi', 'Thriller'] }],
          },
        ],
      })
    }
  })
  window.history.pushState({}, '', '/')
})

describe('🎬 Movie Directory App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    renderWithRouter(<App />)
    expect(await screen.findByText(/Welcome to the Movie Directory/i)).toBeInTheDocument()
  })

  it('navigates to About page when clicking About link', async () => {
    renderWithRouter(<App />)
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
  
    const aboutLink = within(navbar).getByRole('link', { name: /^About$/i })
    fireEvent.click(aboutLink)
  
    await waitFor(() => {
      expect(screen.getByText(/About the Movie Directory/i)).toBeInTheDocument()
    })
  })

  it('displays directors list at "/directors"', async () => {
    renderWithRouter(<App />, '/directors')
    expect(await screen.findByText(/Christopher Nolan/i)).toBeInTheDocument()
  })

  it('navigates to DirectorForm on "/directors/new"', async () => {
    renderWithRouter(<App />, '/directors/new')
    expect(await screen.findByText(/Add New Director/i)).toBeInTheDocument()
  })

  it('navigates to a specific DirectorCard page', async () => {
    renderWithRouter(<App />, '/directors/1')
    expect(await screen.findByText(/Director of mind-bending films/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Inception/i })).toBeInTheDocument()
  })

  it('navigates to MovieForm at "/directors/1/movies/new"', async () => {
    renderWithRouter(<App />, '/directors/1/movies/new')
    
    // Fixed: Properly check for 2 instances of "Add New Movie"
    const elements = await screen.findAllByText(/Add New Movie/i)
    expect(elements.length).toBe(2)
  })

  it('renders MovieCard details correctly', async () => {
    renderWithRouter(<App />, '/directors/1/movies/1')
    
    // Fixed: Look for the heading specifically instead of relying on array index
    const movieHeading = await screen.findByRole('heading', { name: /Inception/i })
    expect(movieHeading).toBeInTheDocument()
    expect(await screen.findByText(/Duration: 148 minutes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sci-Fi, Thriller/i)).toBeInTheDocument()
  })

  it('handles invalid director ID gracefully', async () => {
    renderWithRouter(<App />, '/directors/999')
    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument()
  })

  it('handles invalid movie ID gracefully', async () => {
    renderWithRouter(<App />, '/directors/1/movies/invalid')
    expect(await screen.findByText(/Movie not found/i)).toBeInTheDocument()
  })
})