import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dtmoney-roan.vercel.app/api'
})