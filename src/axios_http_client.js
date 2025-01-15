import axios from "axios";

const customInstance = axios.create({
    baseURL: 'https://davidwaga.pythonanywhere.com/api/v1/'
});


customInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default customInstance;
