import Heading from '@/components/Heading';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it'
import React from 'react'

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }>}) => {

    const id = (await params).id;
    console.log(id);
    const post =  await client.fetch(STARTUP_BY_ID_QUERY, { id });

    console.log("post", post)
    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

  return (
      <>
      {/* ------------------HEADER-------------------------- */}
        <section className='header pattern'>
            <p className='tag'>{formatDate(post._createdAt)}</p>
            <Heading text1={post.title} text2={""}/>
            <p className='text-white my-6 px-8 text-center !text-xl md:px-42'>{post.description}</p>
        </section>
        {/* ----------------------BODY---------------------- */}
        <section className='px-6 lg:px-36 py-6'>
            <img src={post.image} alt="thumbnail" className='w-full rounded-xl border border-black shadow-200'/>
            <div className='border mx-0 lg:mx-32 mt-8'>
                
                <div className='flex border justify-between items-center'>
                    <div className='flex gap-2'>
                        <img src={`https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=is&k=20&c=0nUqNCdx5lQnefamkMzDW5OD_8jMpsGVQdv7TOVL0UI=`} 
                        alt="authors image" className='rounded-full w-18 h-18' />
                        {/* <img src={post?.author?.image} alt="authors image" className='rounded-full w-18 h-18' /> */}
                        
                        <div className='flex flex-col items-start justify-center'>
                            <p className='text-xl tracking-wide font-medium'>{(post?.author?.name).charAt(0).toUpperCase() + (post?.author?.name).slice(1)}</p>
                            <p className='text-gray-500 font-semibold'>{post?.author?.username}</p>
                        </div>
                    </div>
                    <p className='bg-[#FFE8F0] p-2 px-4 font-medium rounded-full'>{post.category}</p>
                </div>
            
            <div className='mt-8 px-2'>
                <h1 className='text-3xl font-bold'>Pitch Details</h1>
                {
                    parsedContent ? (
                        <article className='mt-8'
                        dangerouslySetInnerHTML={{__html: parsedContent}} />
                    ) : (
                        <p>No details</p>
                    )
                }
            </div>
            </div>

        </section>
    </>
  )
}

export default page


