import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-2d489.firebaseio.com',
    //baseURL: 'https://myburger.firebaseio.com',
});

export default instance;