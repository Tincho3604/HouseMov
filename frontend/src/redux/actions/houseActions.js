import axios from 'axios'



const houseActions = {
    getHouses: () => {
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/houses')
            const houses = response.data

            dispatch({
                type: 'GET_HOUSES',
                payload: houses
            })
            
        }
    },
    getHouseById: (houseId) => {
        
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/house/'+ houseId)
            const house = response.data

            dispatch({
                type: 'GET_HOUSE'
            })

            return (house)
        }
    }
}

export default houseActions