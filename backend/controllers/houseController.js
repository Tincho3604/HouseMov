const House = require('../models/HouseModel')
const User = require('../models/userModel')


const houseController={
    getHouse: async (req, res) => {
        try{
            const data = await House.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading Houses"})
        }
    },
        
    uploadHouse: async (req, res) => {

        var {address, neighborhood, squareMeters, bedrooms, bathrooms, price, garden, userId, photo, photo2, views} = req.body//destructuring
        /* var userId = req.body.user */
        const newHouse = new House({
            address, 
            neighborhood, 
            userId, 
            squareMeters, 
            bedrooms, 
            bathrooms, 
            price, 
            garden,
            photo,
            photo2,
            views
        })
        try{
            await newHouse.save()
            res.json({
                success: true,
                response:"House uploaded"})
        }catch(error){
            res.json({
                success: false,
                response:error})
        }
        
    },

    deleteHouse: async (req, res) =>{
        var id = req.params.id
        try{
            await House.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "House Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting House"})
        }
    },

    modifyHouse: async (req, res) => {
        var id= req.params.id
        var {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden, date} = req.body
        
        try{
            await House.findOneAndUpdate(
                {_id:id},
                {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden, date}
            )
            res.json({
                success: true,
                response: "House modified"
            })
        }catch{
            res.json({
                success: false,
                response:"Error modifying House"})
        }
    },
     getHouseById: async (req, res) =>{
        var id = req.params.id
        try{
            const house = await House.findOne({_id: id})
            console.log(house)
            const user = await User.findOne({_id: house.userId})
            const dataUser={
                name: user.name,
                surname: user.surname,
                mail: user.mail
            }
            res.json({
                success: true,
                response: {
                    house,
                    dataUser
                }
                
            })
        }catch{
            res.json({
                success: false,
                response: "Error geting house"
            })
        }
    },
    uploadViews: async (req, res) =>{
        var id = req.params.id
        try{
            const house = await House.findOne({_id:id})
            var views = house.views += 1
            await House.updateOne({_id:id},{views})
            res.json({
                success: true,
                response: "viewed"
            })
        }catch(error){
            res.json({
                success: false,
                response: error
            })
        }
    }
    

}



module.exports = houseController