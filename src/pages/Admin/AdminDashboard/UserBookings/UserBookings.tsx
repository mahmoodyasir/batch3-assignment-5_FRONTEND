import { useEffect, useState } from "react"
import { getAllUserBookings } from "../../../../ApiGateways/user";
import { TableCell, TableRow } from "@mui/material";
import GenericTable from "../../../../components/GenericTable/GenericTable";

const UserBookings = () => {

    const [all_Booking, setAll_Booking] = useState<any[]>([]);

    const columns = {
        "User Name": { width: 50 },
        "Email": { width: 50 },
        "Service": { width: 60 },
        "Cost": { width: 50 },
        "Date": { width: 70 },
        "Start Time": { width: 50 },
        "End Time": { width: 50 },
    };
    useEffect(() => {
        getAllUserBookings(
            (data) => {
                setAll_Booking(data?.data)
            },
            (res) => console.log(res)
        )
    }, []);

    const createTableRows = (users: any[]) =>
        users?.map((user: any, index: number) => (
            (user?.slot !== null || user?.service !== null) &&
            <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{user?.customer?.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.customer?.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.service?.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>$ {user?.service?.price}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{new Date(user?.slot?.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</TableCell>

                <TableCell sx={{ textAlign: "center" }}>{user?.slot?.startTime}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.slot?.endTime}</TableCell>

            </TableRow>
        ));


    return (
        <div className="mt-4">

            <div>
                <GenericTable
                    columns={columns}
                    data={createTableRows(all_Booking)}
                />
            </div>
        </div>
    )
}

export default UserBookings
