import { auth } from '@/auth';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image'
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;

const page = async ({ params }: { params: { id: string }}) => {

    const id = (await params).id;
    const session = await auth();
    
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    if(!user) return notFound();



  return (
    <>
    <section className=' flex flex-col md:flex-row gap-8 px-6 py-4 xl:px-32 my-12 h-screen'>
        {/* -------PROFILE DETAILS-------- */}
        <div className='relative flex flex-col border-black border-4 border-r-8 border-b-8 gap-8 justify-center items-center px-12 bg-[#EE2B69] rounded-4xl max-h-110'>
            
            <div className='absolute z-10 w-[90%] px-2 py-4 border-5 border-r-8 border-b-8 border-black rounded-3xl bg-white top-[-30px]'>
                <p className={`font-extrabold text-xl xs:text-2xl text-center tracking-tight line-clamp-1`}>{user?.name}</p>
            </div>
            <Image src={user?.image} alt={user?.name} width={220} height={220} className='mt-20 rounded-full border-2 border-black'/>
            <p className='font-bold text-white text-3xl line-clamp-1 my-6'>@{user?.username}</p>

        </div>
        {/* -------STARTUP DETAILS-------- */}
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='text-3xl font-bold '>{ session?.id == id ? "Your Startups" : "All Startups" }</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UserStartups id={id}/>
            </div>


        </div>
    </section>
      
    </>
  )
}

export default page
