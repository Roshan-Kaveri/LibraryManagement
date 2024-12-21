import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ booktitle, bookauthor, bookdesc, img, bookid, ratings }) => {
    // Fallback for missing ratings
    const ratingStars = ratings !== undefined && ratings !== null ? ratings : '0';
   
    
    return (
      <div className="flex p-2 border  border-greenish shadow-md">
        {/* Image Section */}
        <div className="w-2/6 h-40 overflow-hidden rounded-md">
  <img
    src={img || "https://via.placeholder.com/150"}
    alt={booktitle}
    className="w-full h-full object-cover"
  />
</div>

  
        {/* Details Section */}
        <div className="flex flex-col pt-1  ml-4 w-4/6">
        <div className="flex justify-between">
        <h2 className="text-lg font-bold leading-none">
            <Link to={`/book/${bookid}`} className="hover:underline">
              {booktitle} {/* Title and stars */}
            </Link>
          </h2>
          <h2 className="text-sm font-semibold px-2">{ratingStars}⭐</h2>
        </div>
          
          <p className="text-sm font-semibold text-gray-600">By {bookauthor}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{bookdesc}</p>
  
          <div className="mt-1">
            <Link
              to={`/book/${bookid}`}
              className="text-greenish hover:text-[#13423c] font-semibold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  

export default BookCard;
