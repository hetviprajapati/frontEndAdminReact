import axios from 'axios';

export const baseurl='http://localhost:3001/player';

const baseService=axios.create({
    baseURL:baseurl
})
export default baseService;