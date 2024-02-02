import axios from "axios";

// Flask microservice base URL
const BASE_URL = "http://python-app:5000"; // Use the appropriate URL

//Axios instance for the Flask microservice
const pythonService = axios.create({
  baseURL: BASE_URL,
});

export default pythonService;
