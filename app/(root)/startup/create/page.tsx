import { auth } from '@/auth';
import Heading from '@/components/Heading';
import StartupForm from '@/components/StartupForm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await auth();

    if (!session) redirect("/");

  return (
    <>
        <section className='pattern header !py-17'>
            <Heading text1={"Submit Your Startup"}/>
        </section>
      
      <StartupForm />

    </>
  )
}

export default page
