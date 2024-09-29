import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layout/UserLayout/UserLayout";
import Homes from "../pages/Home/Homes";
import Login from "../pages/Home/Authentication/Login";
import SignUp from "../pages/Home/Authentication/SignUp";
import Dashboard from "./Dashboard";
import Services from "../pages/Services/Services";

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
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/services",
                element: <Services />
            },
        ]
    }
]);

export default router;