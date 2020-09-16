import axios from 'axios'



const houseActions = {
    getHouses: () => {
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/houses')
            const houses = response.data

            dispatch({
                type: 'GET_HOUSES',
                payload: houses.response
            })
            
        }
    },
    getHouseById: (houseId) => {
        
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/house/'+ houseId)
            
            const house = response.data.response

            dispatch({
                type: 'GET_HOUSE'
            })

            return (house)
        }
    },
    uploadHouse:(newHouse, token) =>{
        console.log(newHouse, token)
        return async (dispatch, getState)=>{
            const res = await axios.put('http://localhost:4000/api/houses',newHouse ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            dispatch({
                type: 'UPLOAD_HOUSE'
            })
            return(res.data.success)
        }
    },
    uploadViews: (houseId) =>{
        return async(dispatch, getState) =>{
            const res = await axios.get('http://localhost:4000/api/viewsHouse/'+houseId)
            console.log(res)
            dispatch({
                type:'UPLOAD_VIEWS'
            })
        }
    },
    getHouseByUser: (token) => {
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/houseByUser',{    
            headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            const housesUser = response.data
            dispatch({
                type:'GET_HOUSE_BY_USER',
                payload: housesUser.response
            })
            
            return (housesUser)
        }
    }
}

export default houseActions