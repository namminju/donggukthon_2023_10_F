import axios from "axios";

export const API = axios.create({
  baseURL: "  http://13.125.221.36/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default API;

