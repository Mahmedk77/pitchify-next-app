import Image from "next/image";
import Heading from "../../components/Heading";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";



export default async function Home({ searchParams }: { searchParams : Promise<{query?: string}>}) {
  
  const query = (await searchParams).query
  const params = { search: query || null  }

  const session = await auth();

  console.log(session?.id)

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  return (<>
    <section className='bg-[#EE2B69] flex flex-col justify-center items-center w-full py-12 px-3 pattern'>
      <p className="tag">PITCH, VOTE, AND GROW</p>
      <Heading text1={"Pitch your startup,"} text2={"connect with entrepreneurs"}/>
      <p className="text-white my-6 px-4 text-center !text-xl sm:px-0">Submit Ideas, Vote on Pictches, and Get Noticed in Virtual Competitions </p>
      <SearchForm query={query}/>
    </section>
    {/* -------------------------Cards Section------------------------- */}
    <section className="px-4 xl:px-36 py-12">
      <p className="font-semibold text-3xl">
        { query ? `Results for "${query}"` : "All Startups" }
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
       
         {
          posts?.length > 0 
          ? posts.map((post: StartupCardType, index: number) => (
            <StartupCard key={index} post={post}/>

          )) 
          : <p>Its Empty!</p>
        }
       
        
      </div>
    </section>

    <SanityLive />
  </>); 
}
