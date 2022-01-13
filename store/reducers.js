import { SET_USER_UID,SET_IS_LOADING } from "./actions";



const initialState = {
    userUid: '',
    isLoading: true,
}

function userReducer(state = initialState,action){
    switch(action.type){
        case SET_USER_UID:
            return {...state,userUid:action.payload};
            case SET_IS_LOADING:
                return {...state,isLoading:action.payload}
            default:
                return state; 
    }
}

export default userReducer;