
import axios from 'axios';

// initializing the axios instance with custom configs
const api = axios.create({
   withCredentials: true,
   baseURL: "http://localhost:8000",
  // adding a custom language header  
});

export default api;