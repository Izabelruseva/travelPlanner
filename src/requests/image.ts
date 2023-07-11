import { cFetch } from "./interceptor";

export interface Image {
    id?: number;
    base64?: string;
    tripId?: number;
}

export async function uploadImage(tripId: number, image: Image) {
    const endpoint = `/api/trips/${tripId}/images`;

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image)
    });

    if (!response.ok) {
        throw new Error('Failed to upload image.');
    }

    const responseData = await response.json();

    return responseData;
}

export async function getAllImages(tripId: number) {
    const endpoint = `/api/trips/${tripId}/images`;

    const response = await cFetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to get images.');
    }

    const responseData = await response.json();

    return responseData;
}

export async function deleteImage(tripId: number, imageId: number) {
    const endpoint = `/api/trips/${tripId}/images/${imageId}`;

    const response = await cFetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete image.');
    }

    const responseData = await response.json();

    return responseData;
}
