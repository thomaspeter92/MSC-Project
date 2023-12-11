import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler} from "axios";


const axiosParams = {
  baseURL: 'http://127.0.0.1:8080/api/v1/'
}

const axiosInstance: AxiosInstance = axios.create(axiosParams)

const api = (axios: AxiosInstance) => {
  return {
    get:<T>(url: string, config: AxiosRequestConfig = {}) => {
      return axios.get<T>(url, config)
    },
    post: <T>(url: string, body: any, config: AxiosRequestConfig = {}) => {
      return axios.post<T>(url, body, config)
    }
  }
}

export default api(axiosInstance)