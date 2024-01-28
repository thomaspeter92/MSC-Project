import axios from 'axios';

// Flask microservice base URL
const BASE_URL = 'http://python-app:5000'; // Use the appropriate URL

// Create an Axios instance for the Flask microservice
const pythonService = axios.create({
  baseURL: BASE_URL,
  // You can add more default config here
});



export default pythonService;
