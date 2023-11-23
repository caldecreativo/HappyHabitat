import axios from "axios";
import { userStore } from '../store/user.store'; // Importér din userStore

const baseUrl = 'http://localhost:8081';

export const request = {
    get(url) {
        return axios.get(baseUrl + url).then(handleResponse).catch(handleError);
    },
    post(url, body) {
        return axios.post(baseUrl + url, body).then(handleResponse).catch(handleError);
    },
    put(url, body) {
        return axios.put(baseUrl + url, body).then(handleResponse).catch(handleError);
    },
    delete(url) {
        return axios.delete(baseUrl + url).then(handleResponse).catch(handleError);
    }
};

function handleResponse(response) {
    return response.data;
}

function handleError(error) {
    const authStore = userStore();
    if (error.response) {
        const { status } = error.response;
        if ([401, 403].includes(status) && authStore.user) {
            // Auto logout hvis 401 Unauthorized eller 403 Forbidden response returneres fra API
            authStore.logout();
        }
    }
    // Kast fejlen videre, så den kan blive fanget hvor anmodningen blev lavet
    return Promise.reject(error);
}