import {ADD_PLACE,DELETE_PLACE} from '../actions/actionTypes'
//-- image
import LiamImage from '../../../assets/images/liam.jpg'


const initialState = {
    place : [],
}
 const placeReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_PLACE : {
            return {
                place : state.place.concat({
                    ...action.placeData,
                    place:{
                        name : action.placeData.place.name,
                        id : Math.random().toString()
                    }
                })
            }
        }; 
        case DELETE_PLACE : {
            return{
                place : state.place.filter(arr =>{
                    return arr.place.id != action.id
                })
            }
        }
        default :{
            return initialState;
        }
    }
}

export default placeReducer