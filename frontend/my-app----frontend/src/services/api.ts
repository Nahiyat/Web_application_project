/*
import axios from "axios";
//const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'
const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export default api;
*/
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;