import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const protect = async (req, res, next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.json({
            success:false,
            message: "Not authorized"
        })
    }

    try {
        const userId=jwt.decode(token, process.env.JWT_SECRET)
        if(!userId){
            return res.json({
                success:false,
                message: "Not authorized"
            })
        }

        req.user=await User.findById(userId).select('-passoword')
        next()
    } catch (error) {
        return res.json({
            success:false,
            message: "Not authorized"
        })
    }

    
}