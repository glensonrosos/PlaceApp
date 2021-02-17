import {ADD_PLACE,DELETE_PLACE} from './actionTypes'

export const addPlace = placeData =>{
    return{
        type:ADD_PLACE,
        placeData,
    }
}

export const deletePlace = id =>{
    return{
        type:DELETE_PLACE,
        id,
    }
}