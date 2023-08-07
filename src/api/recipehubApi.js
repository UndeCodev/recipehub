import axios from 'axios';

const recipehubApi = axios.create({
    baseURL: 'http://localhost:3000'
});

export default recipehubApi;