import * as serviceRegister from '../../Service/serviceRegister/seviceRegister'
import {POST_REQUEST,REGISTER_FAILED} from '../../Reducer/reducerRegister/reducerRegister.js'

export  const playerRegister=(credential)=>{
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{
        serviceRegister.create(credential)
        .then((response)=>{ 
            if(response.status===200){
                dispatch({
                    type:POST_REQUEST,
                    data:{resultcode:response.status}
                })
            }
            return resolve(response.status);
        })
        .catch((err)=>{
            if(err.response) {
                console.log(err.response)
               dispatch({
                   type:REGISTER_FAILED,
                   data:{resultcode:err.response.status}
               })
               return reject(err.response.status);
            }
        })     
        });
    }
};

