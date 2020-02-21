import baseService from '../baseService';

export function fetch(){
    return baseService.get('/get');
}

export function playerDelete(credentials){
    return baseService.delete(`/delete/${credentials}`);
}

export function playerUpdate(id,credentials){
    return baseService.put(`/update/${id}`,credentials);
}