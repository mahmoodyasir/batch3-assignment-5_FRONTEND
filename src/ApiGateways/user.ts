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
