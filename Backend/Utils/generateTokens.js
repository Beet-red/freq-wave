import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.Jwt_secret, {
        expiresIn : "30d"
    });

    res.cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
    });
    
};

export default generateToken;