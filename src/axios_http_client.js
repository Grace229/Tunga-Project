import axios from "axios";

const customInstance = axios.create({
    baseURL: 'https://davidwaga.pythonanywhere.com/api/v1/'
});

export default customInstance;
