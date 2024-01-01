import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from "axios";
import { getUserToken } from "./firebaseService";

interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

const axiosParams = {
  baseURL: "http://127.0.0.1:8080/api/v1/",
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(async (req) => {
  const token = await getUserToken();
  console.log(token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const handleApiResponse = (res: any) => {
  console.log(res)
  if(res.data) {
    return res.data
  } else { 
    throw new Error('failed')
  }
}

const api = (axios: AxiosInstance) => {
  return {
    get: async <T>(url: string, config: AxiosRequestConfig = {}) => {

      const res = await axios.get<ApiResponse<T>>(url, config);
      return handleApiResponse(res);

    },
    post: async <T>(url: string, body: any, config: AxiosRequestConfig = {}) => {
      const res = await axios.post<ApiResponse<T>>(url, body, config);
      return handleApiResponse(res);

    },
  };
};

export default api(axiosInstance);
