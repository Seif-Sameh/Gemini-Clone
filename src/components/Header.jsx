import React from 'react'
import {assets} from '../assets/assets'
import { MdMenu} from "react-icons/md";

const Header = ({toggleMenu, setToggleMenu, recent, setRecent}) => {
  return (
    <div className='flex justify-between items-center w-full py-4 h-20 px-6'>
      <div className='flex items-center gap-6'>
      <div
          className='mt-2 w-12 h-12 flex md:hidden justify-center items-center dark:text-white text-darkGray rounded-full hover:bg-lightHover dark:hover:bg-darkHover cursor-pointer'
          onClick={() => {
            setToggleMenu(!toggleMenu)
            const recentLocalStorage = JSON.parse(localStorage.getItem('recent'))
            setRecent(recentLocalStorage)
          }}
        >
          <MdMenu size={25} />
        </div>
        <div className='flex items-center justify-center'>
            <img src={assets.logo} alt="" className='h-8'/>
        </div>
      </div>
        <div>
            <img src={assets.user_icon} alt="" className='h-10 rounded-full'/>
        </div>

    </div>
  )
}

export default Header