import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../ApiGateways/user";

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "user"
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage('');

        createUser(formData,
            (data) => {
                setSuccessMessage("User Registered Successfully. Please go to Login Route to Login")
            },
            (res) => {
                setErrorMessage(res?.message)
            }
        )

    }


    return (
        <div>
            <Box className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-yellow-500">
                <Paper elevation={6} className="p-8 max-w-md w-full mx-auto rounded-lg">
                    <Typography variant="h4" align="center" className="mb-6 text-green-700 font-bold">
                        Sign Up
                    </Typography>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />

                        {errorMessage && <Alert severity="error" className="mb-4">{errorMessage}</Alert>}
                        {successMessage && <Alert severity="success" className="mb-4">{successMessage}</Alert>}

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="py-2 mt-4 rounded-lg bg-green-600 hover:bg-green-800 text-white"
                        >
                            Sign Up
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" className="mt-6 text-gray-600">
                        Already have an account? <span onClick={() => navigate('/login')} className="text-green-700 underline cursor-pointer">Login</span>
                    </Typography>
                </Paper>
            </Box>
        </div>
    )
}

export default SignUp
