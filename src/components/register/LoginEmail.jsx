import React from 'react';
import { ReactComponent as BookIcon } from '../login/assets/BookSVG.svg'
import { Link } from 'react-router';

export default function Bookssvg() {
  return (
    <div className='flex flex-col justify-center items-center mb-24'>
        <div className='flex flex-[3]'></div>
        <BookIcon className="w-42" />
      <h1 className=''>Already have an Account?</h1>
      <Link to='/login'>
      <button
        type="submit"
        className="w-32 h-10 bg-greenish border border-blueish rounded-md text-blueish font-bold hover:bg-[#117060] transition-all"
      >
        Login
      </button>
      </Link>
    </div>
  );
}
