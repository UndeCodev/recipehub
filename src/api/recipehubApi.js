import axios from 'axios';

const recipehubApi = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://recipehub-api.onrender.com'
});

export default recipehubApi;