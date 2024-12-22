import React from "react"
import { Link } from "react-router";

const LinkButton = ({link, text}) => {
  return (
    <div>
      <Link
  to={link} 
  className='flex justify-center md:hidden'
>
  <button
    type="submit"
    className="w-80 h-12 bg-greenish border border-blueish rounded-md text-blueish font-bold hover:bg-[#117060] transition-all"
  >
    {text}
  </button>
</Link>

    </div>
  )
};

export default LinkButton;
