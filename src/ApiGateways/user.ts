import { url } from "../config";


export const loginUser = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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


export const getUser = (handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    fetch(`${url}/api/auth/fetchUser`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error('Network request failed');
            } else {
                return res.json();
            }
        })
        .then((data) => {
            handleSuccess(data);
        })
        .catch((error) => {
            handleError(error.message);
        });
}

export const updateUser = async (
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {

    try {
        const response = await fetch(`${url}/api/auth/update`,
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
