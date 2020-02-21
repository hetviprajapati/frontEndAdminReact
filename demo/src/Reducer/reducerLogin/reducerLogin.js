const INITIAL_STATE={
    token:"",
    role:"",
    err_msg:""
}
export const LOGIN_SUCCESSFUL='LOGIN_SUCCESSFUL';
export const INVALID_USER='INVALID_USER';
export const LOGOUT='LOGOUT';

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case LOGIN_SUCCESSFUL:{
            return Object.assign({},state,{token:action.data.token,role:action.data.role});
        }
        case INVALID_USER:{
            return Object.assign({},state,{err_msg:action.data.err_msg});
        }
        case LOGOUT:{
            return Object.assign({},state,{token:"",role:""});
        }
        default:
            return state; 
    }
}