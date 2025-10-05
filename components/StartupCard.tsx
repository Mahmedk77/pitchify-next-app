import { formatDate } from '@/lib/utils'
import { Author, Startup } from '@/sanity/types'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type StartupCardType = Omit<Startup, "author"> & { author?: Author }


const StartupCard = ({post} : {post: StartupCardType}) => {
  return (
    <div className='bg-white w-full flex flex-col gap-0 sm:gap-2 border-[5px] border-black border-r-[10px] border-b-[8px] py-4 px-5 rounded-[26px] shadow-200 hover:border-[#EE2B69] transition-all duration-500 hover:shadow-300 hover:bg-[#FFE8F0]'>
        <div className='flex justify-between items-center mb-2'>
            <p className='text-md'>{ formatDate(post._createdAt) }</p>
            <div className='flex gap-2'>
                <EyeIcon className='text-red-400 size-6'/>
                <p>{post?.views}</p>
            </div>
        </div>
        <div className='flex justify-between'>
            <div className='flex flex-col gap-1'>
                <Link href={`/user/${post.author?._id}`}>
                    <p className='text-md font-medium line-clamp-1'>{post?.author?.name}</p>
                </Link>
                <Link href={`/startup/${post._id}`}>
                    <p className='font-bold text-2xl line-clamp-1'>{post?.title}</p>
                </Link>
            </div>
            <Link href={`/user/${post.author?._id}`}>
                <img src={post?.author?.image!} alt="image of the aurthor" className='rounded-full border w-12 h-12'/>
            </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
        <div className='text-gray-600 my-1 sm:mb-4'>{(post.description)?.slice(0,35) + "...."}</div>
        
        <img src={post.image} alt="WallE image" className='rounded-md w-full h-50 border-2' />
        </Link>
        <div className='flex justify-between items-center mt-4'>
            <Link href={`/?query=${(post?.category)?.toLowerCase()}`}>
                <p className='font-semibold text-lg'>{post?.category}</p>
            </Link>
            <Link href={`/startup/${post._id}`}>
                <button className='bg-black px-4 py-2 text-white rounded-full'>Details</button>
            </Link>
        </div>
      
    </div>
  )
}

export default StartupCard
