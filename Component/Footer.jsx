import React from 'react'
import { FaEnvelope, FaFacebookF, FaInstagram, FaLocationDot, FaPhone, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-[#5F99D8] text-white'>

        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14
        sm:grid-cols-2 lg:grid-cols-4 lg:px-10'>

            {/* School information */}

            <div>
                <h2 className='mb-4 text-2xl font-extrabold'>
                    BEULAH <span className='text-lg block font-semibold'>CATERING SCHOOL</span>
                </h2>
                <p className='max-w-sm leading-7 text-white/90'>
                    We are dedicated to providing affordable, flexible, and professional culinary training that transforms passion into professional excellence.
                </p>

                <div className='mt-5 flex gap-4'>
                    <a href='https://facebook.com/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Facebook'
                    className='rounded-full bg-white/15 p-3 transition hover:bg-white hover:text-blue-600'>
                        <FaFacebookF/>
                    </a>

                    <a href='https://instagram.com/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Instagram'
                    className='rounded-full bg-white/15 p-3 transition hover:bg-whie hover:text-blue-600'>
                        <FaInstagram/>
                    </a>

                    <a href='https://tiktok.com/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Tiktok'
                    className='rounded-full bg-white/15 p-3 transition hover:bg-white hover:text-blue-600'>
                        <FaTiktok/>
                    </a>

                    <a href='https://wa.me/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='WhatsApp'
                    className='rounded-full bg-white/15 p-3 trnsition hover:bg-white hover:text-blue-600'>
                        <FaWhatsapp/>
                    </a>
                </div>
            </div>

            {/* quick links */}

            <div>
                <h3 className='mb-5 text-xl font-bold'>Quick Links</h3>

                <ul className='space-y-3 text-white/90'>

                    <li><Link to='/' className='hover:text-gray-200'>Home</Link></li>

                    <li><Link to='/about' className='hover:text-gray-200'>About Us</Link></li>

                    <li><Link to='/program' className='hover:text-gray-200'>programs</Link></li>

                    <li><Link to='/services' className='hover:text-gray-200'>Our Services</Link></li>

                    <li><Link to='/gallery' className='hover:text-gray-200'>Gallery</Link></li>

                    <li><Link to='/contact' className='hover:text-gray-200'>Contact Us</Link></li>
                </ul>
            </div>

            {/* programs */}

            <div>
                <h3 className='mb-5 text-xl font-bold'>Our Programs</h3>
                <ul className='space-y-3 text-white/90'>

                <li>
                    <Link to='/program/three-weeks'className='hover:text-gray-900'>Three Weeks Culinary Class</Link>
                </li>
                <li>
                    <Link to='/program/four-weeks'className='hover:text-gray-900'>Four Weeks Culinary Class</Link>
                </li>
                <li>
                    <Link to='/program/three-months'className='hover:text-gray-900'>Three Months Culinary Class</Link>
                </li>
                <li>
                    <Link to='/program/Four-months'className='hover:text-gray-900'>Four Months Culinary Class</Link>
                </li>
                <li>
                    <Link to='/program/Six-months'className='hover:text-gray-900'>Six Months Culinary Class</Link>
                </li>
                </ul>
            </div>

            {/* contact information */}

            <div>
                <h3 className='mb-5 text-xl font-bold'>Contact Information</h3>
                <ul className='space-y-4 text-white/90'>
                    <li className='flex items-start gap-3'>
                        <FaPhone className='mt-1 shrink-0'/>
                        <span>+2347085034895  & +2348065293808 </span>

                    </li>

                    <li className='flex items-start gap-3'>
                        <FaEnvelope className='mt-1 shrink-0'/>
                        <span>pleasantjoy4rev@gmail.com</span>
                        

                    </li>

                    <li className='flex items-start gap-3'>
                        <FaLocationDot className='mt-1 shrink-0'/>
                        <span>125 New Umuahia Road, Umuokahia, Aba, Abia State, Nigeria.</span>

                    </li>
                </ul>
            </div>
        </div>

        {/* copywrite */}

        <div className='border-t border-white/25 px-5 py-5 text-center text-sm
         text-white/90'>
            <p>
                © {new Date().getFullYear()} Beulah Catering School. All rights reserved.
            </p>
        </div>
    </footer>
  )
}
