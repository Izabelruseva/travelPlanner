import { cFetch } from "./interceptor";

export interface User {
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
}

export async function registerUser(user: User) {
    const endpoint = '/api/users/register';

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        return response.status;
    }

    const responseData = await response.json();

    localStorage.setItem("token", responseData.access_token);

    return responseData;
}

export async function loginUser(user: User) {
    const endpoint = '/api/users/login';

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        return response.status;
    }

    const responseData = await response.json();
    localStorage.setItem("token", responseData.access_token);

    return responseData;
}

export async function getUserProfile() {
    const endpoint = '/api/users/profile';

    const response = await cFetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        return 0;
    }

    const responseData = await response.json();

    return responseData;
}

export async function updateUserProfile(user: User) {
    const endpoint = '/api/users/profile';

    const response = await cFetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        response.status;
    }

    const responseData = await response.json();

    return responseData;
}

export async function deleteUserProfile() {
    const endpoint = '/api/users/profile';

    const response = await cFetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        response.status;
    }

    const responseData = await response.json();

    return responseData;
}