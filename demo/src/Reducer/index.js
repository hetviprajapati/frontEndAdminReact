 import { combineReducers } from 'redux';
 import login from './reducerLogin/reducerLogin'
 import register from './reducerRegister/reducerRegister.js'
 import display from './reducerDisplay/reducerDisplay.js'


 export default combineReducers({ login ,register,display })