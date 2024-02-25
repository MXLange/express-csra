import axios from 'axios';

export default class AxiosInstance {
  getConnection() {
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        timeout: 5000
    });
    axiosInstance.defaults.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json", 
    }
    return axiosInstance;
  }
}