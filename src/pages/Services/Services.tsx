import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { getServices } from "../../ApiGateways/service";
import { setServices } from "../../Redux/features/serviceSlice";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import ServiceCard from "../../components/ServiceCard/ServiceCard";


const MAX_PRICE = 100000
const MAX_Duration = 120

const Services = () => {

    const dispatch = useAppDispatch();
    const serviceState = useAppSelector((state) => state.serviceState);
    const [debounceTimeout, setDebounceTimeout] = useState<number>();

    const [filters, setFilters] = useState({
        search: "",
        minPrice: 0,
        maxPrice: MAX_PRICE,
        minDuration: 0,
        maxDuration: MAX_Duration,
        sortBy: "",
    });

    useEffect(() => {

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(() => {
            getServices(filters,
                (data) => {
                    dispatch(setServices(data?.data));
                },
                (res) => console.log(res)
            );
        }, 1000);

        setDebounceTimeout(timeoutId);

        return () => {
            clearTimeout(timeoutId);
        };


    }, [filters]);

    // useEffect(() => {
    //     getServices( filters,
    //         (data) => {
    //             dispatch(setServices(data?.data));
    //         },
    //         (res) => console.log(res)
    //     );
    // }, []);


    const handleFilterChange = (key: string, value: any) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };


    return (
        <div>
            <Box className="container mx-auto my-10">
                <Typography variant="h4" className="text-center font-bold text-indigo-700 mb-8">
                    Our Services
                </Typography>


                <Box className="flex flex-wrap justify-between items-center gap-4 mb-8 mx-6 bg-green-300 px-6 py-3 rounded-xl">
                    {/* Search */}
                    <TextField
                        label="Search Services"
                        variant="outlined"
                        fullWidth
                        className="max-w-sm bg-white"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                    />


                    <Box className="max-w-sm w-full">
                        <Typography gutterBottom>Price Range: ${filters.minPrice} - ${filters.maxPrice}</Typography>
                        <Slider
                            value={[filters.minPrice, filters.maxPrice]}
                            onChange={(event, newValue) => {
                                if (Array.isArray(newValue)) {
                                    handleFilterChange("minPrice", newValue[0]);
                                    handleFilterChange("maxPrice", newValue[1]);
                                }
                            }}
                            valueLabelDisplay="auto"
                            min={0}
                            max={MAX_PRICE}
                            step={50}
                            className="text-indigo-700"
                        />

                    </Box>


                    <Box className="max-w-sm w-full mx-3">
                        <Typography gutterBottom>Duration: {filters.minDuration} - {filters.maxDuration} mins</Typography>
                        <Slider
                            value={[filters.minDuration, filters.maxDuration]}
                            onChange={(event, newValue) => {
                                if (Array.isArray(newValue)) {
                                    handleFilterChange("minDuration", newValue[0]);
                                    handleFilterChange("maxDuration", newValue[1]);
                                }
                            }}
                            valueLabelDisplay="auto"
                            min={0}
                            max={MAX_Duration}
                            step={5}
                            className="text-indigo-700"
                        />

                    </Box>


                    <FormControl variant="outlined" className="min-w-[150px] bg-white">
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                            label="Sort By"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="duration">Duration</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    {serviceState?.map((service) => (
                        <Grid item key={service._id} xs={12} sm={6} md={4} lg={3}>
                            <ServiceCard
                                name={service.name}
                                description={service.description}
                                price={service.price}
                                duration={service.duration}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default Services;
