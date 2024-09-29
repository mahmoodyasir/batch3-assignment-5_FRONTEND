import { useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Box,
    Paper,
    Divider,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useAppSelector } from "../../Redux/app/hooks";
import { Edit as EditIcon } from "@mui/icons-material";




const Booking = () => {
    const bookingState = useAppSelector((state) => state.bookingState);
    const { date, startTime, endTime, name, price, duration } = bookingState || {};

    const [bookingData, setBookingData] = useState({
        vehicleType: "",
        vehicleBrand: "",
        vehicleModel: "",
        manufacturingYear: 0,
        registrationPlate: ""
    });

    const vehicleTypes = ['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus', 'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

        console.log(bookingData);
    };

    return (
        <Box className=" bg-gradient-to-r from-green-400 to-green-700" sx={{ maxWidth: "1200px", mx: "auto", my: 10, p: 3, borderRadius: "10px", boxShadow: 3 }}>
            <Typography variant="h3" align="center" gutterBottom className="text-white font-bold">
                Book Your Service
            </Typography>
            <Grid container spacing={4}>
                {/* Left side - Service and Slot details */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ padding: 4, borderRadius: "10px", bgcolor: "#ffffff" }}>
                        <Typography variant="h5" className="mb-4 font-semibold text-gray-800">
                            Service Details
                        </Typography>
                        <Divider className="bg-violet-500" sx={{ mb: 2 }} />
                        <Typography variant="body1" className="mb-1">
                            <strong>Service:</strong> {name}
                        </Typography>
                        <Typography variant="body1" className="mb-1">
                            <strong>Date:</strong> {date}
                        </Typography>
                        <Typography variant="body1" className="mb-1">
                            <strong>Time:</strong> {startTime} - {endTime}
                        </Typography>
                        <Typography variant="body1" className="mb-1">
                            <strong>Price:</strong> ${price}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Duration:</strong> {duration} minutes
                        </Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit}>
                        <Paper elevation={2} sx={{ padding: 4, borderRadius: "10px", bgcolor: "#ffffff" }}>
                            <Typography variant="h5" className="mb-4 font-semibold text-gray-800">
                                Vehicle Information
                            </Typography>
                            <Divider className="bg-violet-500" sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Vehicle Type"
                                        name="vehicleType"
                                        value={bookingData.vehicleType}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        {vehicleTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Vehicle Brand"
                                        name="vehicleBrand"
                                        value={bookingData.vehicleBrand}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Vehicle Model"
                                        name="vehicleModel"
                                        value={bookingData.vehicleModel}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Manufacturing Year"
                                        name="manufacturingYear"
                                        type="number"
                                        value={bookingData.manufacturingYear}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Registration Plate"
                                        name="registrationPlate"
                                        value={bookingData.registrationPlate}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    />
                                </Grid>
                            </Grid>

                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        bgcolor: "#3f51b5",
                                        '&:hover': { bgcolor: "#2c387e" }
                                    }}
                                >
                                    Pay Now
                                </Button>
                            </Box>
                        </Paper>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Booking;
