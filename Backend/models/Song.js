import mongoose from "mongoose";

// const schema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     singer: {
//         type: String,
//         required: true,
//     },
//     thumbnail: {
//         id: String,
//         url: String,
//     },
//     audio: {
//         id: String,
//         url: String,
//     },
//     album: {
//         type: String,
//         required: true,
//     },

// },{
//     timestamps: true,
// }
// );

// export const Song = mongoose.model("Song", schema)



const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
    thumbnail: {
        id: String,
        url: String,
    },
    audio: {
        id: String,
        url: String,
    },
    album: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const Song = mongoose.model("Song", schema);
