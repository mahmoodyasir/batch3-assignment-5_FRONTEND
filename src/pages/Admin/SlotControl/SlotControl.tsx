import { useEffect, useState } from "react"
import { getAvailableSlots, updateSlotStatus } from "../../../ApiGateways/slot";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TableCell, TableRow, Typography } from "@mui/material";
import GenericTable from "../../../components/GenericTable/GenericTable";


const SlotControl = () => {

    const [allSlot, setAllSlot] = useState<any[]>([]);

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
