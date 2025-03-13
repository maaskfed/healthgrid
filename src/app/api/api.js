import axios from 'axios';

const API = axios.create({
    baseURL: 'https://healthgridnodeapp.onrender.com', // Update with your backend URL
    withCredentials: true, // Important for cookies
});

// Function to refresh the access token
export const refreshAccessToken = async () => {
    try {
        const response = await API.get('/refresh'); // Calls the refresh token route
        console.log(response)
        return response.data.accessToken;
    } catch (error) {
        console.error('Refresh token failed', error);
        return null;
    }
};

// Axios interceptor to attach access token and refresh it automatically
API.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken'); // Store accessToken in local storage

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the token expired, attempt to refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                API.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
