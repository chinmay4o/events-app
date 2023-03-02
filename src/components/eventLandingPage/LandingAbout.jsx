import React from 'react'

const LandingAbout = ({ singleEvent }) => {
  return (
    <div className='text-#1C1C1E sm:text-base font-normal text-base'>
      {singleEvent.shortDescription}  
    </div>
  )
}

export default LandingAbout