const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const JWT_SECRET= process.env.JWT_SECRET;

const router = express.Router();

router.post("/admin",async (req,res)=>{
    const {username,password} = req.body;
    try{
        const admin = await username.findone({username});
        if(!admin){
            res.status(404).send({message:"Admin not found"})

        }
        if(username.password !== admin.password){
            res.status(401).send({message:"invalid password!"})
        }

        const token = jwt.sign(
            {id:admin._id, username:admin.username, role: admin.role},
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        return res.status(200).json({
            message: "authenticated successfully",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({message: "Failed to login as admin "})
    }
})

module.exports = router;