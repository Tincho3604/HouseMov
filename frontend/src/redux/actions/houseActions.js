import axios from 'axios'



const houseActions = {
    //Obtengo todas las casas
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
    //Obtengo una casa mediante su id
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
    //Cargar una casa
    uploadHouse:(newHouse, token) =>{
      
        return async (dispatch, getState)=>{
            const res = await axios.put('http://localhost:4000/api/houses',newHouse ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            dispatch({
                type: 'UPLOAD_HOUSE'
            })
            return(res.data.success)
        }
    },
    //Aumentar las vistas de una casa
    uploadViews: (houseId) =>{
        return async(dispatch, getState) =>{
            const res = await axios.get('http://localhost:4000/api/viewsHouse/'+houseId)
    
            dispatch({
                type:'UPLOAD_VIEWS'
            })
        }
    },
    //Obtener las casas asociadas a un usuario
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
    },
    //Modificar una casa ya cargada
    sendModifyHouse:(house, id) =>{
        return async (dispatch, getState) =>{
            const response = await axios.put('http://localhost:4000/api/house/'+ id, house)
            dispatch({
                type: "MODIFY_HOUSE"
            })
            return response
        }
    },
    //Enviar el mail con contraseña nueva
    sendMail:(mail) =>{

        return async (dispatch, getState) =>{
            const response = await axios.put('http://localhost:4000/api/sendMail',{mail})
         
                dispatch({
                    type:"SEND_MAIL"
                })
                return response.data.success
        }
    }
}

export default houseActions