import React, { useState } from 'react'
import { UserData } from '../context/User'
import { Link, useNavigate } from 'react-router-dom'
import { SongData } from '../context/Song'
import { MdBorderColor, MdDelete } from "react-icons/md";
import Loading from '../components/Loading';
const Admin = () => {
    const {user} = UserData()
    const {albums, songs, addAlbum, loading, addSong, addThumbnail, deleteSong} = SongData();
    const navigate = useNavigate();


    if(user && user.role !== "admin") return navigate("/");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [singer, setSinger] = useState("");
    const [album, setAlbum] = useState("");
    const [region, setRegion] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");


    const fileChangeHandler =  e => {
      const file = e.target.files[0]
      setFile(file);
    }

    const addAlbumHandler = e=>{
      e.preventDefault()

      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("file", file)
      addAlbum(formData, setTitle, setDescription, setFile)


    }

    // const addSongHandler = e=>{
    //   e.preventDefault()

    //   const formData = new FormData()

    //   formData.append("title", title)
    //   formData.append("description", description)
    //   formData.append("singer", singer)
    //   formData.append("album", album)
    //   formData.append("file", file)
    //   addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum)


    // }


    const addSongHandler = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("singer", singer);
      formData.append("album", album);
      formData.append("region", region);
      formData.append("genre", genre);
      formData.append("language", language);
      formData.append("file", file);
  
      addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum, setRegion, setGenre, setLanguage);
  };

    const addThumbanilHandler = (id) => {
      const formData = new FormData()
      formData.append("file", file)

      addThumbnail(id, formData, setFile);

    }
    
    const deleteHandler = (id) => {
      if(confirm("Do You Want to Delete This Song??")){
        deleteSong(id);
      }
    }

  return (
    <div className='min-h-screen bg-[#212121] text-white p-8'>
      <Link to="/" className='bg-green-500 text-white font-bold py-2 px-4 rounded-full'>Go To Home Page</Link>
      <h2 className='text-2xl font-bold mb-6 mt-6'>Add Album</h2>
      <form onSubmit={addAlbumHandler} className='bg-[#181818] p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Title
          </label>
          <input type='text' placeholder='title' className= 'auth-input' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}  
          required/>
        </div>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Description
          </label>
          <input type='text' placeholder='Description' className= 'auth-input' 
          value={description}
          onChange={(e) => setDescription(e.target.value)}  
          required/>
        </div>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Thumbnail
          </label>
          <input type='file'  className= 'auth-input' accept='image/*'
          onChange={fileChangeHandler }
        required/>
        </div>
        <button disabled={loading} className='auth-button' style={{width:"100px"}}>
          {loading?<Loading />: "Add"}
        </button>
      </form>
      <h2 className='text-2xl font-bold mb-6 mt-6'>Add Song</h2>
      <form onSubmit={addSongHandler} className='bg-[#181818] p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Title
          </label>
          <input type='text' placeholder='title' className= 'auth-input' 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        required/>
        </div>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Description
          </label>
          <input type='text' placeholder='Description' className= 'auth-input' 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
        required/>
        </div>
        <div className='mb-4 '>
          <label className= 'block text-sm font-medium mb-2'>
            Singer
          </label>
          <input type='text' placeholder='Singer' className= 'auth-input' 
          value={singer}
          onChange={(e) => setSinger(e.target.value)} 
        required/>
        </div>
        
        <select className='auth-input' 
        value={album} 
        onChange={e=> setAlbum(e.target.value)}>
          <option value=" ">Choose Album</option>
          {albums && albums.map((e, i) => (
            <option value={e._id} key={i}>{e.title}</option>
          ))}
        </select>
        <div className='mt-4 mb-4'>
            <label className='block text-sm font-medium mb-2'>Region</label>
            <input type='text' placeholder='Region' className='auth-input' 
              value={region} onChange={(e) => setRegion(e.target.value)} required />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Genre</label>
            <input type='text' placeholder='Genre' className='auth-input' 
              value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div className='mb-4'>
            <label className='block text-sm font-medium mb-2'>Language</label>
            <input type='text' placeholder='Language' className='auth-input' 
              value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className= 'block text-sm font-medium mb-2'>
            Audio
          </label>
          <input type='file'  className= 'auth-input' accept='audio/*'
          onChange={fileChangeHandler }
          required/>
        </div>
        <button disabled={loading} className='auth-button' style={{width:"100px"}}>
          {loading?<Loading />: "Add"}
        </button>
      </form>
      <div className="mt-8">
          <h3 className='text-xl font-semibold mb-4'>Added Song</h3>
          <div className=" flex justify-center md:justify-start gap-4 items-center flex-wrap ">
             {songs && 
                songs.map((e, i) => (
                <div key={i} className="bg-[#181818] p-4 rounded-lg shadow-md border-2 border-[#181818] hover:border-white">
                  {e.thumbnail ? (
                    <img src={e.thumbnail.url} className='mr-1 wi52 h-52'/>
                    ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <input type="file" onChange={fileChangeHandler }/>
                      <button disabled={loading} onClick={()=>addThumbanilHandler(e._id)} className='bg-green-500 text-white px-2 py-1 rounded'>
                      {loading?<Loading />: "Add Thumbnail"}
                      </button>
                    </div>
                    )}
                      <h4 className='text-lg font-bold'>{e.title}</h4>
                      <h4 className='text-sm text-gray-400  hover:text-white'>{e.singer}</h4>
                      <h4 className='text-sm text-gray-400  hover:text-white'>{e.description}</h4>
                      <div className="pt-2 px-12">
                        <button disabled={loading} onClick={()=> deleteHandler(e._id)} className=' px-3 py-1 text-white hover:bg-red-700 text-xl'>
                          {loading?<Loading style={{ MdBorderColor:"white" }} /> : <MdDelete />}
                        </button>
                      </div>
                    
                </div>
              ))}
          </div>
      </div>      
    </div>
  )
}

export default Admin
