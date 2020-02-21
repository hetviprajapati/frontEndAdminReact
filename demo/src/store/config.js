import { applyMiddleware,compose,createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducer/index.js';


const composeEnhancer = 
    typeof window==='object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose ;

const enhanser=composeEnhancer(
    applyMiddleware(thunk)
)

const token=localStorage.getItem('token');
const role=localStorage.getItem('role');
const INTIAL_STATE={
    login:{
        token:"",
        role:"",
        err_msg:""
    }
}

if(token && role)
{
     INTIAL_STATE.login.token=token
     INTIAL_STATE.login.role=role
}
export default createStore(rootReducer,INTIAL_STATE,enhanser);