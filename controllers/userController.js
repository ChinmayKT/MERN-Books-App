const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    registerUser : async  (req,res)=> {
        try {
            // destructiring the req.body
            const {username , email , password , photoUrl} = req.body;

            // to find email already present or not
            const user = await Users.findOne({email:email})

            // if present throw error
            if(user) 
            res.status(500).json({msg:"The email already exists"})

            // if its new email , hash the password
            const passwordHash = await bcrypt.hash(password ,10)

            // asign the things in schema of Users 
            const newUser = new Users({
                username : username,
                email: email,
                password : passwordHash,
                photoUrl : photoUrl
            })

            // save the newUser data in database
            await newUser.save()

            
            res.json({ msg : "Register successful"})
        } catch (error) {

            return res.status(500).json({msg : error.message})
            
        }   
    }, 

    login : async  (req,res)=> {
           try {

            const {email , password} = req.body;

            const user = await Users.findOne({email:email})

            if(!user){
               return res.status(500).json({msg : "User does not exist"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(500).json({msg : "Incorrect password"})

            // if ismatch is true create token
            const payload = { id: user._id , name : user.username}
            const token = jwt.sign(payload , process.env.TOKEN_SECRET ,{expiresIn : "1d"} )


            
            res.json({token, msg : 'Login successful'})
            
        } catch (error) {

            return res.status(500).json({msg : error.message})
            
        }   
    },

    verifiedToken : (req,res) => {
        try {
            const token = req.header("Authorization")
            if(!token) return res.json({msg : "no token"})

            jwt.verify(token , process.env.TOKEN_SECRET,async (err, verified) => {
                if(err) return res.json({msg : "invalid token"})

                const user = await Users.findById(verified.id)
                if(!user) return res.json({msg : "no user found"})

                return res.json({msg: "verified"})
            } )
            
        } catch (error) {
            return res.status(500).json({msg :error.message})
        }
    },

    profile : async  (req,res)=> {
        try {
            const token = req.header("Authorization")
            if(!token) return res.json({msg : "no token"})

            jwt.verify(token , process.env.TOKEN_SECRET,async (err, verified) => {
                if(err) return res.json({msg : "invalid token"})

                const user = await Users.findById(verified.id)
                if(!user) return res.json({msg : "no user found"})

                return res.json({user})
            } )
            
        } catch (error) {
            return res.status(500).json({msg :error.message})
        }
    }
    ,
    editProfile : async  (req,res)=> {

        try {
            const {username ,email,photoUrl} = req.body
            const token = req.header("Authorization")
            if(!token) return res.json({msg : "no token"})
            jwt.verify(token , process.env.TOKEN_SECRET,async (err, verified) => {
                if(err) return res.json({msg : "invalid token"})
                const user = await Users.findById(verified.id)
                if(!user) return res.json({msg : "no user found"})

                const ProfileData = await Users.findByIdAndUpdate(user._id , {
                    username, email , photoUrl
                })

                
                
                return res.json({ProfileData})
            } )
            
        } catch (error) {
            return res.status(500).json({msg :error.message})
        }
    }

  

}

module.exports = userController