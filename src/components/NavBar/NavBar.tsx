import { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import logo from '../../static/image/car-wash.png'
import { useAppSelector } from "../../Redux/app/hooks";
import { Logout } from "@mui/icons-material";


const NavBar = () => {

    const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const navItems = [
        { name: "Services", url: "/services" },
        { name: "Booking", url: "/booking" },
        { name: "Login", url: "/login" },
        ...(isLoggedIn ? [{ name: "Dashboard", url: "/dashboard" }] : []),
    ]

    const drawerItems = (
        <div style={{ width: "15rem", height: "100vh" }} className="">
            <IconButton onClick={() => toggleDrawer(false)} className="ml-auto">
                <CloseIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
            <List className="flex flex-col space-y-2 mt-4">
                {
                    navItems?.map((item, i) => (
                        <ListItem key={i}>
                            <Button onClick={() => navigate(item?.url)} sx={{ width: "100vw", color: "black" }}><ListItemText primary={item?.name} /></Button>
                        </ListItem>
                    ))
                }

            </List>
        </div>
    );

    return (
        <>
            <AppBar position="static" className=" bg-violet-500">
                <Toolbar className="flex content-center items-center gap-7">

                    {/* Mobile Menu Icon */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => toggleDrawer(true)}
                        className="md:hidden"
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className="flex gap-[4rem] w-full">
                        <div onClick={() => navigate('/')} className="flex items-center gap-4 cursor-pointer">
                            <img className="w-10 h-10" src={logo} alt="" />
                            <Typography className="text-2xl">Car Wash</Typography>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex gap-2">
                            {
                                navItems?.map((item, i) => (
                                    <Button onClick={() => navigate(item?.url)} key={i} className="text-white text-lg">{item?.name}</Button>
                                ))
                            }
                        </div>

                        <div className="ml-auto">
                            <IconButton className="bg-red-500 text-white"><Logout /></IconButton>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer for Mobile */}
            <section className="md:hidden">
                <Drawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={() => toggleDrawer(false)}
                >
                    {drawerItems}
                </Drawer>
            </section>
        </>
    );
};

export default NavBar;
