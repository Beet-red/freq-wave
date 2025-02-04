import React from 'react'
import { assets } from "../assets/assets.js"
import { useNavigate } from "react-router-dom"
import PlaylistCard from './PlaylistCard.jsx'
import { UserData } from '../context/User.jsx'
const Sidebar = () => {
    const navigate = useNavigate();
    const {user} = UserData();
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white lg:flex hidden md:block'>
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
            <div className='flex items-center gap-3 pl-8 cursor-pointer ' onClick={() => navigate("/")}>
                <img src={assets.home_icon} className='w-6' />
                <p className='font-bold'> Home </p>
            </div>
            <div className='flex items-center gap-3 pl-8 cursor-pointer 'onClick={() => navigate("/search")}>
                <img src={assets.search_icon} className='w-6' />
                <p className='font-bold'> Search </p>
            </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded ">
        <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <img src={assets.stack_icon} className='w-8' />
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex items-center gap-3'>
                <img src={assets.arrow_icon} className='w-4 font-semibold' />
                <img src={assets.plus_icon} className='w-4 font-semibold' />
            </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
            <PlaylistCard  />
        </div>

        <div className="p-4 m-1 bg-[#121212] rounded font-semibold flex flex-col items-start justify-start gap-2 pl-4 mt-4">
            <h1>Let's FindSome Podcasts to Follow </h1>
            <p className='font-light'> We'll keep you updated on new episodes</p>
            <button className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4' >
                Browse Podcast
            </button>
        </div>

        {user && user.role === "admin" && (
            <div className="p-4 mt-20 m-1 bg-[#121212] rounded font-semibold flex flex-col items-start justify-start gap-2 pl-4 mt-4">
                    <button className='px-2 py-1.5 bg-white text-black text-[15px] rounded-full mt-4' onClick={() => navigate("/admin")}>
                        Admin Dashboard
                    </button>
            </div>
            )
        }

      </div>
    </div>
  )
}

export default Sidebar
