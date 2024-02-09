import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export function generateToken(id){
    return jwt.sign({id},process.env.SECRET_KEY);
}

//authorization middleware

export function isAuthorized(req,res,next){
    const token =req.headers["x-auth-token"];
    if(!token){
        return res.status(400).json({error:"Access Denied"});
    }
    jwt.verify(token,process.env.SECRET_KEY)
    next();
}

// reset token
export function GenearateToken(id){
    return jwt.sign({ id }, process.env.key, { expiresIn: '5m' })
}

// Activation token
export function GenearateActiveToken(email){
    return jwt.sign({ email }, process.env.key, { expiresIn: '30m' })
}

// Session token
export function GenearateSessionToken(id){
    return jwt.sign({ id }, process.env.key)
}

// verify token
export function VerifyToken(token){
    return jwt.verify(token, process.env.key)
}