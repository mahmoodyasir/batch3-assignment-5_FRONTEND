import { Card, CardContent, Typography, Button, Box } from "@mui/material";

interface ServiceCardProps {
    name: string;
    description: string;
    price: number;
    duration: number;
}

const ServiceCard: React.FC<ServiceCardProps> = (props: ServiceCardProps) => {

    const { name, description, price, duration } = props;
    return (
        <Card className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <CardContent>
                <Typography variant="h5" className="font-bold text-indigo-700 mb-2">
                    {name}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                    {description}
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
                >
                    See Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
