import Heading from '@/components/Heading';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true;


const page = async ({ params }: { params: Promise<{ id: string }>}) => {

    const id = (await params).id;
    console.log(id);
    const post =  await client.fetch(STARTUP_BY_ID_QUERY, { id });

    console.log("post", post)
    if (!post) return notFound();

  return (
      <>
      {/* ------------------HEADER-------------------------- */}
        <section className='header pattern'>
            <p className='tag'>{formatDate(post._createdAt)}</p>
            <Heading text1={post.title} text2={""}/>
            <p className='subHeading !text-xl sm:px-0'>{post.description}</p>
        </section>
        {/* ----------------------BODY---------------------- */}
        <section className='px-15 md:px-36 py-12'>
            <img src={post.image} alt="thumbnail" className='w-full rounded-xl border-2 border-black'/>
            <div className='flex border justify-between items-center'>
                <div className='flex gap-2'>
                    <img src={`https://media.istockphoto.com/id/2151669184/vector/vector-flat-
                        illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.
                        jpg?s=612x612&w=is&k=20&c=0nUqNCdx5lQnefamkMzDW5OD_8jMpsGVQdv7TOVL0UI=`} alt="authors image" className='rounded-full w-18 h-18' />
                    {/* <img src={post?.author?.image} alt="authors image" className='rounded-full w-18 h-18' /> */}
                    
                    <div>
                        <p>{post?.author?.name}</p>
                        <p>author@pk</p>
                    </div>
                </div>
                <p>{post.category}</p>
            </div>

        </section>
    </>
  )
}

export default page


