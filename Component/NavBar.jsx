import React,{useState} from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#5F99D8] px-5 py-4 shadow-md">
        <div className='flex justify-between items-center'>
            <div className='flex items-center shrink-0'>
            <img
            src='/Blogo.png' 
            alt='Logo'
            className='w-32 h-20 sm:w-40 sm:h-24 object-contain'
            />
            </div>
            <div className='hidden lg:flex items-center gap-8 font-bold text-lg xl:text-xl text-white'>

                <Link to='/' className='hover:text-gray-200 transition'>
                Home   
                </Link>

                <Link to='/about' className='hover:text-gray-200 transition'>
                About Us
                </Link>

                <Link to='/program' className='hover:text-gray-200 transition'>
                Programs
                </Link>

                <Link to='/services' className='hover:text-gray-200 transition'>
                Our Services
                </Link>

                <Link to='/gallery' className='hover:text-gray-200 transition' target='_blank'>
                Gallery
                </Link>

                <Link to='/blog' className='hover:text-gray-200 transition'>
                Blog
                </Link>

                <Link to='/contact' className='hover:text-gray-200 transition'>
                Contact Us
                </Link>

            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className='lg:hidden text-3xl text-white focus:outline-none'
                aria-label='Toggle Menu'
            >
                {isOpen ? '✖' : '☰'}
            </button>
        </div>

        {isOpen && (
            <div className='lg:hidden mt-4 bg-blue-500 rounded-lg px-5 py-4'>
            <div className='flex flex-col gap-4 font-bold text-lg text-white'>
                <a href='#home'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                Home   
                </a>

                <a href='#about'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                About Us
                </a>

                <a href='#programs'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                Programs
                </a>

                <a href='#services'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                Our Services
                </a>

                <a href='#gallery'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                Gallery
                </a>

                <a href='#blog'
                onClick={()=> setIsOpen(false)}
                className='hover:text-gray-200'>
                    Blog
                </a>
                
                <a href='#contact'
                onClick={() => setIsOpen(false)}
                className='hover:text-gray-200'>
                Contact Us
                </a>
            </div>

            </div>

        )}
      
    </nav>
  )
}
