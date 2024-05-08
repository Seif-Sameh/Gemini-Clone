import React, { useState, useRef, useEffect } from 'react'
import { BiSend } from "react-icons/bi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdOutlineMicNone } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";


const PromptBar = ({prompt, setPrompt, setGenerating, promptsResponsesList, setPromptsResponsesList, inputRef}) => {
    

    const [history, setHistory] = useState([])
    const [enterIconState, setEnterIconState] = useState(false)

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    async function generateResponse() {
        const chat = model.startChat({
            history: [...history],
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        setPromptsResponsesList([...promptsResponsesList, {role: 'model', text: text}])
        setHistory([...history, {role: "user", parts: [{ text: prompt}]}, {role: 'model', parts: [{ text: text}]}])
        setGenerating(false)

    }


    useEffect(() => {
        prompt && generateResponse()
    }, [prompt])



    return (
        <>
            <div className='absolute bottom-0 w-full pb-5 pt-2  bg-white dark:bg-darkGray flex flex-col items-center gap-3'>
                <div className='relative md:w-2/3 w-full  flex justify-center px-6'>
                    <input
                        cols={50}
                        type='text'
                        ref={inputRef}
                        className='bg-darkWhite text-darkGray dark:bg-lightGray dark:text-white w-full rounded-full outline-none p-6 pr-28 resize-none '
                        placeholder='Enter a prompt here'
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                setPrompt(e.target.value)
                                setPromptsResponsesList([...promptsResponsesList, {role: 'user', text: e.target.value}])
                                setGenerating(true)
                                e.target.value = ''
                            }
                        }}
                        onChange={(e) => e.target.value !== '' ? setEnterIconState(true) : setEnterIconState(false)}
                    />
                    <div className='absolute right-9 bottom-3 flex items-center justify-center  text-white dark:bg-lightGray '>
                        <div
                            className='h-12 w-12 flex justify-center items-center rounded-full cursor-pointer text-lightGray dark:text-darkWhite hover:bg-lightHover dark:hover:bg-darkHover'>
                            <BiImageAdd size={25} />
                        </div>
                        <div
                            className='h-12 w-12 flex justify-center items-center rounded-full cursor-pointer text-lightGray dark:text-darkWhite hover:bg-lightHover dark:hover:bg-darkHover'>
                            <MdOutlineMicNone size={25} />
                        </div>
                        <div
                            className={`h-12 w-12 justify-center items-center rounded-full cursor-pointer text-lightGray dark:text-darkWhite hover:bg-lightHover dark:hover:bg-darkHover ${enterIconState? 'flex' : 'hidden'}`}
                            onClick={(() => {
                                setPrompt(inputRef.current.value)
                                setPromptsResponsesList([...promptsResponsesList, {role: 'user', text: inputRef.current.value}])
                                setGenerating(true)
                                inputRef.current.value = ''
                            })}
                            >
                            <BiSend size={25} />
                        </div>
                    </div>
                </div>
                <p className='text-[12px] mx-5 max-md:text-center font-thin dark:text-darkWhite text-black'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
            </div>
        </>
    )
}

export default PromptBar