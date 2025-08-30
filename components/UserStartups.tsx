import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard';

const UserStartups = async ({ id }: { id: string}) => {

    const posts = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id});



  return (
    <>
           
    {
        posts?.length > 0 
        ? posts.map((post: StartupCardType, index: number) => (
        <StartupCard key={index} post={post}/>

        )) 
        : <p>Its Empty!</p>
    }
    
            
    </>
  )
}

export default UserStartups
