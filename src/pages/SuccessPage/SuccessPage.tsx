import { Button, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"

const SuccessPage = () => {

    const { slug } = useParams();

    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            {
                slug === "success" ?
                    <div className="mt-8 flex flex-col justify-center">
                        <Typography className="text-green-600 font-bold text-3xl">Payment Successful !</Typography>
                        <Button onClick={() => navigate('/')} className="bg-violet-400 text-white mt-4 hover:bg-purple-400 hover:opacity-75">Return To Homepage</Button>
                    </div>
                    :
                    <div className="mt-8 flex flex-col justify-center">
                        <Typography className="text-red-600 font-bold text-3xl">Payment Failed</Typography>
                        <Button onClick={() => navigate('/')} className="bg-violet-400 text-white mt-4 hover:bg-purple-400 hover:opacity-75">Return To Homepage</Button>
                    </div>    
            }

        </div>
    )
}

export default SuccessPage
