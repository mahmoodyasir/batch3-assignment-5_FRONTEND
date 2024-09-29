import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layout/UserLayout/UserLayout";
import Homes from "../pages/Home/Homes";
import Login from "../pages/Home/Authentication/Login";
import SignUp from "../pages/Home/Authentication/SignUp";


const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Homes />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
        ]
    }
]);

export default router;