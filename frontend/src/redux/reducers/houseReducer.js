const initialState = {
    houses:[]
}

const houseReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GETINFO':
            
            return {
                ...state, 
                houses: action.payload
            }    
            
        default: 
            return state    
    }
    
}


export default houseReducer