  import React, { useEffect, useState } from 'react'
  import Layout from "../components/Layout"
  import { SongData } from '../context/Song'
  import { assets } from '../assets/assets';
  import { FaBookmark, FaPlay } from 'react-icons/fa';
  import { UserData } from '../context/User';
  const Playlist = ({ user }) => {

    const { songs, setselectedSong, setisPlaying } = SongData();

    const [myPlaylist, setmyPlaylist] = useState([]);

    useEffect(()=> {
      if(songs && user && Array.isArray(user.playlist)){
        const filteredSongs = songs.filter((e) => 
          user.playlist.includes(e._id.toString())
      );
      setmyPlaylist(filteredSongs);
      }
    }, [songs, user])


    const onclickHandler = (id) => {
      setselectedSong(id)
      setisPlaying(true)
    }

    const {addtoPlaylist} = UserData();

    const savePlaylistHandler = (id) => {
      addtoPlaylist(id)
    }

    console.log(myPlaylist)
    return (
      <Layout>
        <div className='ml-12 mt-10 flex gap-8 flex-col md:flex-row md:items-center '>
          {
            myPlaylist && myPlaylist[0] ? (
              <img src={myPlaylist[0].thumbnail.url} 
              className='w-40 rounded-lg' />
            ):(
              <img src='https://via.placeholder.com/50' 
              className='w-[250px]'
              alt="" 
              />
            )
          } 

          <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className='text-3xl font-bold mb-4 md:text-5xl'>{user.name}'s Playlist</h2>
            <h4> Your Liked Songs</h4>
            <p className="mt-1">
              <img src={assets.spotify_logo} className='inline-block w-6' />
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
          <p>
            <b className='mr-4'>#</b>
          </p>
          <p>Artist</p>
          <p className='hidden sm:block'>Description</p>
          <p className='text-center'>Actions</p>
        </div>
        <hr />
        {
          myPlaylist && myPlaylist.map((e, i) => (
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer" 
            key={i}
            >
            <p className='text-white'> 
            <b className='mr-4 text-white'>{i+1}</b>
            <img src={e.thumbnail.url} className='inline w-10 mr-5' alt=""/>
            {e.title}
            </p>
            <p className='text-[15px] text'>{e.singer}</p>
            <p className='text-[15px] text-center'>{e.description.slice(0, 20)}</p>
            <p className='flex justify-center items-center gap-5'>
              <p className='text-[15px] text-center' onClick={() => savePlaylistHandler(e._id)}><FaBookmark/></p>
              <p className='text-[15px] text-center' 
              onClick={() => onclickHandler(e._id)}><FaPlay/></p>
            </p>

            </div>
          ))
        }
      </Layout>
    )
  }

  export default Playlist
