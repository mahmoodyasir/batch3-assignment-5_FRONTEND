import { useState } from "react";
import { Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../Redux/app/hooks";
import { updateUser } from "../../../../ApiGateways/user";
import { setUser } from "../../../../Redux/features/userSlice";

const Profile = () => {
    const userState = useAppSelector((state) => state.userState);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: userState?.user?.name || '',
        phone: userState?.user?.phone || '',
        address: userState?.user?.address || ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {

        updateUser(formData,
            (data) => {
                dispatch(setUser(data?.data));
            },
            (res) => console.log(res)
        )

        handleClose();
    };

    return (
        <div className="flex justify-center mt-6">
            <Card className="shadow-xl bg-white w-full max-w-lg p-6 rounded-lg border border-gray-200">
                <CardContent>
                    <Typography variant="h5" className="font-bold mb-4 text-center text-gray-700">User Profile</Typography>
                    <Typography className="text-lg text-gray-500 mb-2"><span className="font-semibold">Name:</span> {userState?.user?.name}</Typography>
                    <Typography className="text-lg text-gray-500 mb-2"><span className="font-semibold">Email:</span> {userState?.user?.email}</Typography>
                    <Typography className="text-lg text-gray-500 mb-2"><span className="font-semibold">Phone:</span> {userState?.user?.phone}</Typography>
                    <Typography className="text-lg text-gray-500 mb-2"><span className="font-semibold">Address:</span> {userState?.user?.address}</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600"
                        onClick={handleOpen}
                    >
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

            {/* Edit Profile Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4"
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4"
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        className="mb-4"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="text-gray-500">Cancel</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;
