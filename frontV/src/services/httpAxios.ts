import axios from "axios";

export const customAxios = axios.create({
  baseURL: 'https://localhost:7046/',
  headers:{
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
