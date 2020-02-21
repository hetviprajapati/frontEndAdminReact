import * as serviceDisplay from '../../Service/serviceDisplay/serviceDisplay'
import {UPDATE_REQUEST,UPDATE_FAILED} from '../../Reducer/reducerDisplay/reducerDisplay.js'


export const playerUpdate=(id,credential)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
        serviceDisplay.playerUpdate(id,credential)
        .then((response)=>{
            if(response.status===200)
            {
                dispatch({
                    type:UPDATE_REQUEST,
                    data:{result:response.data,resultcode:response.status}
                })
            }
            return resolve(response.status);
        }).catch(err=>{
            dispatch({
                type:UPDATE_FAILED,
                data:{resultcode:err.response}
            })
            return reject(err.response.status);
        })
    })  
    }
}