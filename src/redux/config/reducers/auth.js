import {TRY_AUTH} from '../actions/actionTypes'

const initialState = {
    auth : {},
}
 const authReducer = (state = initialState,action) =>{
    switch(action.type){
        case TRY_AUTH : {
            return {
                auth : {
                    ...state.auth,
                    userData : action.userData,
                }
            }
        };
        default :{
            return initialState;
        }
    }
}

export default authReducer;