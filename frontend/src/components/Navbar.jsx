import React from 'react'

function Navbar() {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed'>
        <div className='flex justify-between'>
            <h1 className='text-2xl cursor-pointer font-extrabold'>Word<span className='text-indigo-500 text-3xl'>To</span>PDF<span className='text-3xl text-indigo-500'>Converter</span></h1>
            <h1 className='text-2xl cursor-pointer font-extrabold mt-1 hover:scale-125 duration-300'>Home</h1>
        </div>
    </div>
    </>
  )
}

export default Navbar