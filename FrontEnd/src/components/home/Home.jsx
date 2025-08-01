import React, { useEffect, useState } from "react";
import BookGrid from "../book/BookGrid";
import { jwtDecode } from "jwt-decode";
import NavBar from "../navbar/NavBar";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    rating: "",
    publishedYear: "",
    category: "",
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchBooks = async (page, filters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page, ...filters });
      const response = await fetch(
        `http://library-management-h7qr.vercel.app/api/books?${params.toString()}`
      );
      const data = await response.json();
      if (response.ok) {
        if (page === 1) {
          setBooks(data.books);
        } else {
          setBooks((prevBooks) => [...prevBooks, ...data.books]);
        }
      } else {
        console.error("Error fetching books:", data.error);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const { userId } = decoded;
      setUser({ userId });
    }
  }, []);

  useEffect(() => {
    if (page === 1) {
      setBooks([]);
    }
    fetchBooks(page, filters);
  }, [page, filters]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !isLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1);
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-greenish">
          Welcome to the Book Library
        </h1>
      </div>

      <div className="flex justify-center gap-1 lg:gap-4 mt-6">
        <input
          type="text"
          name="title"
          placeholder="Search by Title"
          className="border px-3 py-2 rounded w-64 lg:w-96 ml-2 border-greenish"
          onChange={handleFilterChange}
          value={filters.title}
        />

        <button
          className="border px-3 py-2 rounded bg-greenish text-blueish"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
      </div>

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
