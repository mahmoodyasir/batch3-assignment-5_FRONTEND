import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../ApiGateways/user";
import { useAppDispatch } from "../../../Redux/app/hooks";
import { setUser } from '../../../Redux/features/userSlice'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setErrorMessage(null);

        loginUser(formData,
            (data) => {
                dispatch(setUser(data?.data));
                localStorage.setItem("access_token", data?.token);
                navigate('/')
            },
            (res) => {
                setErrorMessage(res?.message)
            }
        )
    }

    return (
        <div>
            <Box className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <Paper elevation={6} className="p-8 max-w-md w-full rounded-lg mx-2">
                    <Typography variant="h4" align="center" className="mb-6 text-blue-700 font-bold">
                        Login
                    </Typography>



                    <form onSubmit={handleLogin} className="space-y-4">
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            variant="outlined"
                            className="bg-white rounded"
                        />

                        {errorMessage && <Alert severity="error" className="mb-4">{errorMessage}</Alert>}

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="py-2 mt-4 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
                        >
                            Login
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" className="mt-6 text-gray-600">
                        Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-700 underline cursor-pointer">Sign Up</span>
                    </Typography>
                </Paper>
            </Box>
        </div>
    )
}

export default Login
