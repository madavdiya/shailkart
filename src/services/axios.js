import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies();

axios.interceptors.request.use(function (config) {
    const token = cookies.get('token')
    if (token)
        config.headers.authorization = `Bearer ${token}`;
    return config;
});


export default axios