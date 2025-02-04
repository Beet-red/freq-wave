import React from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import AlbumsItems from '../components/AlbumsItems';
import SongItems from '../components/SongItems';

const Home = () => {

  const {songs , albums } = SongData();


  return (
    <Layout>
      <div className="mb-4">
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className="flex overflow-auto">
          {
            albums.map((e,i)=> (
              <AlbumsItems key={i} image={e.thumbnail.url} name={e.title}  desc={e.description} id={e._id} />
            ))
          }
        </div>
        <div className="div">
        <h1 className='my-5 font-bold text-2xl'>Trending Songs</h1>
        <div className="flex overflow-auto">
          {
            songs.map((e,i)=> (
              <SongItems key={i} image={e.thumbnail.url} name={e.title}  desc={e.description} id={e._id} />
            ))
          }
        </div>          
        </div>
          
      </div>
          
   </Layout>
  )
}

export default Home
