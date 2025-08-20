import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const StartupCard = ({post} : {post: StartupCardType}) => {
  return (
    <div className='bg-white w-sm sm:w-xs flex flex-col gap-2 border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-[#EE2B69] transition-all duration-500 hover:shadow-300 changeBg'>
        <div className='flex justify-between items-center mb-4'>
            <p className='chlidBg rounded-2xl py-2 px-2 text-sm font-medium'>{ formatDate(post._createdAt) }</p>
            <div className='flex gap-2'>
                <EyeIcon className='text-red-400 size-6'/>
                <p>{post?.views}</p>
            </div>
        </div>
        <div className='flex justify-between'>
            <div className='flex flex-col gap-1'>
                <Link href={`/user/${post.aurthor?._id}`}>
                    <p className='text-md font-medium line-clamp-1'>{post?.aurthor?.name}</p>
                </Link>
                <Link href={`/startup/${post._id}`}>
                    <p className='font-bold text-2xl line-clamp-1'>{post?.title}</p>
                </Link>
            </div>
            <Link href={`/user/${post.aurthor?._id}`}>
                <img src={"https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=is&k=20&c=0nUqNCdx5lQnefamkMzDW5OD_8jMpsGVQdv7TOVL0UI="} alt="image of the aurthor" className='rounded-full w-12 h-12'/>
            </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
        <div className='text-gray-600 mb-4'>{post.description}</div>
        <img src={post.image} alt="WallE image" className='rounded-md w-full border-2 border-black' />
        </Link>
        <div className='flex justify-between items-center mt-4'>
            <Link href={`/?query=${(post.category).toLowerCase()}`}>
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
