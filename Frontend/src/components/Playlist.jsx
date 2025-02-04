// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // To make the API request
// import { UserData } from "../context/User"; // Assuming you have this context for user data
// import { SongData } from "../context/Song"; // Assuming you have a context for managing the song data

// const Playlist = () => {
//     const { user } = UserData(); // Get the user data
//     const [playlistSongs, setPlaylistSongs] = useState([]); // State to store playlist songs
//     const { setSong, playSong, setIsPlaylist } = SongData(); // Song context to play selected song and set playlist flag

//     // Fetch playlist songs when the component mounts
//     useEffect(() => {
//         if (user) {
//             const fetchPlaylistSongs = async () => {
//                 try {
//                     const response = await axios.get(`/api/playlist/${user._id}`);
//                     setPlaylistSongs(response.data); // Set playlist songs
//                 } catch (error) {
//                     console.error('Error fetching playlist songs:', error);
//                 }
//             };

//             fetchPlaylistSongs();
//         }
//     }, [user]);

//     // Handle playing a song when clicked
//     const handlePlaySong = (song) => {
//         setIsPlaylist(true);  // Set flag to indicate it's coming from the playlist
//         setSong(song); // Set the selected song
//         playSong(song); // Play the song
//     };

//     return (
//         <div>
//             <h2>My Playlist</h2>
//             <div className="playlist-container">
//                 {/* Display the playlist songs */}
//                 {playlistSongs.length > 0 ? (
//                     playlistSongs.map((song) => (
//                         <div
//                             key={song._id}
//                             className="playlist-song-item"
//                             onClick={() => handlePlaySong(song)}
//                         >
//                             <h3>{song.title}</h3>
//                             <p>{song.singer}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No songs in the playlist.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Playlist;
