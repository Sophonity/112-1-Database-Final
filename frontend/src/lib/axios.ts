import axios from 'axios';

// const backend_URL_dict: {[id: string]: string} = {
//   "lab_computer": "140.112.20.130:8080/api",
//   "lab_server": "",
//   "vercel": "",
//   "local": "http://localhost:8080/api"
// };

export const url =
  // process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:8080/api';
  process.env.BACKEND_URL || 'http://140.112.20.130:8080/api';

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
