import axios from 'axios';

// const backend_URL_dict: {[id: string]: string} = {
//   "lab_computer": "140.112.20.130:8080/api",
//   "lab_server": "",
//   "vercel": "",
//   "local": "http://localhost:8080/api"
// };

export const url =
process.env.NODE_ENV === 'production' ? 'https://joinus-backend.onrender.com/api' : 'http://localhost:8080/api';
  // process.env.BACKEND_URL || 'http://localhost:8080/api';

// console.log(process.env.BACKEND_URL);
// console.log(url);

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
