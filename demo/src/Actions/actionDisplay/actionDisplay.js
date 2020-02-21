import * as serviceDisplay from '../../Service/serviceDisplay/serviceDisplay'
import {FETCH_REQUEST,FETCH_FAILED,DELETE_REQUEST,DELETE_FAILED} from '../../Reducer/reducerDisplay/reducerDisplay.js'

export const playerDisplay=()=>{
    return (dispatch)=>{
        return new Promise((resolve,reject)=>{
        serviceDisplay.fetch()
        .then((response)=>{
            if(response.status===200)
            {
                dispatch({
                    type:FETCH_REQUEST,
                    data:{result:response.data}
                })
            }
            return resolve(response.status);
        }).catch(err=>{
           dispatch({
                    type:FETCH_FAILED,
                    data:{resultcode:err.response}
            })
            return reject(err.response);
        })
    })
    }
  
}

export const playerDelete=(credential)=>{
    return(dispatch)=>{
        return new Promise((resolve,reject)=>{
        serviceDisplay.playerDelete(credential)
        .then((response)=>{
            if(response.status===200)
            {
                dispatch({
                    type:DELETE_REQUEST,
                    data:{result:response.data,resultcode:response.status}
                })
            }
            return resolve(response.status);
        }).catch(err=>{
            dispatch({
                type:DELETE_FAILED,
                data:{resultcode:err.response}
            })
            return reject(err.response);
        })
    })
    }
}

