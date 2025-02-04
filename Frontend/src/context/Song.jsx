// import { createContext, useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";


 
// const SongContext = createContext();

// export const SongProvider = ({children}) => {
//     const [songs, setsongs] = useState([]);
//     const [loading, setloading] = useState(false);
//     const [songLoading, setsongLoading] = useState(true);

//     const [selectedSong, setselectedSong] = useState(null)

//     const [isPlaying, setisPlaying] = useState(false)

    

//     async function fetchSongs() {
//         try{
//             const {data} = await axios.get("/api/song/all")

//             setsongs(data);
//             setselectedSong(data[0]._id);
//             setisPlaying(false);

//         }catch(error){
//             console.log(error)
//         }
//     }

//     const [song, setSong] = useState([])

//     async function fetchSingSong() {
//         try {
//             const { data } = await axios.get("/api//song/single/" + selectedSong)

//             setSong(data);
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     async function addAlbum(formData, setTitle, setDescription, setFile) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/album/new", formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchAlbums();
//             setTitle(""); 
//             setDescription(""); 
//             setFile(null);
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }

//     async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/new", formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchSongs();
//             setTitle(""); 
//             setDescription(""); 
//             setFile(null);
//             setSinger("");
//             setAlbum("");
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }


//     async function addThumbnail(id, formData, setFile) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/"+id, formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchSongs();
//             setFile(null);
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }

//     const [albums, setalbums] = useState([])
//     async function fetchAlbums() {
//         try{
//             const {data} = await axios.get("/api/song/album/all")

//             setalbums(data)
//         }catch(error){
//             console.log(error)
//         }
//     }

//     async function deleteSong(id) {
//         try {
//             const {data} = await axios.delete("/api/song/" +id);

//             toast.success(data.message)
//             fetchSongs();
//         } catch (error) {
//             toast.error(error.response.data.message)
//         }
//     }
    

//     useEffect(() => {
//         fetchSongs();
//         fetchAlbums();
//     },[])


//     const [index, setindex] = useState(0)

//     function nextMusic() {
//         // if (index === songs.length - 1) {
//         //     setindex(0);
//         // } else {
//         //     setindex(index + 1);
//         // }
//         // setselectedSong(songs[index]._id);
//         // setisPlaying(true);
//         if (index < songs.length - 1) {
//             setindex(index + 1);
//             setselectedSong(songs[index + 1]._id);
//         } else {
//             setindex(0);
//             setselectedSong(songs[0]._id);
//         }
//     }


//     function previousMusic() {
//         if(index === 0){
//             return null
//         }else{
//             setindex(index - 1)
//             setselectedSong(songs[index - 1]._id);
//         }
//     }


//     const [albumSong, setalbumSong] = useState([])
//     const [albumData, setalbumData] = useState([])

//     async function fetchAlbumSong(id) {
//         try {
//             const {data} = await axios.get("/api/song/album/"+id);
//             setalbumSong(data.songs);
//             setalbumData(data.album)
//         } catch (error) {
//             console.log(error)
//         }
//     }

// return <SongContext.Provider 
// value = {{
//     songs, 
//     addAlbum, 
//     loading, 
//     songLoading, 
//     albums, 
//     addSong, 
//     addThumbnail, 
//     deleteSong,
//     fetchSingSong,
//     song, 
//     setselectedSong,
//     isPlaying, 
//     setisPlaying,
//     selectedSong,
//     nextMusic,
//     previousMusic,
//     fetchAlbumSong,
//     albumSong,
//     albumData,
//     fetchSongs,
//     fetchAlbums
// }}>
//     {children}
//     </SongContext.Provider>
// };

// export const SongData = () => useContext(SongContext);


// import { createContext, useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";



// const SongContext = createContext();

// export const SongProvider = ({children}) => {
//     const [songs, setsongs] = useState([]);
//     const [loading, setloading] = useState(false);
//     const [songLoading, setsongLoading] = useState(true);
    
//     const audioRef = useRef(new Audio());
//     const [selectedSong, setselectedSong] = useState(null)

//     const [isPlaying, setisPlaying] = useState(false)



//     const playSong = (url) => {
//         if (audioRef.current.src !== url) {
//             audioRef.current.src = url;
//         }
//         audioRef.current.play().catch((error) => console.error("Playback failed:", error));
//         setisPlaying(true);
//     };

//     const pauseSong = () => {
//         audioRef.current.pause();
//         setisPlaying(false);
//     };

//     useEffect(() => {
//         return () => {
//             // Ensure audio stops when the component unmounts
//             audioRef.current.pause();
//         };
//     }, []);

    

//     // async function fetchSongs() {
//     //     try{
//     //         const {data} = await axios.get("/api/song/all")

//     //         setsongs(data);
//     //         setselectedSong(data[0]._id);
//     //         setisPlaying(false);

//     //     }catch(error){
//     //         console.log(error)
//     //     }
//     // }

//     async function fetchSongs() {
//         try {
//             const { data } = await axios.get("/api/song/all");
//             setsongs(data);
//             if (!selectedSong && data.length > 0) {
//                 setselectedSong(data[0]._id); // Set initial song if not already selected
//             }
//             setisPlaying(false);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const [song, setSong] = useState([])

//     // async function fetchSingSong() {
//     //     try {
//     //         const { data } = await axios.get("/api//song/single/" + selectedSong)

//     //         setSong(data);
//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // }

//     async function fetchSingSong() {
//         if (!selectedSong) return; // Ensure a valid song ID
//         try {
//             const { data } = await axios.get(`/api/song/single/${selectedSong}`);
//             setSong(data);
//         } catch (error) {
//             console.log("Error fetching single song:", error);
//         }
//     }

//     async function addAlbum(formData, setTitle, setDescription, setFile) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/album/new", formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchAlbums();
//             setTitle(""); 
//             setDescription(""); 
//             setFile(null);
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }

//     async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/new", formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchSongs();
//             setTitle(""); 
//             setDescription(""); 
//             setFile(null);
//             setSinger("");
//             setAlbum("");
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }


//     async function addThumbnail(id, formData, setFile) {
//         setloading(true)
//         try{
//             const {data} = await axios.post("/api/song/"+id, formData)
//             toast.success(data.message)
//             setloading(false);
//             fetchSongs();
//             setFile(null);
//         }catch(error){
//             toast.error(error.response.data.message);
//             setloading(false)
//         }
//     }

//     const [albums, setalbums] = useState([])
//     async function fetchAlbums() {
//         try{
//             const {data} = await axios.get("/api/song/album/all")

//             setalbums(data)
//         }catch(error){
//             console.log(error)
//         }
//     }

//     async function deleteSong(id) {
//         try {
//             const {data} = await axios.delete("/api/song/" +id);

//             toast.success(data.message)
//             fetchSongs();
//         } catch (error) {
//             toast.error(error.response.data.message)
//         }
//     }
    

//     useEffect(() => {
//         fetchSongs();
//         fetchAlbums();
//     },[])


//     const [index, setindex] = useState(0)

//     function nextMusic() {
//         // if (index === songs.length - 1) {
//         //     setindex(0);
//         // } else {
//         //     setindex(index + 1);
//         // }
//         // setselectedSong(songs[index]._id);
//         // setisPlaying(true);
//         if (index < songs.length - 1) {
//             setindex(index + 1);
//             setselectedSong(songs[index + 1]._id);
//         } else {
//             setindex(0);
//             setselectedSong(songs[0]._id);
//         }
//     }


//     function previousMusic() {
//         if(index === 0){
//             return null
//         }else{
//             setindex(index - 1)
//             setselectedSong(songs[index - 1]._id);
//         }
//     }


//     const [albumSong, setalbumSong] = useState([])
//     const [albumData, setalbumData] = useState([])

//     async function fetchAlbumSong(id) {
//         try {
//             const {data} = await axios.get("/api/song/album/"+id);
//             setalbumSong(data.songs);
//             setalbumData(data.album)
//         } catch (error) {
//             console.log(error)
//         }
//     }

// return <SongContext.Provider 
// value = {{
//     playSong,
//     pauseSong,
//     audioRef,
//     songs, 
//     addAlbum, 
//     loading, 
//     songLoading, 
//     albums, 
//     addSong, 
//     addThumbnail, 
//     deleteSong,
//     fetchSingSong,
//     song, 
//     setselectedSong,
//     isPlaying, 
//     setisPlaying,
//     selectedSong,
//     nextMusic,
//     previousMusic,
//     fetchAlbumSong,
//     albumSong,
//     albumData,
//     fetchSongs,
//     fetchAlbums
// }}>
//     {children}
//     </SongContext.Provider>
// };

// export const SongData = () => useContext(SongContext);


import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchNextSong } from "../components/NextSong";



const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [songs, setsongs] = useState([]);
    const [loading, setloading] = useState(false);
    const [songLoading, setsongLoading] = useState(true);
    const [song, setSong] = useState(null);
    const [isPlaylist, setIsPlaylist] = useState(false); // Whether the song is from the playlist
    const [playedSongs, setPlayedSongs] = useState([]);

    const audioRef = useRef(new Audio());
    const [selectedSong, setselectedSong] = useState(null);
    const [isPlaying, setisPlaying] = useState(false);

  

    const playSong = (song) => {
        if (!song) return;
    
        setselectedSong(song._id); // Update selected song
        setSong(song); // Set the song data for the player
    
        if (audioRef.current.src !== song.audio.url) {
            audioRef.current.src = song.audio.url; // Update the audio source
    
            // Add a listener to play the audio only after it is ready
            const onCanPlay = () => {
                audioRef.current.play()
                    .then(() => setisPlaying(true))
                    .catch((error) => console.error("Playback failed:", error));
                audioRef.current.removeEventListener("canplay", onCanPlay); // Clean up listener
            };
    
            audioRef.current.addEventListener("canplay", onCanPlay);
        } else {
            // If the source hasn't changed, directly play the audio
            audioRef.current.play()
                .then(() => setisPlaying(true))
                .catch((error) => console.error("Playback failed:", error));
        }
    };

    const setIsPlaylistFlag = (flag) => {
        setIsPlaylist(flag);
    };

    const pauseSong = () => {
        audioRef.current.pause();
        setisPlaying(false);
    };

    useEffect(() => {
        return () => {
            // Ensure audio stops when the component unmounts
            audioRef.current.pause();
        };
    }, []);

    async function fetchSongs() {
        try {
            const { data } = await axios.get("/api/song/all");
            setsongs(data);
            if (!selectedSong && data.length > 0) {
                setselectedSong(data[0]._id); // Set initial song if not already selected
            }
            setisPlaying(false);
        } catch (error) {
            console.log(error);
        }
    }




    async function fetchSingSong() {
        if (!selectedSong) return; // Ensure a valid song ID
        try {
            const { data } = await axios.get(`/api/song/single/${selectedSong}`);
            setSong(data);
        } catch (error) {
            console.log("Error fetching single song:", error);
        }
    }

    async function addAlbum(formData, setTitle, setDescription, setFile) {
        setloading(true);
        try {
            const { data } = await axios.post("/api/song/album/new", formData);
            toast.success(data.message);
            setloading(false);
            fetchAlbums();
            setTitle("");
            setDescription("");
            setFile(null);
        } catch (error) {
            toast.error(error.response.data.message);
            setloading(false);
        }
    }

    async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
        setloading(true);
        try {
            const { data } = await axios.post("/api/song/new", formData);
            toast.success(data.message);
            setloading(false);
            fetchSongs();
            setTitle("");
            setDescription("");
            setFile(null);
            setSinger("");
            setAlbum("");
        } catch (error) {
            toast.error(error.response.data.message);
            setloading(false);
        }
    }

    async function addThumbnail(id, formData, setFile) {
        setloading(true);
        try {
            const { data } = await axios.post(`/api/song/${id}`, formData);
            toast.success(data.message);
            setloading(false);
            fetchSongs();
            setFile(null);
        } catch (error) {
            toast.error(error.response.data.message);
            setloading(false);
        }
    }

    const [albums, setalbums] = useState([]);
    async function fetchAlbums() {
        try {
            const { data } = await axios.get("/api/song/album/all");
            setalbums(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSong(id) {
        try {
            const { data } = await axios.delete(`/api/song/${id}`);
            toast.success(data.message);
            fetchSongs();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, []);

    const [index, setindex] = useState(0);

   
    
    



async function nextMusic() {
    try {
        console.log("Fetching next recommended song...");
        
        const nextSong = await fetchNextSong(selectedSong, playedSongs);
        if (!nextSong) {
            console.log("No recommendations available.");
            return;
        }

        setindex((prevIndex) => prevIndex + 1);
        setselectedSong(nextSong._id);
        setPlayedSongs((prev) => [...prev, selectedSong]); // Track played songs
        setSong(nextSong);
        playSong(nextSong);

        console.log("Now playing:", nextSong.title);
    } catch (error) {
        console.error("Error fetching next song:", error);
    }
}


// const [playlistSongs, setPlaylistSongs] = useState([]);


// async function nextMusic() {
//     try {
//         console.log("Fetching next recommended song...");

//         let nextSong;
//         if (isPlaylist) {
//             // Handle next song from the playlist
//             const currentSongIndex = songs.findIndex((s) => s._id === selectedSong);
//             nextSong = songs[currentSongIndex + 1];
//             if (nextSong) {
//                 setselectedSong(nextSong._id);
//                 setPlayedSongs((prev) => [...prev, selectedSong]);
//                 setSong(nextSong);
//                 playSong(nextSong);
//                 console.log("Now playing from playlist:", nextSong.title);
//             } else {
//                 console.log("No more songs in the playlist.");
//             }
//         } else {
//             // Handle recommendation system for non-playlist mode
//             nextSong = await fetchNextSong(selectedSong, playedSongs);
//             if (!nextSong) {
//                 console.log("No recommendations available.");
//                 return;
//             }
//             setselectedSong(nextSong._id);
//             setPlayedSongs((prev) => [...prev, selectedSong]); // Track played songs
//             setSong(nextSong);
//             playSong(nextSong);
//             console.log("Now playing:", nextSong.title);
//         }
//     } catch (error) {
//         console.error("Error fetching next song:", error);
//     }
// }

    
    

    function previousMusic() {
        console.log("Previous button clicked! Current index:", index);
    
        if (!songs || songs.length === 0) {
            console.log("No songs available.");
            return;
        }
    
        setindex((prevIndex) => {
            if (prevIndex === 0) {
                console.log("Already at the first song.");
                return prevIndex; // Stay at 0, prevent negative index
            }
    
            const newIndex = prevIndex - 1;
            console.log("New index:", newIndex);
            setselectedSong(songs[newIndex]._id);
            setSong(songs[newIndex]);
            playSong(songs[newIndex]);
    
            return newIndex;
        });
    }

    // function previousMusic() {
    //     console.log("Previous button clicked! Current index:", songs.indexOf(selectedSong));

    //     if (!songs || songs.length === 0) {
    //         console.log("No songs available.");
    //         return;
    //     }

    //     if (isPlaylist) {
    //         // Handle previous song from the playlist
    //         const currentSongIndex = songs.findIndex((s) => s._id === selectedSong);
    //         const prevSong = songs[currentSongIndex - 1];
    //         if (prevSong) {
    //             setselectedSong(prevSong._id);
    //             setSong(prevSong);
    //             playSong(prevSong);
    //         }
    //     } else {
    //         // Handle previous song from recommendations
    //         setindex((prevIndex) => prevIndex - 1);
    //         setselectedSong(songs[index - 1]._id);
    //         setSong(songs[index - 1]);
    //         playSong(songs[index - 1]);
    //     }
    // }
    

    const [albumSong, setalbumSong] = useState([]);
    const [albumData, setalbumData] = useState([]);
    

    async function fetchAlbumSong(id) {
        try {
            const { data } = await axios.get(`/api/song/album/${id}`);
            setalbumSong(data.songs);
            setalbumData(data.album);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SongContext.Provider
            value={{
                playSong,
                pauseSong,
                audioRef,
                songs,
                addAlbum,
                loading,
                songLoading,
                albums,
                addSong,
                addThumbnail,
                deleteSong,
                fetchSingSong,
                song,
                setselectedSong,
                setIsPlaylistFlag,
                isPlaylist,
                isPlaying,
                setisPlaying,
                selectedSong,
                nextMusic,
                previousMusic,
                fetchAlbumSong,
                albumSong,
                albumData,
                fetchSongs,
                fetchAlbums,
            }}
        >
            {children}
        </SongContext.Provider>
    );
};

export const SongData = () => useContext(SongContext);

