import Form from "next/form";
import QueryReset from './QueryReset';
import { Search } from 'lucide-react';
import Link from "next/link";

const SearchForm = ({ query } : {query?: string}) => {

  return (
    <Form action={'/'} scroll={false} className="relative mb-4" id="search-form">
        
        <input name='query' defaultValue={query} type="text" placeholder="SEARCH STARTUP" className="font-bold text-black w-sm sm:w-lg bg-white py-4 px-5 rounded-full border-black border-5 outline-0" />
        <div className='absolute flex items-center justify-center right-[20px] top-[12px] gap-2'>
        { query && <QueryReset />}
            <button type='submit' className='cursor-pointer bg-black rounded-full w-[40px] h-[40px] flex items-center justify-center'>                
                <Search color="#ffffff" className="size-5"/>
            </button>   
        </div>
    </Form>
  )
}

export default SearchForm
