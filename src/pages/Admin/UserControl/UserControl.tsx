import { useEffect, useState } from "react"
import { getAllUser, updateUserRole } from "../../../ApiGateways/user";
import { FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, Typography } from "@mui/material";
import GenericTable from "../../../components/GenericTable/GenericTable";

const UserControl = () => {

    const [allUser, setAllUser] = useState<any[]>([]);

    useEffect(() => {
        getAllUser(
            (data) => {
                setAllUser(data?.data);
            },
            (res) => console.log(res)
        )
    }, [])

    const columns = {
        "Name": { width: 50 },
        "Email": { width: 100 },
        "Phone": { width: 50 },
        "Address": { width: 70 },
        "Role": { width: 50 },
        Action: { width: 80 },
    };

    const handleChange = (index: number, user_role: string, userId: string) => {

        const payload = {
            role: user_role,
        }

        updateUserRole(userId, payload,
            (data) => {
                const obtained = data?.data;
                const temp = [...allUser];

                temp[index] = obtained;

                setAllUser(temp);
            },
            (res) => console.log(res)
        )
    };


    const createTableRows = (users: any[]) =>
        users?.map((user: any, index: number) => (
            <TableRow key={index}>
                <TableCell sx={{ textAlign: "center" }}>{user?.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.phone}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user?.address}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{
                    user?.role === "admin" ?
                        <Typography className="bg-green-400 text-white w-fit p-2">ADMIN</Typography>
                        :
                        <Typography className="bg-blue-400 text-white w-fit p-2">{(user?.role).toUpperCase()}</Typography>
                }</TableCell>

                <TableCell sx={{ textAlign: "center" }}>
                    {
                        <FormControl fullWidth>
                            <InputLabel id={`user-select-label-${index}`}>Change Status</InputLabel>
                            <Select
                                labelId={`user-select-label-${index}`}
                                id={`user-select-${index}`}
                                value={user?.role}
                                label="Change Role"
                                onChange={(e) => handleChange(index, e.target.value, user?._id)}

                            >
                                <MenuItem value="admin">ADMIN</MenuItem>
                                <MenuItem value="user">USER</MenuItem>
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
                    data={createTableRows(allUser)}
                />
            </div>
        </div>
    )
}

export default UserControl
