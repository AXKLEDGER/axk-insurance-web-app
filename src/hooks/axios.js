import axios from 'axios';
import { DevelopmentUrl, ProductionUrl } from 'utils/constants';
let ApiUrl = "";
let access_token = "";

if (typeof window != "undefined") {
  access_token = localStorage.getItem("access_token") || "";
  if (window.location.origin.includes("localhost")) {
    ApiUrl = DevelopmentUrl;
    // ApiUrl = ProductionUrl;
  } else {
    ApiUrl = ProductionUrl;
  }
}

const instance = axios.create({
  baseURL: ApiUrl,
  timeout: 20000, // Timeout after 20 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(async (request) => {
  var access_token = "";
  if (typeof window !== "undefined") {
    access_token = localStorage.getItem("access_token") || "";
    if (access_token) {
      request.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return request;
});

// Request Interceptor
// instance.interceptors.request.use(
//   (config) => {
//     if (isBrowser) {
//       const token = sessionStorage.getItem('access_token') || '';
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error.message);
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle Unauthorized Access
          // sessionStorage.removeItem('user');
          // sessionStorage.removeItem('access_token');
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          console.warn("Unauthorized: User's session has expired or is invalid.");
          break;
        case 500:
          console.error('Server Error: Please try again later.');
          break;
        default:
          console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } else {
      console.error('Network Error: Check your internet connection.');
    }
    return Promise.reject(error);
  }
);

export default instance;
