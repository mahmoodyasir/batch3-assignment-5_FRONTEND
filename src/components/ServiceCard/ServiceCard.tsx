import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
    _id: string | undefined;
    name: string;
    description: string;
    price: number;
    duration: number;
}

const ServiceCard: React.FC<ServiceCardProps> = (props: ServiceCardProps) => {

    const { _id, name, description, price, duration } = props;

    const navigate = useNavigate();

    return (
        <Card className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <CardContent>
                <Typography variant="h5" className="font-bold text-indigo-700 mb-2">
                    {name}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                    {description.substring(0, 20) + ' ...'}
                </Typography>
                <Box className="flex justify-between items-center mt-4">
                    <Typography variant="h6" className="text-green-600 font-semibold">
                        ${price}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                        Duration: {duration} mins
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-6 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg"
                    onClick={() => navigate(`/service_details/${_id}`)}
                >
                    See Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
