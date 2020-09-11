const House = require('../models/HouseModel')


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

        var {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden} = req.body//destructuring
        const newHouse = new House({
            address, 
            neighborhood, 
            userId, 
            squareMeters, 
            bedrooms, 
            bathrooms, 
            price, 
            garden
        })
        try{
            await newHouse.save()
            res.json({
                success: true,
                response:"House uploaded"})
        }catch{
            res.json({
                success: false,
                response:"Error uploading house"})
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
        var {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden} = req.body
        
        try{
            await House.findOneAndUpdate(
                {_id:id},
                {address, neighborhood, userId, squareMeters, bedrooms, bathrooms, price, garden}
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
    getHouseById: async (res, req) =>{
        var id = req.params.id
        try{
            const data = await House.find({_id: id})
            res.json({
                success: true,
                response: data
            })
        }catch{
            res.json({
                success: false,
                response: "Error geting house"
            })
        }
    }

}



module.exports = houseController