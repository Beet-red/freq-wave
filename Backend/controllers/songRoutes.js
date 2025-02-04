import { Album } from "../models/Albums.js";
import { Song } from "../models/Song.js";
import TryCatch from "../Utils/tryCatch.js";
import getDataurl from "../Utils/urlgenarator.js";
import cloudinary from "cloudinary";


export const createnewAlbum = TryCatch(async(req, res) => {


   if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
  }

     if(req.user.role!== "admin") 
        return res.status(403).json({
        message: "You are not admin",
     });
     
     const {title, description} = req.body

     const file = req.file

     const fileUrl = getDataurl(file)

     const cloud = await cloudinary.v2.uploader.upload(fileUrl.content)

     await Album.create({
        title,
        description,
        thumbnail: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
     }),

     res.json({
        message:"Album Added",
     })

});


export const getAllAlbum = TryCatch(async(req, res) => {
   const albums = await Album.find()

   res.json(albums);

});

// export const addsong = TryCatch(async(req, res) => {
//    if(req.user.role !== "admin")
//       return res.status(403).json({
//       message: "You are not admin",
//       });

//       const {title, description, singer, album} = req.body

//      const file = req.file

//      const fileUrl = getDataurl(file)

//      const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
//       resource_type: "video",
//      });

//      await Song.create({
//       title,
//       description,
//       singer,
//       audio:{
//          id: cloud.public_id,
//          url: cloud.secure_url,
//       },
//       album,
//      });

//      res.json({
//       message:"Song Added",
//    })
// });


export const addsong = TryCatch(async (req, res) => {
   if (req.user.role !== "admin") {
       return res.status(403).json({ message: "You are not admin" });
   }

   const { title, description, singer, album, region, genre, language } = req.body;

   if (!req.file) {
       return res.status(400).json({ message: "No audio file uploaded" });
   }

   const file = req.file;
   const fileUrl = getDataurl(file);

   const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
       resource_type: "video"
   });

   const song = await Song.create({
       title,
       description,
       singer,
       album,
       region,
       genre,
       language,
       audio: {
           id: cloud.public_id,
           url: cloud.secure_url
       }
   });

   res.status(201).json({ message: "Song Added", song });
});


export const getPlaylistSongs = TryCatch(async (req, res) => {
   const { userId } = req.params;

   // Find the user and get their playlist
   const user = await User.findById(userId);
   if (!user) {
       return res.status(404).json({ message: "User not found" });
   }

   // Query songs associated with the user's playlist (songs in the playlist array)
   const songs = await Song.find({ '_id': { $in: user.playlist } });

   if (!songs || songs.length === 0) {
       return res.status(404).json({ message: "No songs found for this playlist" });
   }

   res.json(songs);
});


export const getRecommendations = async (req, res) => {
   try {
       const { region } = req.query; // Get region from query parameters
       if (!region) {
           return res.status(400).json({ message: "Region is required" });
       }

       // Fetch songs matching the region
       const recommendations = await Song.find({ region }).limit(10); // Adjust limit as needed
       if (recommendations.length === 0) {
           return res.status(404).json({ message: "No recommendations found" });
       }

       res.status(200).json(recommendations);
   } catch (error) {
       console.error("Error fetching recommendations:", error.message);
       res.status(500).json({ message: "Failed to fetch recommendations" });
   }
};

// export const getNextSong = TryCatch(async (req, res) => {
//    const { currentSongId } = req.params;

//    // Find the current song
//    const currentSong = await Song.findById(currentSongId);

//    if (!currentSong) {
//        return res.status(404).json({ message: "Current song not found" });
//    }

//    const { genre, region, language } = currentSong;

//    // Priority-based fetching
//    let nextSong = await Song.findOne({
//        _id: { $ne: currentSongId }, // Exclude the current song
//        genre: genre,
//    });

//    if (!nextSong) {
//        nextSong = await Song.findOne({
//            _id: { $ne: currentSongId },
//            region: region,
//        });
//    }

//    if (!nextSong) {
//        nextSong = await Song.findOne({
//            _id: { $ne: currentSongId },
//            language: language,
//        });
//    }

//    if (!nextSong) {
//        return res.status(404).json({ message: "No next song found" });
//    }

//    res.json(nextSong);
// });



// export const getNextSong = TryCatch(async (req, res) => {
//    const { currentSongId } = req.params;
//    const { playedSongs = [] } = req.query; // Accept previously played songs as a query parameter

//    // Find the current song
//    const currentSong = await Song.findById(currentSongId);
//    if (!currentSong) {
//        return res.status(404).json({ message: "Current song not found" });
//    }

//    const { genre, region, language } = currentSong;

//    // Combine all exclusion criteria
//    const exclusionCriteria = {
//        _id: { $nin: [currentSongId, ...playedSongs.map((id) => id)] }, // Exclude current and played songs
//    };

//    // Priority-based fetching
//    let nextSong = await Song.findOne({ ...exclusionCriteria, genre });

//    if (!nextSong) {
//        nextSong = await Song.findOne({ ...exclusionCriteria, region });
//    }

//    if (!nextSong) {
//        nextSong = await Song.findOne({ ...exclusionCriteria, language });
//    }

//    if (!nextSong) {
//        return res.status(404).json({ message: "No next song found" });
//    }

//    res.json(nextSong);
// });


// export const getNextSong = TryCatch(async (req, res) => {
//    const { currentSongId } = req.params;
//    const { playedSongs = "[]" } = req.query;

//    // Parse played songs from the query string
//    const playedSongsArray = JSON.parse(playedSongs);

//    // Find the current song
//    const currentSong = await Song.findById(currentSongId);
//    if (!currentSong) {
//        return res.status(404).json({ message: "Current song not found" });
//    }

//    const { genre, region, language } = currentSong;

//    // Exclude current and played songs
//    const exclusionCriteria = {
//        _id: { $nin: [currentSongId, ...playedSongsArray] },
//    };

//    // Find the next song based on priority (genre → region → language)
//    const nextSong = await Song.findOne({
//        ...exclusionCriteria,
//        $or: [{ genre }, { region }, { language }],
//    });

//    if (!nextSong) {
//        return res.status(404).json({ message: "No next song found"    });
//    }

//    res.json(nextSong);
// });


export const getNextSong = TryCatch(async (req, res) => {
   const { currentSongId } = req.params;
   const { playedSongs = "[]" } = req.query;

   // Parse played songs from the query string
   const playedSongsArray = JSON.parse(playedSongs);

   // Find the current song
   const currentSong = await Song.findById(currentSongId);
   if (!currentSong) {
       return res.status(404).json({ message: "Current song not found" });
   }

   const { genre, region, language } = currentSong;

   // Exclude current and played songs
   const exclusionCriteria = {
       _id: { $nin: [currentSongId, ...playedSongsArray] },
   };

   // Try to find the next song with all three matching criteria
   let nextSong = await Song.findOne({
       ...exclusionCriteria,
       genre,
       region,
       language,
   });

   if (!nextSong) {
       // If no song matches all three, try matching any two of the criteria
       nextSong = await Song.findOne({
           ...exclusionCriteria,
           $or: [
               { genre, region },
               { genre, language },
               { region, language },
           ]
       });
   }

   if (!nextSong) {
       // If no song matches two, fallback to matching any one of the criteria
       nextSong = await Song.findOne({
           ...exclusionCriteria,
           $or: [
               { genre },
               { region },
               { language },
           ]
       });
   }

   if (!nextSong) {
       return res.status(404).json({ message: "No next song found" });
   }

   res.json(nextSong);
});



// export const getNextSong = TryCatch(async (req, res) => {
//    const { currentSongId } = req.params;
//    console.log("Fetching next song for:", currentSongId);

//    const currentSong = await Song.findById(currentSongId);
//    if (!currentSong) {
//        console.log("Current song not found");
//        return res.status(404).json({ message: "Current song not found" });
//    }

//    console.log("Current song details:", currentSong);
//    const { genre, region, language } = currentSong;

//    let nextSong = await Song.findOne({ _id: { $ne: currentSongId }, genre });
//    console.log("Next song by genre:", nextSong);

//    if (!nextSong) {
//        nextSong = await Song.findOne({ _id: { $ne: currentSongId }, region });
//        console.log("Next song by region:", nextSong);
//    }

//    if (!nextSong) {
//        nextSong = await Song.findOne({ _id: { $ne: currentSongId }, language });
//        console.log("Next song by language:", nextSong);
//    }

//    if (!nextSong) {
//        console.log("No next song found");
//        return res.status(404).json({ message: "No next song found" });
//    }

//    res.json(nextSong);
// });


export const addThumbnail = TryCatch(async(req, res) => {
   if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
  }

     if(req.user.role!== "admin") 
        return res.status(403).json({
        message: "You are not admin",
     });
     

     const file = req.file

     const fileUrl = getDataurl(file)

     const cloud = await cloudinary.v2.uploader.upload(fileUrl.content)

     await Song.findByIdAndUpdate(req.params.id, {
      thumbnail: {
         id: cloud.public_id,
         url: cloud.secure_url,         
      },
     },
     {new: true}
   );


   res.json({
      messaage: "Thumbnail Added"
   })
});

export const getAllSongs = TryCatch(async(req, res) => {
   const songs = await Song.find()

   res.json(songs);
});


export const getAllSongsByAlbum = TryCatch(async (req, res) => {
   const album = await Album.findById(req.params.id)
   const songs = await Song.find({ album: req.params.id })


   res.json({album, songs });
});


export const deleteSong = TryCatch(async (req, res)=> {
   const song = await Song.findById(req.params.id)

   await song.deleteOne()

   res.json({message: "Song Deleted"})
})

export const getSingleSong = TryCatch(async(req, res)=> {
   const song = await Song.findById(req.params.id);

   res.json(song);
})