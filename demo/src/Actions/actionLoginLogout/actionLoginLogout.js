import jwt from 'jwt-decode'

// import {loginUser} from './types.js'
import {LOGIN_SUCCESSFUL,INVALID_USER,LOGOUT} from '../../Reducer/reducerLogin/reducerLogin.js'
import * as loginService from '../../Service/serviceLogin/serviceLogin.js'


export const loginUser=(credential)=>{ 
    return (dispatch)=>{
        loginService.login(credential)
        .then((response)=>{
            if(response.status===200){
                 let data=jwt(response.data);
                localStorage.setItem("token",response.data)
                localStorage.setItem("role",data.role)
                dispatch({
                    type:LOGIN_SUCCESSFUL,
                    data:{token:response.data ,role:data.role,err_msg:""}
                })
            }
        })
        .catch((err)=>{
            if(err.response) {
                dispatch({ type:INVALID_USER,data:{token:"",role:"",err_msg:err.response.data}})
            }        
        });
    }
};

export const logoutUser=()=>{
    return (dispatch)=>{
        dispatch({
            type:LOGOUT
         });
         localStorage.removeItem('token');
         localStorage.removeItem('role');
    }
};
