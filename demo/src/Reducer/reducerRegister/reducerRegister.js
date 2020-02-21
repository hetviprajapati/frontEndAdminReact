const INITIAL_STATE={
   result:[],
   resultcode:'',
   err_msg:''
}
export const POST_REQUEST='POST_REQUEST';
export const REGISTER_FAILED='REGISTER_FAILED';


export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case POST_REQUEST:{
            return Object.assign({},state,{result:action.data.result,resultcode:action.data.resultcode});
        }
        case REGISTER_FAILED:{
             return Object.assign({},state,{resultcode:action.data.resultcode});
        }
        default:
            return state; 
    }
}