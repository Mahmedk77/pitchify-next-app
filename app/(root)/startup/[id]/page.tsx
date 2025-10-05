import Heading from '@/components/Heading';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it'
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';

export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }>}) => {

    const id = (await params).id;
    // console.log(id);
    
    const [post, { select: editorPosts }] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'new-editor-picks' })
    ])
        

    // console.log("post", post)
    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

  return (
      <>
      {/* ------------------HEADER-------------------------- */}
        <section className='header pattern'>
            <p className='tag'>{formatDate(post._createdAt)}</p>
            <Heading text1={post.title} />
            <p className='text-white my-6 px-0 text-center !text-xl md:px-42'>{post.description}</p>
        </section>
        {/* ----------------------BODY---------------------- */}
        <section className='px-6 lg:px-36 py-6'>
            <img src={post.image} alt="thumbnail" className='w-full rounded-xl border border-black shadow-200'/>
            {/* ------------------PROFILE AND PITCH---------------------- */}
            <div className=' mx-0 lg:mx-32 mt-8'>
                
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <img src={post?.author?.image} 
                        alt="authors image" className='rounded-full w-18 h-18' />
                        {/* <img src={post?.author?.image} alt="authors image" className='rounded-full w-18 h-18' /> */}
                        
                        <div className='flex flex-col items-start justify-center'>
                            <p className='text-xl tracking-wide font-medium'>{(post?.author?.name).charAt(0).toUpperCase() + (post?.author?.name).slice(1)}</p>
                            <p className='text-gray-500 font-semibold'>@{post?.author?.username}</p>
                        </div>
                    </div>
                    <p className='bg-[#FFE8F0] p-2 px-4 font-medium rounded-full'>{post.category}</p>
                </div>
                {/* --------------------PITCH BLOCK-------------------- */}
                <div className='mt-8 px-2'>
                    <h1 className='text-3xl font-bold'>Pitch Details</h1>
                    {
                        parsedContent 
                        ? (
                            <article className='mt-8 prose leading-loose tracking-normal text-justify  text-gray-800 text-lg'
                            dangerouslySetInnerHTML={{__html: parsedContent}} />) 
                        : (
                            <p>No details</p>
                        )
                    }
                </div>
            <hr className='my-10 mx-auto border-zinc-400 max-w-4xl'/>
                    {
                        editorPosts.length > 0 && (
                            <div>
                                <p className='font-semibold text-3xl'>
                                Editor Picks
                                </p>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8'>
                                {
                                    editorPosts.map((post: StartupCardType, index: number) => (
                                        <StartupCard key={index} post={post}/>
                                    ))
                                }
                            </div>
                            </div>
                        )
                    }
                
            
            </div>
            <Suspense fallback={<Skeleton />}>
                <View id={post._id} />
            </Suspense>

        </section>
    </>
  )
}

export default page


