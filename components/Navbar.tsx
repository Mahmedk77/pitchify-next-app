import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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
                        <div className='flex justify-center items-center gap-6'>
                        <Link href={"/startup/create"}>
                            <span className='hidden sm:block'>Create</span>
                            <BadgePlus className='sm:hidden size-6' color='red'/>
                        </Link>
                        <form action={               
                            async () => {
                            "use server";
                            await signOut({redirect: true, redirectTo: "/"}); //signOut({redirect: boolean, redirectTo: Url})
                            }}>
                            <button type='submit' className='cursor-pointer'>
                                <span className='hidden sm:block'>Logout</span>
                                <LogOut className='sm:hidden size-6' color='red'/>
                            </button>
                        </form>
                        <Link href={`/user`}>
                            <Avatar className="size-10">
                                <AvatarImage
                                    src={session?.user?.image || ""}
                                    alt={session?.user?.name || ""}
                                />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>
                        </div>) 
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
