import Image from "next/image";
import Heading from "../../components/Heading";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";



export default async function Home({ searchParams }: { searchParams : Promise<{query?: string}>}) {
  


    // {_createdAt: new Date(),
    // views: 55,
    // aurthor: { _id: 1, name: "Muhammad Ahmed"},
    // post_id:1,
    // description: "This is a description",
    // image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/03/walle-eve-from-wall-e.jpg?q=50&fit=crop&w=943&h=530&dpr=1.5",
    // category: "Robots",
    // title: "We Robots",

    // }]
  const query = (await searchParams).query
  const posts = await client.fetch(STARTUPS_QUERY);

  return (<>
    <section className='bg-[#EE2B69] flex flex-col justify-center items-center w-full py-12 px-3 pattern'>
      <p className="p-3 bg-primary text-black text-sm font-bold rounded-sm">PITCH, VOTE, AND GROW</p>
      <Heading text1={"Pitch your startup,"} text2={"connect with entrepreneurs"}/>
      <p className="text-white my-6 px-4 text-center sm:px-0">Submit Ideas, Vote on Pictches, and Get Noticed in Virtual Competitions </p>
      <SearchForm query={query}/>
    </section>
    {/* -------------------------Cards Section------------------------- */}
    <section className="mt-12 mx-6 sm:mx-10">
      <p className="font-semibold text-2xl">
        { query ? `Results for "${query}"` : "Recommended startups" }
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 border mt-8">
       
         {
          posts?.length > 0 
          ? posts.map((post: StartupCardType, index: number) => (
            <StartupCard key={index} post={post}/>

          )) 
          : <p>Its Empty!</p>
        }
       
        
      </div>
    </section>
  </>); 
}
