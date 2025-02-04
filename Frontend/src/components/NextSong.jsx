import axios from "axios";

// export const fetchNextSong = async (currentSongId) => {
//     try {
//         const { data } = await axios.get(`/api/song/next/${currentSongId}`);
//         return data;
//     } catch (error) {
//         console.error("Error fetching next song:", error.response?.data?.message || error.message);
//         throw error;
//     }
// };


// export const fetchNextSong = async(currentSongId) => {
//     try {
//         const response = await fetch(`/api/song/next/${currentSongId}`);
//         console.log("API response status:", response.status);

//         if (!response.ok) {
//             throw new Error(`API error: ${response.statusText}`);
//         }

//         const song = await response.json();
//         console.log("Fetched song:", song);
//         return song;
//     } catch (error) {
//         console.error("Error fetching next song:", error);
//         return null;
//     }
// }


export const fetchNextSong = async (currentSongId, playedSongs) => {
    try {
        // Serialize playedSongs as JSON string
        const query = new URLSearchParams({ playedSongs: JSON.stringify(playedSongs) });

        const response = await fetch(`/api/song/next/${currentSongId}?${query}`);
        console.log("API response status:", response.status);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const song = await response.json();
        console.log("Fetched song:", song);
        return song;
    } catch (error) {
        console.error("Error fetching next song:", error);
        return null;
    }
};



// export const fetchNextSong = async(currentSongId) => {
//     try {
//         const response = await axios.get(`/api/song/next/${currentSongId}`);
//         const data = await response.json();
//         if (response.ok) {
//             return data;
//         } else {
//             throw new Error(data.message || "Failed to fetch next song");
//         }
//     } catch (error) {
//         console.error("Error fetching next song:", error.message);
//     }
//}
