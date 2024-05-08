import React from 'react'
import { assets } from '../assets/assets'
import Loader from './Loader'
import parse from 'html-react-parser';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";



const Response = ({ item, generating, index , promptsResponsesList}) => {
    const role = item?.role
    const text = item?.text
    const markedResponse = (text && role == 'model') && marked.parse(text)
    const parsedResponse = markedResponse && parse(markedResponse)

    return (
        <div className='flex flex-col'>
            {
                role == 'user' && (
                    <>
                        <div className='flex gap-6 text-lg items-start my-8'>
                        <div className='flex justify-center'>
                            <div className='w-[40px]'>
                                <img src={assets.user_icon} alt="" className={`h-10 w-10 rounded-full ${generating || text ? 'block' : 'hidden'}`} />
                            </div>
                        </div>
                            <span>{text}</span>
                        </div>
                        {(generating && index === promptsResponsesList.length -1) && (<div className='flex gap-6 text-md my-2'>
                            <div className='flex justify-center'>
                                <div className='w-[40px]'>
                                    <img src={assets.gemini_icon} alt="" className={`h-10 w-10  ${generating && 'animate-spin'} ${generating || text ? 'block' : 'hidden'}`} />
                                </div>
                            </div>
                            <div className=' flex flex-col gap-3 text-wrap pt-2 w-full'>
                                <Loader />
                            </div>
                        </div>)}
                    </>
                )}

            {role == 'model' && (
            <div className='flex gap-6 text-md my-2'>
                <div className='flex justify-center'>
                    <div className='w-[40px]'>
                        <img src={assets.gemini_icon} alt="" className={`h-10 w-10  ${(generating && index === promptsResponsesList.length -1) && 'animate-spin'} ${(generating && index === promptsResponsesList.length -1) || text ? 'block' : 'hidden'}`} />
                    </div>
                </div>
                <div className=' flex flex-col gap-3 text-wrap pt-2 w-full'>
                    {(parsedResponse) && parsedResponse}
                </div>
            </div>)}
        </div>
    )
}

export default Response