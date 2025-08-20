"use client"
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const QueryReset = () => {

  const handleReset = () => {
    const form = document.querySelector('#search-form') as HTMLFormElement;
    if (form) form.reset();
  }
  return ( 
        <button type='reset' onClick={handleReset} className='cursor-pointer bg-black rounded-full w-[40px] h-[40px] flex items-center justify-center'>
          <Link href={'/'}>
            <X className='size-5 text-white'/>
          </Link>
        </button>   
      )
    }
    
export default QueryReset
{/* <div className='absolute flex items-center justify-center right-[65px] top-[10px] bg-black w-[40px] h-[40px] rounded-full'>
  </div> */}