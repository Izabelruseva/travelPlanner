import { cFetch } from "./interceptor";

export interface Comment {
    text?: string;
}

export async function addComment(tripId: number, comment: Comment) {
    const endpoint = `/api/trips/${tripId}/comments`;

    const response = await cFetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });

    if (!response.ok) {
        throw new Error('Failed to add comment.');
    }

    const responseData = await response.json();

    return responseData;
}

export async function getAllComments(tripId: number) {
    const endpoint = `/api/trips/${tripId}/comments`;

    const response = await cFetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to get comments.');
    }

    const responseData = await response.json();

    return responseData;
}

export async function updateComment(commentId: number, comment: Comment) {
    const endpoint = `/api/trips/comments/${commentId}`;

    const response = await cFetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });

    if (!response.ok) {
        throw new Error('Failed to update comment.');
    }

    const responseData = await response.json();

    return responseData;
}

export async function deleteComment(commentId: number) {
    const endpoint = `/api/trips/comments/${commentId}`;

    const response = await cFetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete comment.');
    }

    const responseData = await response.json();

    return responseData;
}
