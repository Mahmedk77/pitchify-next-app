"use client"

import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from "@uiw/react-md-editor";
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import z from 'zod';
import { createPitch } from '@/lib/action';

const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();
    

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
      try {
        const formValues = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          category: formData.get("category") as string,
          link: formData.get("link") as string,
          pitch
        };
        
        await formSchema.parseAsync(formValues);

        const result = await createPitch(prevState, formData, pitch);
        console.log(result);

        if (result.status === "SUCCESS") {
          toast.success("Your startup pitch has been created successfully");
          router.push(`/startup/${result._id}`);

          return result;
        }

        

      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors = error.flatten().fieldErrors;

          setErrors(fieldErrors as unknown as Record<string, string>);
          console.log(fieldErrors);
          toast.error("Please check your inputs and try again");
          
           return { ...prevState, error: "Validation failed", status: "ERROR" };
        }

      toast.error("An unexpected error has occurred");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      }

    } }


    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
      error: "",
      status: "INITIAL"
    })

  return (
    <form action={formAction} className='mx-4 px-0 lg:px-12 lg:mx-96 py-12 flex flex-col items-center gap-8'>
        {/* -------TITLE---------- */}
        <div className='w-full'>
            <label htmlFor="title" className='text-lg font-bold uppercase'>Title</label>
            <Input 
                id='title'
                name='title'
                className=' mt-2 text-gray-700 font-semibold  !text-lg
                bg-white py-7 px-5 rounded-full border-black border-3 outline-0'
                required
                placeholder='Startup Title'
             />

             { errors.title && <p className='text-red-500 p-2 text-xs sm:text-sm'>{errors.title}</p> }
        </div>
        {/* -------DESC---------- */}

         <div className='w-full'>
            <label htmlFor="description" className='text-lg font-bold uppercase'>description</label>
            <Textarea 
                id='description'
                name='description'
                className=' mt-2 text-black font-semibold !text-lg
                bg-white py-7 px-5 rounded-3xl border-black border-3 outline-0'
                required
                placeholder='Startup Description'
             />

             { errors.description && <p className='text-red-500 p-2 text-xs sm:text-sm'>{errors.description}</p> }
        </div>
        {/* -------CATEGORY---------- */}

        <div className='w-full'>
            <label htmlFor="category" className='text-lg font-bold uppercase'>category</label>
            <Input 
                id='category'
                name='category'
                className=' mt-2 text-gray-700 font-semibold !text-lg
                bg-white py-7 px-5 rounded-full border-black border-3 outline-0'
                required
                placeholder='Startup Category (Tech, Health, Education...)'
             />

             { errors.category && <p className='text-red-500 p-2 text-xs sm:text-sm'>{errors.category}</p> }
        </div>
        {/* -------IMAGE---------- */}

         <div className='w-full'>
            <label htmlFor="link" className='text-lg font-bold uppercase'>Image Url</label>
            <Input 
                id='link'
                name='link'
                className='mt-2 text-gray-700 font-semibold !text-lg
                bg-white py-7 px-5 rounded-full border-black border-3 outline-0'
                required
                placeholder='Startup Image URL'
             />

             { errors.link && <p className='text-red-500 p-2 text-xs sm:text-sm'>{errors.link}</p> }
        </div>
        {/* -------PTICH---------- */}

        <div data-color-mode="light" className='w-full sm:w-[85%]'>
            <label htmlFor="pitch" className='text-lg font-bold uppercase'>Pitch</label>
            <MDEditor 
              value={pitch}
              onChange={(value) => setPitch(value as string)}
              id='pitch'
              preview='edit'
              height={300}
              style={{borderRadius: 20, overflow: "hidden"}}
              textareaProps={{
                placeholder: "Briefly describe your idea and what problem it solves"
              }}
              previewOptions={{
                disallowedElements: ["style"]
              }}
            />
             { errors.pitch && <p className='text-red-500 p-2 text-xs sm:text-sm'>{errors.pitch}</p> }
        </div>

        <Button type='submit' disabled={isPending} className='flex justify-center items-center w-full 
        sm:w-[85%]  py-8 border-4 border-black
        bg-[#EE2B69] hover:bg-[#EE2B69] font-bold rounded-full 
        cursor-pointer text-lg text-white'>
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm
