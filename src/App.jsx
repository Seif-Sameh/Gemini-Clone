import { useEffect, useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import PromptBar from './components/PromptBar'
import Response from './components/Response';
import { assets } from './assets/assets';
import { MdFlight } from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { IoCompassOutline } from "react-icons/io5";


function App() {
  const [response, setResponse] = useState(null)
  const [prompt, setPrompt] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [theme, setTheme] = useState()
  const [toggleMenu, setToggleMenu] = useState(false)
  const [recent, setRecent] = useState([])
  const inputRef = useRef()

  const [promptsResponsesList, setPromptsResponsesList] = useState([])


  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (theme == 'dark') {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])


  return (
    <>
      <div className='flex relative w-screen h-screen overflow-hidden dark:bg-darkGray'>
        <div className={`w-[74px] max-md:hidden`}>
          <Sidebar promptsResponsesList={promptsResponsesList} setPromptsResponsesList={setPromptsResponsesList} theme={theme} setTheme={setTheme} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} recent={recent} setRecent={setRecent}/>
        </div>
        <div className={`max-md:${toggleMenu? 'w-2/5' : 'hidden'}`}>
          <Sidebar promptsResponsesList={promptsResponsesList} setPromptsResponsesList={setPromptsResponsesList} theme={theme} setTheme={setTheme} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} recent={recent} setRecent={setRecent}/>
        </div>


        <div className='w-full h-full relative flex flex-col  overflow-hidden bg-white dark:bg-darkGray'>
          <div>
            <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} recent={recent} setRecent={setRecent}/>
          </div>

          <div className='flex flex-col items-center w-full overflow-y-scroll mb-[140px] p-5'>
            {
              promptsResponsesList.length == 0 && (
                <div className='overlflow-y-scroll w-full lg:w-4/6'>
                  <div className='relative w-full md:text-[45px] lg:text-[48px] text-3xl md:leading-[60px] leading-[40px] text-black dark:text-white font-light tracking-wide'>
                    <div className='w-fit'>
                      <h1 className=' font-semibold animate-typing overflow-hidden whitespace-nowrap pr-5  bg-clip-text text-transparent bg-gradient-to-r  from-blue-500  to-red-400'>Hello, User</h1>
                    </div>
                    <p className=' font-semibold dark:text-[#393939] text-[#d1d4d9]'>How can I help you today?</p>
                  </div>

                  <div className='w-full overflow-x-scroll flex gap-3 max-sm:flex-col max-sm:items-center mt-16'>
                    <div className='w-[300px] h-[200px] max-sm:w-full max-sm:h-[100px] relative p-3 text-sm text-black dark:text-darkWhite bg-darkWhite dark:bg-lightGray hover:bg-darkWhite hover:dark:bg-darkHover cursor-pointer rounded-lg'
                      onClick={() => inputRef.current.value = 'Can you find me some hotels in the Recoleta area of Buenos Aires and suggest things to see while there?'}
                    >
                      Find hotels in Recoleta in Buenos Aires, and things to do
                      <div className='absolute bottom-4 right-4 dark:bg-darkGray bg-white p-2 rounded-full flex justify-center items-center'>
                        <MdFlight className='w-6 h-6' />
                      </div>
                    </div>
                    <div className='w-[300px] h-[200px] max-sm:w-full max-sm:h-[100px]  relative p-3 text-sm text-black dark:text-darkWhite bg-darkWhite dark:bg-lightGray hover:bg-darkWhite hover:dark:bg-darkHover cursor-pointer rounded-lg'
                      onClick={() => inputRef.current.value = 'I need to store data for my business that sells toothbrushes online. We need to build one frontend for customers to buy toothbrushes, and another for employees to handle shipping. Define a database schema and generate SQL commands that can be used to create the necessary tables and enforce their relationships in BigQuery.'}
                    >
                      Help design a database schema for a business
                      <div className='absolute bottom-4 right-4 dark:bg-darkGray bg-white p-2 rounded-full flex justify-center items-center'>
                        <FaCode className='w-6 h-6' />
                      </div>
                    </div>
                    <div className='w-[300px] h-[200px] max-sm:w-full max-sm:h-[100px]  relative p-3 text-sm text-black dark:text-darkWhite bg-darkWhite dark:bg-lightGray hover:bg-darkWhite hover:dark:bg-darkHover cursor-pointer rounded-lg'
                      onClick={() => inputRef.current.value = 'Explain what the keto diet is in simple terms.'}
                    >
                      Explain what the keto diet is in simple terms
                      <div className='absolute bottom-4 right-4 dark:bg-darkGray bg-white p-2 rounded-full flex justify-center items-center'>
                        <IoCompassOutline className='w-6 h-6' />
                      </div>
                    </div>
                    <div className='w-[300px] h-[200px] max-sm:w-full max-sm:h-[100px]  relative p-3 text-sm text-black dark:text-darkWhite bg-darkWhite dark:bg-lightGray hover:bg-darkWhite hover:dark:bg-darkHover cursor-pointer rounded-lg'
                      onClick={() => inputRef.current.value = 'Find videos of how to quickly get grape juice out of a wool rug'}
                    >
                      Suggest videos to quickly solve a problem
                      <div className='absolute bottom-4 right-4 dark:bg-darkGray bg-white p-2 rounded-full flex justify-center items-center'>
                        <img src={assets.youtube_icon} alt="" className='w-6 h-6' />
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            {promptsResponsesList?.map((item, index) => (
              <div key={index} className='relative w-full md:w-3/5  text-black dark:text-white font-light tracking-wide'>
                <Response item={item} generating={generating} index={index} promptsResponsesList={promptsResponsesList} />
              </div>
            ))}
          </div>
          <div className='flex flex-col'>
            <PromptBar setResponse={setResponse} prompt={prompt} setPrompt={setPrompt} setGenerating={setGenerating} setPromptsResponsesList={setPromptsResponsesList} promptsResponsesList={promptsResponsesList} inputRef={inputRef} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
