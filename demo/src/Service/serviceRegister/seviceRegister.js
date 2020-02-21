import baseService from '../baseService';

export function create(credentails){
    return baseService.post('/create',credentails);
}