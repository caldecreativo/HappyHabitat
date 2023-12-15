import axios from "axios";
// import { userStore } from '../store/user.store'; 

// Base URL for API request
const baseUrl = 'http://localhost:8081';

// Define request object to Axios request
export const request = {
    // Method for GET request
    get(url) {
        return axios.get(baseUrl + url).then(handleResponse).catch(handleError);
    },
    // Method for POST request
    post(url, body) {
        return axios.post(baseUrl + url, body).then(handleResponse).catch(handleError);
    },
    // Methods for PUT request
    put(url, body) {
        return axios.put(baseUrl + url, body).then(handleResponse).catch(handleError);
    },
    // Method for DELETE request
    delete(url) {
        return axios.delete(baseUrl + url).then(handleResponse).catch(handleError);
    }
};

// Handle succes response
function handleResponse(response) {
    return response.data;
}

// function handleError(error) {
//     const authStore = userStore();
//     if (error.response) {
//         const { status } = error.response;
//         if ([401, 403].includes(status) && authStore.user) {
//             // Auto logout hvis 401 Unauthorized eller 403 Forbidden response returneres fra API
//             authStore.logout();
//         }
//     }
//     // Kast fejlen videre, så den kan blive fanget hvor anmodningen blev lavet
//     return Promise.reject(error);
// }