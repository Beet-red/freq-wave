import express from 'express';
import { isAuth } from '../checkpoints/isAuth.js';
import uploadFile from '../checkpoints/multer.js';
import { addsong, addThumbnail, createnewAlbum, deleteSong, getAllAlbum, getAllSongs, getAllSongsByAlbum, getSingleSong, getNextSong, getRecommendations, getPlaylistSongs } from '../controllers/songControl.js';


const router = express.Router();

router.post("/album/new", isAuth, uploadFile, createnewAlbum);
router.get("/album/all", isAuth, getAllAlbum );
router.post("/new", isAuth, uploadFile, addsong);
router.post("/:id", isAuth, uploadFile, addThumbnail);
router.get("/single/:id", isAuth,  getSingleSong);
router.delete("/:id", isAuth, deleteSong);
router.get("/all", isAuth, getAllSongs);
router.get("/album/:id", isAuth, getAllSongsByAlbum)
router.get("/next/:currentSongId", getNextSong);
router.get("/songs/recommendations", getRecommendations);
// router.get("/playlist/:userId", isAuth, getPlaylistSongs);


export default router;
