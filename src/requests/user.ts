const config = require('../config/config.json');

interface User {
    firstName?: string;
    lastName?: string;
    password: string;
    email: string;
}

export async function registerUser(user: User) {
    const endpoint = config.backendUrl + '/api/users/register';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to register user.');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {

        throw error;
    }
}

export async function loginUser(user: User) {
    const endpoint = config.backendUrl + '/api/users/login';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to register user.');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {

        throw error;
    }
}

export async function getUserProfile(token: string) {
    const endpoint = config.backendUrl + '/api/users/profile';

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user profile.');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {

        throw error;
    }
}

export async function updateUserProfile(user: User, token: string) {
    const endpoint = config.backendUrl + '/api/users/profile';

    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile.');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {

        throw error;
    }
}

export async function deleteUserProfile(token: string) {
    const endpoint = config.backendUrl + '/api/users/profile';

    try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete user profile.');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {

        throw error;
    }
}