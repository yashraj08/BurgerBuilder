import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://my-burger-app-41778.firebaseio.com/'
});
export default instance;