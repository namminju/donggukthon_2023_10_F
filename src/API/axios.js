import axios from "axios";

export const API = axios.create({
  baseURL: "/localhost:8080/api",

  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default API;

