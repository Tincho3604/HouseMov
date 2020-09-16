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
    uploadHouse:(token) =>{
        return async (dispatch, getState)=>{
            await axios.post('http://localhost:4000/api/houses',{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({
                type: 'UPLOAD_HOUSE'
            })
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
    }
}

export default houseActions