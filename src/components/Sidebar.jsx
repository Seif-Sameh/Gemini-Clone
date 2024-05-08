import React, { useState } from 'react'
import { MdMenu, MdAdd, MdHelpOutline, MdHistory, MdOutlineSettingsSuggest, MdChatBubbleOutline } from "react-icons/md";

const Sidebar = ({ promptsResponsesList, setPromptsResponsesList, theme, setTheme, toggleMenu, setToggleMenu, recent, setRecent }) => {
  
  const [toggleSettings, setToggleSettings] = useState(false)


  const localStorageHandler = () => {
    const fetchLocalStorage = JSON.parse(localStorage.getItem('recent'))
    const filteredLocalStorage = fetchLocalStorage.filter((item) => (item?.title !== promptsResponsesList[0]?.text))
    localStorage.setItem('recent', JSON.stringify([...filteredLocalStorage, { title: promptsResponsesList[0]?.text, content: promptsResponsesList }]))
  }


  return (
    <div className={` absolute top-0 left-0 z-50 flex flex-col justify-between items-start px-3 pt-3 pb-10  bg-darkWhite dark:bg-lightGray  transition-all duration-1000 ease-in-out h-screen ${toggleMenu ? 'w-3/5 md:w-1/5' : 'w-[74px]'} `}>
      <div className='flex flex-col gap-10 justify-between items-start w-full overflow-hidden'>
        <div
          className='w-12 h-12 flex justify-center items-center dark:text-white text-darkGray rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer'
          onClick={() => {
            setToggleMenu(!toggleMenu)
            const recentLocalStorage = JSON.parse(localStorage.getItem('recent'))
            setRecent(recentLocalStorage)
          }}
        >
          <MdMenu size={25} />
        </div>
        <div className={`h-10 ml-1 p-[10px] gap-4 flex justify-start items-center dark:text-darkWhite text-darkGray rounded-full bg-lightHover dark:bg-darkHover cursor-pointer overflow-hidden transition-all duration-1000 ease-in-out ${toggleMenu ? 'w-fit ' : 'w-10'}`}
          onClick={() => {
            localStorage.length == 0 ? localStorage.setItem('recent', JSON.stringify([{ title: promptsResponsesList[0]?.text, content: promptsResponsesList }])) : localStorageHandler()
            setPromptsResponsesList([])
            setToggleMenu(false)
          }}
        >
          <div>
            <MdAdd size={20} />
          </div>
          <p className={`text-sm truncate ${toggleMenu ? 'block ' : 'hidden'}`}>New chat</p>
        </div>
        <div className={`pl-3 text-black dark:text-darkWhite flex flex-col gap-2 w-full ${toggleMenu ? 'block ' : 'hidden'}`}>
          <p className='text-sm mb-4'>Recents</p>
          <div className='flex flex-col-reverse'>
            {
              recent?.map((item) => (item?.title &&
                <div
                  key={item?.title}
                  className={`h-10 flex text-xl justify-start px-3 gap-5 items-center dark:text-white text-darkGray  rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer w-full`}
                  onClick={() => {
                    setPromptsResponsesList([...item?.content])
                  }}
                >
                  <div>
                    <MdChatBubbleOutline />
                  </div>
                  <p className='truncate text-sm'>{item && item?.title}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-start pl-1'>
        <div className={`h-10 flex text-xl justify-start px-3 gap-5 items-center dark:text-white text-darkGray  rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer w-full`}>
          <div>
            <MdHelpOutline />
          </div>
          <p className={`truncate text-sm ${toggleMenu ? 'block ' : 'hidden'}`}>Help</p>
        </div>
        <div className={`h-10 flex text-xl justify-start px-3 gap-5 items-center dark:text-white text-darkGray  rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer w-full`}>
          <div>
            <MdHistory />
          </div>
          <p className={`truncate text-sm ${toggleMenu ? 'block ' : 'hidden'}`}>Activity</p>
        </div>
        <div className={` h-10 flex text-xl justify-start px-3 gap-5 items-center dark:text-white text-darkGray  rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer w-full`}
          onClick={() => setToggleSettings(!toggleSettings)}
        >
          <div>
            <MdOutlineSettingsSuggest />
          </div>
          <p className={`truncate text-sm ${toggleMenu ? 'block ' : 'hidden'}`}>Settings</p>
        </div>
          {
            toggleSettings && (
              <div className='w-[150px] h-[50px] text-black dark:text-darkWhite bg-darkWhite dark:bg-lightGray absolute z-100 left-[75px] bottom-8 p-2 flex items-center justify-between text-sm rounded-md'>
                <span>Dark theme</span>
                <div className={`w-[35px] h-4  rounded-full relative ${theme == 'dark' ? 'bg-blue-500' : 'bg-gray-400'} cursor-pointer`}
                  onClick={() => {
                    theme == 'dark' ? setTheme('light') : setTheme('dark')
                  }}
                >
                  <div className={`w-5 h-5  rounded-full -top-[2px] absolute ${theme == 'dark' ? 'right-0 bg-blue-300' : 'left-0 bg-gray-800'} `}></div>
                </div>
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Sidebar