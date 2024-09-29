import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../Redux/app/hooks"
import { useEffect, useState } from "react";
import { getUser } from "../ApiGateways/user";
import { setLogOut, setUser } from "../Redux/features/userSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserDashboard from "../pages/User/UserDashboard/UserDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";

const Dashboard = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();

    const [userLoaded, setUserLoaded] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [role, setRole] = useState(null);


    useEffect(() => {
        getUser(
            (data) => {
                if (data?.success === true) {
                    localStorage.setItem("access_token", data?.token);
                    dispatch(setUser(data?.data));
                    setUserData(data);
                    setRole(data?.data?.role);
                }

                setUserLoaded(true);
            },
            (error) => {
                console.log(error, "THE EROR")
                setFetchError('No Internet, Please check connection');
                setUserLoaded(true);
            }
        );
    }, [dispatch]);


    if (fetchError) {
        dispatch(setLogOut());

        return (
            <div>
                <Typography variant="body1" color="error">
                    {fetchError}
                </Typography>
                <Navigate to="/login" state={{ from: location }} replace />;
            </div>
        );
    }


    if (!userLoaded) {
        return <Box sx={{ display: 'flex' }}>
            <div className=" w-full flex justify-center mt-[15vh]">
                <CircularProgress />
            </div>
        </Box>;
    }


    if (userData?.success !== true) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return (
        <>
            {
                role === 'user' &&
                <UserDashboard />
            }

            {
                role === 'admin' &&
                <AdminDashboard />
            }
        </>
    )
}

export default Dashboard
