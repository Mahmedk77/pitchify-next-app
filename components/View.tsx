import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server"; 

const View = async ({ id }: { id: string }) => {

  const handleViewCount = () => {
    if(!totalViews){ //if totalViews == null or 0
      return "0 Views"
    }

    // `${totalViews ?? 0} ${totalViews === 1 ? "View" : "Views"}` Learn about this "??".
    return (totalViews == 1 ? `${totalViews} View` : `${totalViews} Views`);
  }

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  after( async () => 
    await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit()
  )

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3 ">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-lg capitalize">
        <span className="font-black">
          {handleViewCount()}
        </span>
      </p>
    </div>
  );
};

export default View;
