import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Navbar = async () => {

    const session = await auth();


  return (
    <header className='py-3 px-5 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center '>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='YC directory logo image at navbar' width={144} height={30}/>
            </Link>
            <div className=' text-black flex gap-8 font-semibold'>
                {
                    session && session?.user 
                    ? ( 
                        <>
                        <Link href={"/startup/create"}>
                            <span>Create</span>
                        </Link>
                        <form action={               
                            async () => {
                            "use server";
                            await signOut({redirect: true, redirectTo: "/"}); //signOut({redirect: boolean, redirectTo: Url})
                            }}>
                            <button type='submit' className='cursor-pointer'>Logout</button>
                        </form>
                        <Link href={`/user`}>
                            <span>{session?.user?.name}</span>
                        </Link>
                        </>) 
                    : (
                    <>
                    <form action={
                        async () => {
                        "use server"; 
                        await signIn("github"); //signIn("provider", {redirect, redirectTo})    //*{redirect, redirectTo} are called options 
                        }}> 
                        <button type='submit' className='cursor-pointer'>Login</button>
                    </form>
                    </>)
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar
