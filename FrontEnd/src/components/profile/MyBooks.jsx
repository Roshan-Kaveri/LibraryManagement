import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import BookGrid from "../book/BookGrid";

const MyBooks = ({user}) => {
    
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(() => {
        const fetchBooks = async () => {
            if (user && user.userId) {
                try {
                    console.log(user);

                    const response = await fetch('https://libbackend.hmmbo.com/api/my-books', {
                        method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.userId, 
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setBooks(data.books);
                    console.log(data);

                } catch (error) {
                    console.error("Error fetching books:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBooks();
    }, [user]);

    return (
        <div>
            <div className="mt-6">
                <BookGrid books={books} />
                {isLoading && <p className="text-center text-gray-500">Loading...</p>}
            </div>
        </div>
    );
};

export default MyBooks;
