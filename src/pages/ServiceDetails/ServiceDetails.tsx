import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleService } from "../../ApiGateways/service";
import { Box, Button, Grid, List, ListSubheader, Typography } from "@mui/material";
import { useAppDispatch } from "../../Redux/app/hooks";
import { setBookings } from "../../Redux/features/selectedSlotSlice";

interface Slot {
    _id: string;
    service: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: string;
}

interface Service {
    name: string;
    description: string;
    price: number;
    duration: number;
}

const ServiceDetails = () => {

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [service, setService] = useState<Service>();
    const [slots, setSlots] = useState<Slot[]>();
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    useEffect(() => {
        getSingleService(String(id),
            (data) => {
                setService(data?.data?.service);
                setSlots(data?.data?.slots);
            },
            (res) => console.log(res)
        )
    }, []);


    const groupedSlots = slots?.reduce((acc: { [key: string]: Slot[] }, slot) => {
        const date = slot.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
    }, {});

    const handleSlotSelection = (slot: Slot) => {
        if (slot.isBooked !== "booked") {
            setSelectedSlot(slot);
        }
    };

    const proceedToBook = () => {
        const serviceId = selectedSlot?.service;
        const slotId = selectedSlot?._id;

        const bookingData = {
            serviceId: selectedSlot?.service || "",
            slotId: selectedSlot?._id || "",
            date: selectedSlot?.date || "",
            startTime: selectedSlot?.startTime || "",
            endTime: selectedSlot?.endTime || "",
            name: service?.name || "",
            price: service?.price || null,
            duration: service?.duration || null,
        }

        dispatch(setBookings(bookingData));

        navigate('/booking')

    };


    return (
        <div className="mx-8">
            <Box className="container mx-auto my-10">
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <div className="border-l-4 border-indigo-600 pl-4">
                        <Typography variant="h4" className="font-bold text-indigo-700 mb-2">
                            {service?.name}
                        </Typography>
                        <Typography variant="body1" className="text-gray-700 mb-4">
                            {service?.description}
                        </Typography>
                        <Typography variant="h6" className="text-indigo-600 font-semibold mb-2">
                            Price: <span className="text-lg">${service?.price}</span>
                        </Typography>
                        <Typography variant="h6" className="text-indigo-600 font-semibold">
                            Duration: {service?.duration} mins
                        </Typography>
                    </div>
                </div>

                <div id="avbl" className="sticky top-0 bg-white z-10 mb-4 mt-6 py-3">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <Typography variant="h5" className="font-bold text-indigo-700">
                            Available Time Slots
                        </Typography>

                        {selectedSlot && (
                            <Box mt={4}>
                                <Typography variant="h6">
                                    Selected Slot: {selectedSlot.date} from {selectedSlot.startTime} to {selectedSlot.endTime}
                                </Typography>
                                <Button onClick={() => proceedToBook()} variant="contained" color="primary" className="mt-4">
                                    Book This Service
                                </Button>
                            </Box>
                        )}
                    </div>
                </div>

                <Grid container spacing={2}>
                    {groupedSlots && Object.keys(groupedSlots).map((date) => (
                        <Grid item xs={12} key={date}>
                            <List
                                className="flex flex-wrap gap-2 items-center"
                                subheader={
                                    <ListSubheader className="text-lg">
                                        {new Date(date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </ListSubheader>
                                }
                            >
                                {groupedSlots && groupedSlots[date]?.map((slot) => (
                                    <div
                                        key={slot._id}
                                        className={`flex justify-between items-center p-4 border rounded-lg 
                                      ${slot.isBooked === "available" ? 'bg-white hover:bg-gray-100 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} 
                                      ${selectedSlot?._id === slot._id ? 'border-blue-500' : 'border-transparent'}`}
                                        onClick={slot.isBooked === "available" ? () => handleSlotSelection(slot) : undefined}
                                        aria-disabled={slot.isBooked === "booked"}
                                    >
                                        <div>
                                            <p className="font-semibold">{`${slot.startTime} - ${slot.endTime}`}</p>
                                            <p className={`text-sm ${slot.isBooked === "available" ? 'text-green-500' : 'text-red-500'}`}>
                                                {slot?.isBooked === "booked" ? "Booked" : slot?.isBooked}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </List>
                        </Grid>
                    ))}
                </Grid>


            </Box>
        </div>
    )
}

export default ServiceDetails
