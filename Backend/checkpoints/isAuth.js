import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from "dotenv";

export const isAuth = async(req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token) return res.status(500).json({
            message: "Please Login",
        });
        
        const decodeData = jwt.verify(token, process.env.Jwt_secret);

        if(!decodeData) return res.status(403).json({
            message: "Token Expired"
        });

        req.user = await User.findById(decodeData.id);

        next() 
    }catch (error) {
        res.status(500).json({
            message: "Please Login",

        })
    }
}