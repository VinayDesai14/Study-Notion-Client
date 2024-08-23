import axios from "axios";

// Function to check if the token has expired
function isTokenExpired() {
    const expirationTime = localStorage.getItem('tokenExpirationTime');
    if (!expirationTime) return true;
    return Date.now() > parseInt(expirationTime, 10);
}

// Function to log out the user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationTime');
    window.location.href = '/login'; // Redirect to login page
}

// Create an Axios instance
export const axiosInstance = axios.create({});

// Set up a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.requiresAuth) {
            if (isTokenExpired()) {
                logout();
                return Promise.reject(new Error('Token expired'));
            }
            // const token = localStorage.getItem('token');
            // if (token) {
            //     config.headers['Authorization'] = `Bearer ${token}`;
            // }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set up a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);


export const apiConnector = (method, url, bodyData, headers, params,requiresAuth = true) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
        requiresAuth: requiresAuth
    });
}