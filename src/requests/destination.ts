import { cFetch } from "./interceptor";

export interface Destination {
    id?: number;
    name?: string;
    coordinates?: string;
    description?: string;
    tripId?: number;
}

export async function createDestination(destination: Destination) {
    const endpoint = '/api/destinations/create';

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination)
    });

    const responseData = await response.json();

    return responseData;
}

export async function getAllDestinations() {
    const endpoint = '/api/destinations';

    const response = await cFetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const responseData = await response.json();

    return responseData;
}

export async function getDestinationsByTrip(tripId: number) {
    const endpoint = `/api/destinations/${tripId}`;

    const response = await cFetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const responseData = await response.json();

    return responseData;
}

export async function updateDestination(tripId: number, destinationId: number, destination: Destination) {
    const endpoint = `/api/destinations/${tripId}/destinations/${destinationId}`;

    const response = await cFetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination)
    });

    const responseData = await response.json();

    return responseData;
}

export async function deleteDestination(tripId: number, destinationId: number) {
    const endpoint = `/api/destinations/${tripId}/destinations/${destinationId}`;

    const response = await cFetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const responseData = await response.json();

    return responseData;
}
