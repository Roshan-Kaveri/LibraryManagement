import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="mb-8">
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </li>
        </ul>
      </nav>
  )
}
