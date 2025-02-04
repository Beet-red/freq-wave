import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { UserData } from '../context/User';
import { FaBookmark, FaPlay } from 'react-icons/fa';

const Album = () => {

    const { fetchAlbumSong, albumSong, albumData, setselectedSong, setisPlaying} = SongData();

    const params = useParams()

    useEffect(() => {
      fetchAlbumSong(params.id)
    }, [params.id]);
    

    const onclickHandler = (id) => {
      setselectedSong(id)
      setisPlaying(true)
    }
  
    const {addtoPlaylist} = UserData();
  
    const savePlaylistHandler = (id) => {
      addtoPlaylist(id)
    }
  
  return (
    <Layout>
        {
            albumData && (
        <>
            <div className='ml-12 mt-10 flex gap-8 flex-col md:flex-row md:items-center '>
                 {
                    albumData.thumbnail && (
                    <img src={albumData.thumbnail.url}
                    className='w-40 rounded-lg' />
                 )}   
                <div className="flex flex-col">
                    <p>Album</p>
                    <h2 className='text-3xl font-bold mb-4 md:text-5xl'>{albumData.title}'s Playlist</h2>
                    <h4> {albumData.description}</h4>
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
        albumSong && albumSong.map((e, i) => (
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
            {/* <p className='text-[15px] text-center' onClick={() => savePlaylistHandler(e._id)}><FaBookmark/></p> */}
            <p className='text-[15px] text-center' 
            onClick={() => onclickHandler(e._id)}><FaPlay/></p>
           </p>

          </div>
        ))
      }                                
        </>
        )}
      
    </Layout>
  )
}

export default Album
