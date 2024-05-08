import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col gap-3'>
        <hr className='h-6 bg-gradient-to-r from-violet-400 via-blue-600 to-violet-400 border-none rounded-sm'/>
        <hr className='h-6 bg-gradient-to-r from-blue-500 via-violet-400 to-blue-500 border-none rounded-sm'/>
        <hr className='h-6 bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500 border-none rounded-sm'/>
    </div>
  )
}

export default Loader