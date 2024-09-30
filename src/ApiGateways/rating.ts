import { url } from "../config";

export const createRating = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/ratings/create-rating`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(body)
            });

        const jsonData = await response.json();
        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    }
    catch (err) {
        handleError(err)
    }
};


export const getAllRating = async (
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/ratings/get-rating`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

        const jsonData = await response.json();
        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    }
    catch (err) {
        handleError(err)
    }
};