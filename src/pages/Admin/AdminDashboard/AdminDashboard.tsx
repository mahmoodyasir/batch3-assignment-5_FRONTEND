import { Box, Drawer, IconButton, List, ListItemText, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useState } from "react";
import './AdminDashboard.css'
import ServiceControl from "../ServiceControl/ServiceControl";
import SlotControl from "../SlotControl/SlotControl";
import UserBookings from "./UserBookings/UserBookings";


type AdminSideBarProps = {
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    setToogle: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSideBar = (props: AdminSideBarProps) => {

    const { setSelectedOption, setToogle } = props;


    const sidebarOptions = [
        { label: 'Service Mangement', icon: <HomeRepairServiceIcon /> },
        { label: 'Slot Mangement', icon: <ManageHistoryIcon /> },
        { label: 'View User Bookings', icon: <AccountCircleIcon /> },
        { label: 'User Management', icon: <ManageAccountsIcon /> },
    ];

    return (
        <div style={{ minWidth: "15rem" }} className='headToolbarAdmin'>
            <Toolbar>
                <IconButton onClick={() => setToogle(false)} className="toolBar">
                    <CloseIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List className='parentList'>
                    {sidebarOptions?.map((option) => (
                        <div
                            key={option?.label}
                            onClick={() => setSelectedOption(option?.label)}
                            className="childList"
                        >
                            <span className='listIcon'>{option.icon}</span>
                            <ListItemText primary={option.label} className="listLabel" />
                        </div>
                    ))}
                </List>
            </Box>
        </div>
    )
}

const AdminDashboard = () => {

    const [selectedOption, setSelectedOption] = useState('Service Mangement');
    const [toogle, setToogle] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <div>
                <div className=' ml-4'>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setToogle(true)}
                        className="md:hidden text-violet-500 font-bold"
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
            </div>

            <div className="flex">

                <div className="hidden md:block">
                    <AdminSideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} setToogle={setToogle} />
                </div>

                <div className='block md:hidden'>

                    <Drawer
                        anchor="left"
                        open={toogle}
                        onClose={() => setToogle(false)}
                    >
                        <AdminSideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} setToogle={setToogle} />
                    </Drawer>
                </div>


                <div className="w-full h-screen">
                    {selectedOption === 'Service Mangement' && <ServiceControl />}
                    {selectedOption === 'Slot Mangement' && <SlotControl />}
                    {selectedOption === 'View User Bookings' && <UserBookings />}
                </div>



            </div>
        </div>
    )
}

export default AdminDashboard
