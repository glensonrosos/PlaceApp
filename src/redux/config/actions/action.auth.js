import {TRY_AUTH} from './actionTypes'

export const tryAuth = userData =>{
    return{
        type:TRY_AUTH,
        userData,
    }
}