import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});