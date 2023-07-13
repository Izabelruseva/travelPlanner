import { cFetch } from "./interceptor";

export interface Destination {
    id?: number;
    name?: string;
    coordinates?: string;
    description?: string;
    tripId?: number;
}

export async function getCountryName(latitude: string, longitude: string) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const country = data.address?.country;

    return country ? country : 'Unknown Country';
}


export async function createDestination(destination: Destination) {
    const endpoint = '/api/destinations/create';

    const [latitude, longitude] = destination.coordinates?.split(' ') || [];

    if (!destination.name && latitude && longitude) {
        const country = await getCountryName(latitude, longitude);
        destination.name = `Destination to ${country}`;
    }

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination)
    });

    if (!response.ok) {
        response.status;
    }


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

    if (!response.ok) {
        response.status;
    }

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

    if (!response.ok) {
        response.status;
    }

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

    if (!response.ok) {
        response.status;
    }

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

    if (!response.ok) {
        response.status;
    }

    const responseData = await response.json();

    return responseData;
}
