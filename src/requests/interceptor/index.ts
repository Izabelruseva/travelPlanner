const config = require('../../config/config.json');

export const cFetch = async (url: string, options: any) => {
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    const response = await fetch(`${config.backendUrl}${url}`, options);

    return response;
};
