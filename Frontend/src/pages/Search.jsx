// import React from 'react'
// import Layout from '../components/Layout';
// const Search = () => {
//   return (
//     <div>
//       <Layout>

//       </Layout>
//     </div>
//   )
// }

// export default Search;

// import React, { useState } from "react";
// import Layout from "../components/Layout";
// import { assets } from "../assets/assets.js"; // For consistent styling, ensure asset imports

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [filteredSongs, setFilteredSongs] = useState([]);

//   // Sample database of songs
//   const songs = [
//     { name: "Athma Rama", thumbnail: assets.song_thumbnail1 },
//     { name: "A Million Dreams", thumbnail: assets.song_thumbnail2 },
//     { name: "Believe", thumbnail: assets.song_thumbnail3 },
//     { name: "All of Me", thumbnail: assets.song_thumbnail4 },
//     { name: "Alive", thumbnail: assets.song_thumbnail5 },
//   ];

//   const handleSearch = (e) => {
//     const searchQuery = e.target.value;
//     setQuery(searchQuery);

//     if (searchQuery.trim() === "") {
//       setFilteredSongs([]);
//       return;
//     }

//     const results = songs.filter((song) =>
//       song.name.toLowerCase().startsWith(searchQuery.toLowerCase())
//     );
//     setFilteredSongs(results);
//   };

//   return (
//     <div className="search-page">
//       <Layout>
//         <div className="search-container">
//           <input
//             type="text"
//             id="search-bar"
//             placeholder="Search for songs..."
//             value={query}
//             onChange={handleSearch}
//             className="search-input"
//           />
//           <div className="results-container">
//             {filteredSongs.length > 0 ? (
//               filteredSongs.map((song, index) => (
//                 <div key={index} className="result-item">
//                   <img src={song.thumbnail} alt={song.name} className="thumbnail" />
//                   <span>{song.name}</span>
//                 </div>
//               ))
//             ) : query ? (
//               <div className="result-item">No results found</div>
//             ) : null}
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Search;

// import React, { useState } from "react";
// import Layout from "../components/Layout";
// import { SongData } from "../context/Song"; // Import SongData context

// const Search = () => {
//   const { songs } = SongData(); // Fetch songs from SongData context
//   const [query, setQuery] = useState("");
//   const [filteredSongs, setFilteredSongs] = useState([]);

//   // Handle search input changes and filter songs
//   const handleSearch = (e) => {
//     const searchQuery = e.target.value;
//     setQuery(searchQuery);

//     if (searchQuery.trim() === "") {
//       setFilteredSongs([]);
//       return;
//     }

//     const results = songs.filter((song) =>
//       song.title.toLowerCase().startsWith(searchQuery.toLowerCase())
//     );
//     setFilteredSongs(results);
//   };

//   return (
//     <Layout>
//       <div className="search-container">
//         <input
//           type="text"
//           id="search-bar"
//           placeholder="Search for songs..."
//           value={query}
//           onChange={handleSearch}
//           className="search-input"
//         />
//         <div className="results-container">
//           {filteredSongs.length > 0 ? (
//             filteredSongs.map((song, index) => (
//               <div key={index} className="result-item">
//                 <img
//                   src={song.thumbnail.url}
//                   alt={song.title}
//                   className="thumbnail"
//                 />
//                 <span>{song.title}</span>
//               </div>
//             ))
//           ) : query ? (
//             <div className="result-item">No results found</div>
//           ) : null}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Search;



import React, { useState } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song"; // Import SongData context

const Search = () => {
  const { songs, playSong } = SongData(); // Access songs and playSong function from context
  const [query, setQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Handle search input changes and filter songs
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredSongs([]);
      return;
    }

    const results = songs.filter((song) =>
      song.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredSongs(results);
  };

  // Handle song click to play
  const handleSongClick = (song) => {
    playSong(song); // Set the clicked song in the context
  };

  return (
    <Layout>
      <div className="search-container">
        <input
          type="text"
          id="search-bar"
          placeholder="Search for songs..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="results-container">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div
                key={index}
                className="result-item cursor-pointer"
                onClick={() => handleSongClick(song)} // Play the clicked song
              >
                <img
                  src={song.thumbnail.url}
                  alt={song.title}
                  className="thumbnail"
                />
                <span>{song.title}</span>
              </div>
            ))
          ) : query ? (
            <div className="result-item">No results found</div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Search;



