import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // URL backend Laravel
});

export default Api;
