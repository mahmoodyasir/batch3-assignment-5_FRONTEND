import React, { useEffect, useState } from 'react';
import { Toolbar, Drawer, List, ListItem, ListItemText, Box, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Profile from './Profile/Profile';
import { getMyBookings } from '../../../ApiGateways/booking';
import UserBookings from './UserBookings/UserBookings';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import './UserDashboard.css'

type SideBarProps = {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  setToogle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = (props: SideBarProps) => {

  const { selectedOption, setSelectedOption, setToogle } = props;


  const sidebarOptions = [
    { label: 'Profile', icon: <AccountCircleIcon /> },
    { label: 'Past Bookings', icon: <EventAvailableIcon /> },
    { label: 'Upcoming Bookings', icon: <EventNoteIcon /> },
  ];

  return (
    <div style={{ minWidth: "15rem" }} className='headToolbar'>
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

const UserDashboard = () => {

  const [selectedOption, setSelectedOption] = useState('Profile');
  const [toogle, setToogle] = useState(false);

  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    getMyBookings(
      (data) => {
        console.log(data);
        setMyBookings(data?.data);
      },
      (res) => console.log(res)
    )
  }, [])

  return (
    <div className='min-h-screen bg-gray-100'>

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

        <div className='hidden md:block my-8 mx-8 shadow-md'>
          <SideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} setToogle={setToogle} />
        </div>

        <div className='block md:hidden'>

          <Drawer
            anchor="left"
            open={toogle}
            onClose={() => setToogle(false)}
          >
            <SideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} setToogle={setToogle} />
          </Drawer>
        </div>

        <Box component="main" className="flex-grow p-8">
          {selectedOption === 'Profile' && <Profile />}
          {selectedOption === 'Past Bookings' &&

            <div className='flex flex-col gap-3'>
              <Typography className='text-3xl text-violet-500'>Past Bookings</Typography>
              {
                myBookings?.map((item: any, i: number) => (
                  <UserBookings
                    key={i}
                    bookingDate={item?.slot?.date}
                    startTime={item?.slot?.startTime}
                    endTime={item?.slot?.endTime}
                    serviceName={item?.service?.name}
                    vehicle={`${item?.vehicleBrand} ${item?.vehicleModel}`}
                    price={item?.service?.price}
                    type='past'
                  />
                ))
              }
            </div>}
          {selectedOption === 'Upcoming Bookings' &&
            <div className='flex flex-col gap-3'>
               <Typography className='text-3xl text-violet-500'>Upcoming Bookings</Typography>
              {
                myBookings?.map((item: any, i: number) => (
                  <UserBookings
                    key={i}
                    bookingDate={item?.slot?.date}
                    startTime={item?.slot?.startTime}
                    endTime={item?.slot?.endTime}
                    serviceName={item?.service?.name}
                    vehicle={`${item?.vehicleBrand} ${item?.vehicleModel}`}
                    price={item?.service?.price}
                    type='upcoming'
                  />
                ))
              }
            </div>
            }
        </Box>
      </div>
    </div>
  );
};




export default UserDashboard;
