import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for handling cookies if Better Auth uses them
});

// Request interceptor to add token if it exists
http.interceptors.request.use(
    (config) => {
        const session = localStorage.getItem('kilat-session');
        if (session) {
            try {
                const parsedSession = JSON.parse(session);
                if (parsedSession.token) {
                    config.headers.Authorization = `Bearer ${parsedSession.token}`;
                }
            } catch (e) {
                // Invalid session data
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
http.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized (token expired, etc.)
        if (error.response && error.response.status === 401) {
            // Optional: Clear session and redirect to login
            // localStorage.removeItem('kilat-session');
            // window.location.href = '/login';
        }

        // Extract error message
        const message = error.response?.data?.message || error.response?.data?.error?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

export default http;
