import React from 'react'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello, Tailwind CSS!
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Your React app with Tailwind CSS is working perfectly.
      </p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Click Me
      </button>
    </div>
  )
}
