import baseService from '../baseService';

export function login(credentails){
    return baseService.post('/login',credentails);
}