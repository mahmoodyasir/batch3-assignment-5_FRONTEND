import { useEffect, useState } from "react"
import { createSlot, getAvailableSlots, updateSlotStatus } from "../../../ApiGateways/slot";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, TextField, Typography } from "@mui/material";
import GenericTable from "../../../components/GenericTable/GenericTable";
import { SlotFormData } from "../../../utils";
import { getServices } from "../../../ApiGateways/service";
import './SlotControl.css'


const SlotControl = () => {

    const [allSlot, setAllSlot] = useState<any[]>([]);

    const [formData, setFormData] = useState<SlotFormData>({
        service: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    const [services, setServices] = useState<any[]>([])

    const [open, setOpen] = useState(false);

    const [reset, setReset] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        createSlot(formData,
            (data) => {
                // const response = data?.data;
                // setAllSlot([...response, ...allSlot]);

                setReset(!reset);

                setOpen(false);
            },
            (res) => console.log(res)
        )
    };

    const columns = {
        "Service Name": { width: 50 },
        "Slot Date": { width: 100 },
        "Start Time": { width: 100 },
        "End Time": { width: 100 },
        "Is Booked": { width: 60 },
        Action: { width: 100 },
    };

    useEffect(() => {
        getAvailableSlots(
            (data) => {
                setAllSlot(data?.data)
            },
            (res) => console.log(res)
        )
    }, [reset]);

    const filter = {
        search: "",
        minPrice: null,
        maxPrice: null,
        minDuration: null,
        maxDuration: null,
        sortBy: ""
    }

    useEffect(() => {
        getServices(filter,
            (data) => {
                setServices(data?.data);
            },
            (res) => console.log(res)
        )
    }, []);


    const handleChange = (index: number, status: string, slotId: string) => {

        const payload = {
            status_value: status,
        }

        updateSlotStatus(slotId, payload,
            (data) => {
                const obtained = data?.data;
                const temp = [...allSlot];

                temp[index] = obtained;

                setAllSlot(temp);
            },
            (res) => console.log(res)
        )
    };



    const createTableRows = (services: any[]) =>
        services?.map((service: any, index: number) => (
            <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{service?.service?.name}</TableCell>

                <TableCell sx={{ textAlign: "center" }}>{new Date(service?.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{service?.startTime}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{service?.endTime}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{
                    service?.isBooked === "available" ?
                        <Typography className="bg-green-400 text-white w-fit p-2">AVAILABLE</Typography>
                        :
                        <Typography className="bg-red-400 text-white w-fit p-2">{(service?.isBooked).toUpperCase()}</Typography>
                }</TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                    {
                        service?.isBooked === "booked" ?
                            <Typography className="text-red-500 font-semibold text-lg">Not Updatable</Typography>
                            :
                            <FormControl fullWidth>
                                <InputLabel id={`status-select-label-${index}`}>Change Status</InputLabel>
                                <Select
                                    labelId={`status-select-label-${index}`}
                                    id={`status-select-${index}`}
                                    value={service?.isBooked}
                                    label="Change Status"
                                    onChange={(e) => handleChange(index, e.target.value, service?._id)}
                                    disabled={service?.isBooked === "booked"}
                                >
                                    <MenuItem value="available">AVAILABLE</MenuItem>
                                    <MenuItem value="cancelled">CANCELLED</MenuItem>
                                </Select>
                            </FormControl>
                    }

                </TableCell>
            </TableRow>
        ));

    return (
        <div className="mt-4">

            <article>
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                    <DialogTitle>Create Slot</DialogTitle>
                    <DialogContent>
                        <form className="parent_dialog" onSubmit={handleSubmit}>
                            {/* Service Field */}
                            <TextField
                                select
                                label="Service"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            >
                                {services.map((service) => (
                                    <MenuItem key={service._id} value={service._id}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {/* Date Field */}
                            <TextField
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />

                            {/* Start Time Field */}
                            <TextField
                                label="Start Time"
                                name="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />

                            {/* End Time Field */}
                            <TextField
                                label="End Time"
                                name="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </article>

            <div>
                <Button className="bg-green-400 mx-2 my-3 text-white" onClick={() => setOpen(true)}>Create Slot</Button>
            </div>
            <div>
                <GenericTable
                    columns={columns}
                    data={createTableRows(allSlot)}
                />
            </div>
        </div>
    )
}

export default SlotControl
