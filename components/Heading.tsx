import React from 'react'

type HeadingProps = {
    text1?: string
    text2?: string

}

const Heading = ({text1 = "", text2 = ""} : HeadingProps) => {
  return (
    <div className='bg-black px-6 py-3 max-w-5xl text-center mt-2'>
      <h1 className='font-work-sans font-extrabold text-white uppercase sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px]'>
        {text1} 
        <br />
        {text2}
        </h1>
    </div>
  )
}

export default Heading
