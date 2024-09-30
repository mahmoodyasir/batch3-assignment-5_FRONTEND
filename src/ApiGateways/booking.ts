import { url } from "../config";

export const bookingService = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/bookings`,
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

export const getMyBookings = async (
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/my-bookings`,
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