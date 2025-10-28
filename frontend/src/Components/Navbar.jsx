import React from 'react'
import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-300 p-4'>
      <div className='flex justify-between items-center m-auto max-w-7xl'>
        <p className='font-mono font-extrabold text-3xl'>ThinkBoard</p>
        <Link to='/create'>
          <button className='btn btn-primary flex items-center'><CirclePlus style={{ height: "18px", width: "18px" }} />Create</button>
        </Link>
      </div>

    </header>
  )
}

export default Navbar