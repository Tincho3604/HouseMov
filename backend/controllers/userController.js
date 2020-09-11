const User = require('../models/userModel')


const userController={
    getUser: async (req, res) => {
        try{
            const data = await User.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading users"})
        }
    },
        
    uploadUser: async (req, res) => {

        var {name, photo, password, phone} = req.body//destructuring
        const newUser = new User({
            name,
            photo,
            password,
            phone
        })
        try{
            await newUser.save()
            res.json({
                success: true,
                response:"User uploaded"})
        }catch{
            res.json({
                success: false,
                response:"Error uploading user"})
        }
        
    },

    deleteUser: async (req, res) =>{
        var id = req.params.id
        try{
            await User.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "User Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting user"})
        }
    },

    modifyUser: async (req, res) => {
        var id= req.params.id
        var {name, photo, password, phone} = req.body
        
        try{
            await User.findOneAndUpdate(
                {_id:id},
                {name, photo, password, phone}
            )
            res.json({
                success: true,
                response: "User modified"
            })
        }catch{
            res.json({
                success: false,
                response:"Error modifying user"})
        }
    }

}



module.exports = userController