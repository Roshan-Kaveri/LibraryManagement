import React, { useEffect, useState } from 'react';
import BookGrid from '../book/BookGrid';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../navbar/NavBar';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ title: '', author: '', rating: '', publishedYear: '', category: '' });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch books from the backend with filters and pagination
  const fetchBooks = async (page, filters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page, ...filters });
      const response = await fetch(`https://libbackend.hmmbo.com/api/books?${params.toString()}`);
      const data = await response.json();
      if (response.ok) {
        if (page === 1) {
          setBooks(data.books); // Reset books when on the first page
        } else {
          setBooks((prevBooks) => [...prevBooks, ...data.books]); // Append books when not the first page
        }
      } else {
        console.error('Error fetching books:', data.error);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };


  
  // Decode token and set user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const { userId } = decoded;
      setUser({ userId });
    }
  }, []);

  useEffect(() => {
    if (page === 1) {
      setBooks([]); // Reset books when page is 1 (to avoid appending on first load with filters)
    }
    fetchBooks(page, filters); // Fetch books whenever page or filters change
  }, [page, filters]);

  // Handle scroll for lazy loading
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10 &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1); // Increase page for pagination
    }
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  // Handle filter updates
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1); // Reset to the first page when filters change
  };

  return (
    <>
    <NavBar></NavBar>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-greenish">Welcome to the Book Library</h1>
      </div>

      {/* Title Search */}
      <div className="flex justify-center gap-1 lg:gap-4 mt-6">
        <input
          type="text"
          name="title"
          placeholder="Search by Title"
          className="border px-3 py-2 rounded w-72 lg:w-96 ml-2 border-greenish"
          onChange={handleFilterChange}
          value={filters.title}
        />
        {/* Filter Button */}
        <button
          className="border px-3 py-2 rounded bg-greenish text-blueish"
          onClick={() => setShowFilters(!showFilters)} // Toggle filter menu
        >
          Filters
        </button>
      </div>

      {/* Filter Menu (Hidden/Shown based on showFilters state) */}
      {showFilters && (
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <input
            type="text"
            name="author"
            placeholder="Filter by Author"
            className="border px-3 py-2 rounded"
            onChange={handleFilterChange}
            value={filters.author}
          />
          <input
            type="text"
            name="rating"
            placeholder="Min Rating"
            className="border px-3 py-2 rounded"
            onChange={handleFilterChange}
            value={filters.rating}
          />
          <input
            type="number"
            name="publishedYear"
            placeholder="Published Year"
            className="border px-3 py-2 rounded"
            onChange={handleFilterChange}
            value={filters.publishedYear}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border px-3 py-2 rounded"
            onChange={handleFilterChange}
            value={filters.category}
          />
        </div>
      )}

      <div className="mt-6">
        <BookGrid books={books} />
        {isLoading && <p className="text-center text-gray-500"></p>}
      </div>
    </>
  );
}
