// import React, { useEffect, useRef, useState } from 'react'
// import { SongData } from '../context/Song';
// import {GrChapterNext, GrChapterPrevious } from "react-icons/gr"
// import { FaPlay, FaPause, FaRedo, FaRandom } from "react-icons/fa";
// const Player = () => {
//   const { song, fetchSingSong, selectedSong, isPlaying, setisPlaying, nextMusic,previousMusic } = SongData();
//   console.log(song);

//   useEffect(() => {
//     fetchSingSong(); 
  
//   }, [selectedSong])
  
//   const audioRef = useRef(null)

//   const handlePlayPause = () => {
//     if(isPlaying){
//       audioRef.current.pause();
//     }else{
//       audioRef.current.play().catch((error) => {
//         console.error("Playback failed:", error);
//     });;
//     }
//     setisPlaying(!isPlaying);
//   };

//   const [volume, setVolume] = useState(1)

//   const handleVolumeChange = (e) => {
//     const newVolume = e.target.value;
//     setVolume(newVolume)
//     audioRef.current.volume = newVolume;
//   }

//   const [progress, setProgress] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const [isRepeating, setisRepeating] = useState(false)
//   const [isshuffling, setisShuffling] = useState(false)

//   useEffect(() => {
//     const audio = audioRef.current

//     if(!audio) return;

//     const handleKLoadedMetaData = () => {
//       setDuration(audio.duration)
//     }

//     const handleTimeUpdate = () => {
//       setProgress(audio.currentTime);
//     };

//     audio.addEventListener("loadedmetadata", handleKLoadedMetaData)
//     audio.addEventListener("timeupdate", handleTimeUpdate)
//     audio.addEventListener("ended", handleSongs);

//     return () => {
//       audio.removeEventListener("loadedmetadata", handleKLoadedMetaData)
//       audio.removeEventListener("timeupdate", handleTimeUpdate)
//       audio.addEventListener("ended", handleSongs);      
//     }
//   },[song, isPlaying]);


//   const handleprogressChange = (e) => {
//     const newTime = (e.target.value/100) * duration;
//     audioRef.current.currentTime = newTime;
//     setProgress(newTime);
//   }

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const toggleRepeat = () => {
//     setisRepeating(prev => !prev); 
//   };

//   const toggleShuffle = () => {
//     setisShuffling(!isshuffling);
//   }

//   const handleSongs = () => {
//     if (isRepeating) {
//         audioRef.current.currentTime = 0; // Reset to the start of the song
//         audioRef.current.play().catch((error) => {
//           console.error("Playback failed:", error); // Log any playback errors
//       });;
//         setProgress(0); // Play the song again
//     } else {
//         nextMusic(); // Proceed to the next song
//     }
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//         audio.src = song.audio ? song.audio.url : '';
//         audio.volume = volume; // Set volume when song changes
//         if (isPlaying) {
//             audio.play().catch((error) => {
//                 console.error("Playback failed:", error);
//             });
//         }
//     }
// }, [song, isPlaying, volume]);



//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//         const handleEnd = () => {
//             if (isRepeating) {
//                 handleSongs(); // Call handleSongs to repeat
//             } else {
//                 nextMusic(); // Move to the next song
//             }
//         };

//         audio.addEventListener("ended", handleEnd);
//         return () => {
//             audio.removeEventListener("ended", handleEnd); // Clean up listener
//         };
//     }
// }, [isRepeating]);



//   return (
//     <div>
//       {
//         song && ( <div className=' h-[10] bg-black flex justify-between items-center text-white px-4 '>
//             <div className="lg flex items-center gap-4">
//               <img src={song.thumbnail ? song.thumbnail.url :  "https://via.placeholder.com/50"} 
//               className='w-12'
//               alt=''/>
//               <div className="hidden md:block">
//                 <p>{song.title}</p>
//                 <p>{song.description && song.description.slice(0,10)}...</p>
//               </div>
//             </div>
//             <div className="flex flex-col items-center gap-1 m-auto">
//                 {
//                   song && song.audio &&
//                   (
//                   <>
//                   {isPlaying? 
//                   (
//                   <audio ref={audioRef} src={song.audio.url} autoPlay/>
//                   ):(<audio ref={audioRef} src={song.audio.url} />
//                   )
//                 }
//                   </>
//                 )}
//                 <div className='flex justify-center items-center gap-4'>
//                   <audio 
//                         ref={audioRef}
//                         src={song.audio ? song.audio.url : null} 
//                         autoPlay={isPlaying} 
//                         onEnded={handleSongs}  
//                   />
//                   <span className='control-button' onClick={toggleShuffle}>
//                     <FaRandom style={{ color: isshuffling ? 'green' : 'white' }} />
//                   </span>
//                   <span className='control-button' onClick={previousMusic}>
//                     <GrChapterPrevious />
//                   </span>
//                   <button onClick={handlePlayPause} className='play-pause-button'>
//                     {isPlaying ? <FaPause/> : <FaPlay/>}
//                   </button>
//                   <span className='control-button' onClick={nextMusic}>
//                     <GrChapterNext />
//                   </span>
//                   <span className='control-button' onClick={toggleRepeat}>
//                     <FaRedo style={{ color: isRepeating ? 'green' : 'white' }} />
//                   </span>
//                 </div>                
//                 <div className="w-full flex items-center font-thin text-green-400 gap-4">
//                   <span className="time-display">{formatTime(progress)}</span>
//                   <input type='range' min={"0"} max={"100"}
//                   className='spotify-progress-bar w-[120px] md:w-[300px]'
//                   value={(progress/duration) *100} 
//                   onChange={handleprogressChange}
//                   style={{ '--value': (progress / duration) * 100 }} 
//                   />
//                   <span className="time-display ">{formatTime(duration - progress)}</span>
//                 </div>
//                 <hr/>

//             </div>
//             <div className="flex items-center">
//                 <input 
//                 type='range' 
//                 className='w-16 md:32' 
//                 min={"0"} 
//                 max={"1"} 
//                 step={"0.01"}
//                 value={volume}
//                 onChange={handleVolumeChange}
//                />
//             </div>     
//           </div>
//       )}
//     </div>
//   );
// };

// export default Player;



import React, { useEffect, useRef, useState } from 'react';
import { SongData } from '../context/Song';
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPlay, FaPause, FaRedo, FaRandom } from "react-icons/fa";
import { IoVolumeHigh, IoVolumeMedium, IoVolumeMute } from "react-icons/io5";



const Player = () => {
    const { song, fetchSingSong, selectedSong, isPlaying, setisPlaying, playSong, pauseSong, audioRef, nextMusic, previousMusic } = SongData();
    
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeating, setisRepeating] = useState(false);

    useEffect(() => {
        fetchSingSong();
    }, [selectedSong]);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            // Load metadata and set duration
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
            };

            // Update progress as audio plays
            const handleTimeUpdate = () => {
                setProgress(audio.currentTime);
            };

            // End of the song
            const handleEnded = () => {
                if (isRepeating) {
                    audio.currentTime = 0;
                    audio.play();
                } else {
                    nextMusic();
                }
            };

            audio.addEventListener("loadedmetadata", handleLoadedMetadata);
            audio.addEventListener("timeupdate", handleTimeUpdate);
            audio.addEventListener("ended", handleEnded);

            return () => {
                audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
                audio.removeEventListener("timeupdate", handleTimeUpdate);
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, [song, isPlaying, isRepeating, nextMusic]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((error) => console.error("Playback failed:", error));
        }
        setisPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const renderVolumeIcon = () => {
        if (volume <= 0) {
          return <IoVolumeMute />;
        } else if (volume <= 0.5) {
          return <IoVolumeMedium />;
        } else {
          return <IoVolumeHigh />;
        }
      };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };

    const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          };

    return (
      <div className="player-container " >
      {song ? ( // Check if song is defined
          <div className=' bg-black flex justify-between items-center text-white px-4'>
              <div className="flex items-center gap-4">
                  {/* Ensure song.thumbnail is defined before accessing url */}
                  <img 
                      src={song.thumbnail ? song.thumbnail.url : "https://via.placeholder.com/50"} 
                      className='w-12' 
                      alt='' 
                  />
                  <div className="hidden md:block ">
                      <p>{song.title}</p>
                      <p>{song.description ? song.description.slice(0, 10) : ''}...</p>
                  </div>
              </div>
              <div className="flex flex-col items-center gap-1 m-auto ">
                  <audio ref={audioRef} src={song.audio ? song.audio.url : ''} autoPlay={isPlaying} />
                  <div className='flex justify-center items-center gap-4'>
                        <span className='control-button' 
                        // onClick={toggleShuffle}
                        >
                          <FaRandom
                            // style={{ color: isshuffling ? 'green' : 'white' }} 
                            />
                        </span>
                      <span className='control-button' onClick={previousMusic}>
                          <GrChapterPrevious />
                      </span>
                      <button onClick={handlePlayPause} className='play-pause-button'>
                          {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      <span className='control-button' onClick={nextMusic}>
                          <GrChapterNext />
                      </span>
                      <span className='control-button' onClick={() => setisRepeating(prev => !prev)}>
                          <FaRedo style={{ color: isRepeating ? 'green' : 'white' }} />
                      </span>
                  </div>
                  <div className="w-full flex items-center font-thin text-green-400 gap-4">
                        <span className="time-display">{formatTime(progress)}</span>
                          <input type='range' min={"0"} max={"100"}
                          className='spotify-progress-bar w-[120px] md:w-[300px]'
                          value={duration ? (progress / duration) * 100 : 0} // Prevent division by zero
                          onChange={handleProgressChange}
                          style={{ '--value': duration ? (progress / duration) * 100 : 0 }} />
                          <span className="time-display ">{formatTime(duration - progress)}</span>
                  </div>
                </div>
                    <div className="volume-bar">
                        <span className='mr-3 font-bold text-2xl'>
                            {renderVolumeIcon()}
                        </span> 
                        <input
                            type="range"
                            className="volume-slider"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ backgroundSize: `${volume * 100}% 100%` }} // Controls fill background
                        />
                </div>
                  
          </div>
      ) : (
          <p>Loading song...</p> // Optional: Provide a loading state
      )}
  </div>
    );
};

export default Player;


// import React, { useEffect, useRef, useState } from 'react';
// import { SongData } from '../context/Song';
// import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
// import { FaPlay, FaPause, FaRedo, FaRandom } from "react-icons/fa";
// import { IoVolumeHigh, IoVolumeMedium, IoVolumeMute } from "react-icons/io5";



// const Player = () => {
//     const { song, fetchSingleSong, selectedSong, isPlaying, setisPlaying, nextMusic, previousMusic } = SongData();
//     const audioRef = useRef(null);
    
//     const [volume, setVolume] = useState(1);
//     const [progress, setProgress] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isRepeating, setisRepeating] = useState(false);

//     useEffect(() => {
//         fetchSingleSong();
//     }, [selectedSong]);

//     useEffect(() => {
//         const audio = audioRef.current;

//         if (audio) {
//             // Load metadata and set duration
//             const handleLoadedMetadata = () => {
//                 setDuration(audio.duration);
//             };

//             // Update progress as audio plays
//             const handleTimeUpdate = () => {
//                 setProgress(audio.currentTime);
//             };

//             // End of the song
//             const handleEnded = () => {
//                 if (isRepeating) {
//                     audio.currentTime = 0;
//                     audio.play();
//                 } else {
//                     nextMusic();
//                 }
//             };

//             audio.addEventListener("loadedmetadata", handleLoadedMetadata);
//             audio.addEventListener("timeupdate", handleTimeUpdate);
//             audio.addEventListener("ended", handleEnded);

//             return () => {
//                 audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
//                 audio.removeEventListener("timeupdate", handleTimeUpdate);
//                 audio.removeEventListener("ended", handleEnded);
//             };
//         }
//     }, [song, isPlaying, isRepeating]);

//     const handlePlayPause = () => {
//         if (isPlaying) {
//             audioRef.current.pause();
//         } else {
//             audioRef.current.play().catch((error) => console.error("Playback failed:", error));
//         }
//         setisPlaying(!isPlaying);
//     };

//     const handleVolumeChange = (e) => {
//         const newVolume = e.target.value;
//         setVolume(newVolume);
//         if (audioRef.current) {
//             audioRef.current.volume = newVolume;
//         }
//     };

//     const renderVolumeIcon = () => {
//         if (volume <= 0) {
//           return <IoVolumeMute />;
//         } else if (volume <= 0.5) {
//           return <IoVolumeMedium />;
//         } else {
//           return <IoVolumeHigh />;
//         }
//       };

//     const handleProgressChange = (e) => {
//         const newTime = (e.target.value / 100) * duration;
//         if (audioRef.current) {
//             audioRef.current.currentTime = newTime;
//             setProgress(newTime);
//         }
//     };

//     const formatTime = (time) => {
//             const minutes = Math.floor(time / 60);
//             const seconds = Math.floor(time % 60);
//             return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//           };

//     return (
//       <div>
//       {song ? ( // Check if song is defined
//           <div className='h-[10] bg-black flex justify-between items-center text-white px-4'>
//               <div className="flex items-center gap-4">
//                   {/* Ensure song.thumbnail is defined before accessing url */}
//                   <img 
//                       src={song.thumbnail ? song.thumbnail.url : "https://via.placeholder.com/50"} 
//                       className='w-12' 
//                       alt='' 
//                   />
//                   <div className="hidden md:block ">
//                       <p>{song.title}</p>
//                       <p>{song.description ? song.description.slice(0, 10) : ''}...</p>
//                   </div>
//               </div>
//               <div className="flex flex-col items-center gap-1 m-auto ">
//                   <audio ref={audioRef} src={song.audio ? song.audio.url : ''} autoPlay={isPlaying} />
//                   <div className='flex justify-center items-center gap-4'>
//                         <span className='control-button' 
//                         // onClick={toggleShuffle}
//                         >
//                           <FaRandom
//                             // style={{ color: isshuffling ? 'green' : 'white' }} 
//                             />
//                         </span>
//                       <span className='control-button' onClick={previousMusic}>
//                           <GrChapterPrevious />
//                       </span>
//                       <button onClick={handlePlayPause} className='play-pause-button'>
//                           {isPlaying ? <FaPause /> : <FaPlay />}
//                       </button>
//                       <span className='control-button' onClick={nextMusic}>
//                           <GrChapterNext />
//                       </span>
//                       <span className='control-button' onClick={() => setisRepeating(prev => !prev)}>
//                           <FaRedo style={{ color: isRepeating ? 'green' : 'white' }} />
//                       </span>
//                   </div>
//                   <div className="w-full flex items-center font-thin text-green-400 gap-4">
//                         <span className="time-display">{formatTime(progress)}</span>
//                           <input type='range' min={"0"} max={"100"}
//                           className='spotify-progress-bar w-[120px] md:w-[300px]'
//                           value={duration ? (progress / duration) * 100 : 0} // Prevent division by zero
//                           onChange={handleProgressChange}
//                           style={{ '--value': duration ? (progress / duration) * 100 : 0 }} />
//                           <span className="time-display ">{formatTime(duration - progress)}</span>
//                   </div>
//                 </div>
//                     <div className="volume-bar">
//                         <span className='mr-3 font-bold text-2xl'>
//                             {renderVolumeIcon()}
//                         </span> 
//                         <input
//                             type="range"
//                             className="volume-slider"
//                             min="0"
//                             max="1"
//                             step="0.01"
//                             value={volume}
//                             onChange={handleVolumeChange}
//                             style={{ backgroundSize: `${volume * 100}% 100%` }} // Controls fill background
//                         />
//                 </div>
                  
//           </div>
//       ) : (
//           <p>Loading song...</p> // Optional: Provide a loading state
//       )}
//   </div>
//     );
// };

// export default Player;

// import React, { useEffect, useState } from 'react';
// import { SongData } from '../context/Song';
// import { GrChapterNext, GrChapterPrevious } from 'react-icons/gr';
// import { FaPlay, FaPause, FaRedo, FaRandom } from 'react-icons/fa';
// import { IoVolumeHigh, IoVolumeMedium, IoVolumeMute } from 'react-icons/io5';

// const Player = () => {
//     const {
//         song,
//         fetchSingSong,
//         selectedSong,
//         isPlaying,
//         playSong,
//         pauseSong,
//         audioRef,
//         nextMusic,
//         previousMusic,
//     } = SongData();

//     const [volume, setVolume] = useState(1);
//     const [progress, setProgress] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isRepeating, setisRepeating] = useState(false);

//     // useEffect(() => {
//     //     fetchSingSong();
//     // }, [selectedSong]);

//     useEffect(() => {
//         if (selectedSong) fetchSingSong();
//     }, [selectedSong]);

//     useEffect(() => {
//         if (song?.audio?.url) {
//             playSong(song.audio.url);
//         }
//     }, [song]);

//     useEffect(() => {
//         const audio = audioRef.current;

//         if (!audio) return;

//         const handleLoadedMetadata = () => setDuration(audio.duration);
//         const handleTimeUpdate = () => setProgress(audio.currentTime);
//         const handleEnded = () => {
//             if (isRepeating) {
//                 audio.currentTime = 0;
//                 audio.play();
//             } else {
//                 nextMusic();
//             }
//         };

//         audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//         audio.addEventListener('timeupdate', handleTimeUpdate);
//         audio.addEventListener('ended', handleEnded);

//         return () => {
//             audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//             audio.removeEventListener('timeupdate', handleTimeUpdate);
//             audio.removeEventListener('ended', handleEnded);
//         };
//     }, [audioRef, isRepeating, nextMusic]);

//     const handlePlayPause = () => {
//         if (isPlaying) {
//             pauseSong();
//         } else {
//             playSong(song.audio.url);
//         }
//     };

//     const handleVolumeChange = (e) => {
//         const newVolume = e.target.value;
//         setVolume(newVolume);
//         if (audioRef.current) {
//             audioRef.current.volume = newVolume;
//         }
//     };

//     const renderVolumeIcon = () => {
//         if (volume <= 0) {
//             return <IoVolumeMute />;
//         } else if (volume <= 0.5) {
//             return <IoVolumeMedium />;
//         } else {
//             return <IoVolumeHigh />;
//         }
//     };

//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };

//     const handleProgressChange = (e) => {
//         const newTime = (e.target.value / 100) * duration;
//         if (audioRef.current) {
//             audioRef.current.currentTime = newTime;
//             setProgress(newTime);
//         }
//     };

//     return (
//         <div>
//             {song ? (
//                 <div className="h-[10] bg-black flex justify-between items-center text-white px-4">
//                     <div className="flex items-center gap-4">
//                         <img
//                             src={song.thumbnail ? song.thumbnail.url : 'https://via.placeholder.com/50'}
//                             className="w-12"
//                             alt=""
//                         />
//                         <div className="hidden md:block">
//                             <p>{song.title}</p>
//                             <p>{song.description ? song.description.slice(0, 10) : ''}...</p>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 m-auto">
//                         <div className="flex justify-center items-center gap-4">
//                             <span className="control-button">
//                                 <FaRandom />
//                             </span>
//                             <span className="control-button" onClick={previousMusic}>
//                                 <GrChapterPrevious />
//                             </span>
//                             <button onClick={handlePlayPause} className="play-pause-button">
//                                 {isPlaying ? <FaPause /> : <FaPlay />}
//                             </button>
//                             <span className="control-button" onClick={nextMusic}>
//                                 <GrChapterNext />
//                             </span>
//                             <span className="control-button" onClick={() => setisRepeating((prev) => !prev)}>
//                                 <FaRedo style={{ color: isRepeating ? 'green' : 'white' }} />
//                             </span>
//                         </div>
//                         <div className="w-full flex items-center font-thin text-green-400 gap-4">
//                             <span className="time-display">{formatTime(progress)}</span>
//                             <input
//                                 type="range"
//                                 min="0"
//                                 max="100"
//                                 className="spotify-progress-bar w-[120px] md:w-[300px]"
//                                 value={duration ? (progress / duration) * 100 : 0}
//                                 onChange={handleProgressChange}
//                             />
//                             <span className="time-display">{formatTime(duration - progress)}</span>
//                         </div>
//                     </div>
//                     <div className="volume-bar">
//                         <span className="mr-3 font-bold text-2xl">{renderVolumeIcon()}</span>
//                         <input
//                             type="range"
//                             className="volume-slider"
//                             min="0"
//                             max="1"
//                             step="0.01"
//                             value={volume}
//                             onChange={handleVolumeChange}
//                         />
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading song...</p>
//             )}
//         </div>
//     );
// };

// export default Player;