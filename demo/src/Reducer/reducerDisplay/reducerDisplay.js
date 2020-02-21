const INITIAL_STATE={
   result:[],
   resultcode:'',
   err_msg:''
}

export const FETCH_REQUEST='FETCH_REQUEST';
export const FETCH_FAILED='REGISTER_FAILED';

export const DELETE_REQUEST='DELETE_REQUEST';
export const DELETE_FAILED='DELETE_FAILED';

export const UPDATE_REQUEST='UPDATE_REQUEST';
export const UPDATE_FAILED='UPDATE_FAILED';

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FETCH_REQUEST:{
            return Object.assign({},state,{result:action.data.result});
        }
         case FETCH_FAILED:{
             return Object.assign({},state,{resultcode:action.data.resultcode});
        }

        case DELETE_REQUEST:{
            debugger;
             let data = action.data.result;
             return Object.assign({},state,{resultcode:action.data.resultcode,result:state.result.filter(res=>res._id !== data._id)});
        }
        case DELETE_FAILED:{
            return Object.assign({},state,{resultcode:action.data.resultcode});
        }

        case UPDATE_REQUEST:{
             return Object.assign({}, state, {result: state.result.map(res => {
                   return res._id === action.data.result._id ? action.data.result : res;
               })
             })
        }
        case UPDATE_FAILED:{
            return Object.assign({},state,{resultcode:action.data.resultcode});
        }
        
        default:
            return state; 
    }
}
 