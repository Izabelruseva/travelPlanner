import { Destination } from "./destination";
import { Image } from "./image";
import { cFetch } from "./interceptor";

export interface Trip {
    id?: number;
    destinations?: Destination[];
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    images?: Image[];
    budget?: number;
}

export async function createTrip(trip: Trip) {
    const endpoint = `/api/trips/create`;

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip)
    });

    if (!response.ok) {
        response.status;
    }

    return 200;
}

export async function getTrips(userId: number) {
    const endpoint = `/api/trips/${userId}`;

    const response = await cFetch(endpoint, {
        method: 'GET',
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

export async function getAllTrips() {
    const endpoint = `/api/trips/`;

    const response = await cFetch(endpoint, {
        method: 'GET',
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

export async function updateTrip(tripId: number, trip: Trip) {
    const endpoint = `/api/trips/${tripId}`;

    const response = await cFetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trip)
    });

    if (!response.ok) {
        response.status;
    }

    const responseData = await response.json();

    return responseData;
}

export async function deleteTrip(tripId: number) {
    const endpoint = `/api/trips/${tripId}`;

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

export async function likeTrip(tripId: number) {
    const endpoint = `/api/trips/${tripId}/like`;

    const response = await cFetch(endpoint, {
        method: 'POST',
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

export async function search(query: string) {
    const endpoint = `/api/trips/?q=${query}&page=1&pageSize=10`

    const response = await cFetch(endpoint, {
        method: 'GET',
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