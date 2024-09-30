import { Card, CardContent, Typography } from "@mui/material";
import CountdownTimer from "../../../../components/CountdownTimer/CountdownTimer";
import { calculateTimeLeft } from "../../../../utils";

type TUpcomingBookings = {
    bookingDate: string;
    startTime: string;
    endTime: string;
    serviceName: string;
    vehicle: string;
    price: number;
    type: string;
};

const UserBookings = (props: TUpcomingBookings) => {
    const { bookingDate, startTime, endTime, serviceName, vehicle, price, type } = props;

    const secondsLeft = calculateTimeLeft(bookingDate, startTime);
    const formattedDate = new Date(bookingDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl space-y-4">
                {secondsLeft?.seconds > 0 && type === "upcoming" ? (
                    <Card className="shadow-xl bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <CardContent>
                            <Typography variant="h6" className="font-bold mb-2 text-blue-700">{serviceName}</Typography>
                            <Typography className="text-gray-500 mb-2">
                                <span className="font-semibold">Date:</span> {formattedDate}
                            </Typography>
                            <Typography className="text-gray-500 mb-2">
                                <span className="font-semibold">Time:</span> {startTime} - {endTime}
                            </Typography>
                            <Typography className="text-gray-500 mb-2">
                                <span className="font-semibold">Vehicle:</span> {vehicle}
                            </Typography>
                            <Typography className="text-gray-500 mb-4">
                                <span className="font-semibold">Price:</span> ${price.toFixed(2)}
                            </Typography>
                            <CountdownTimer date={bookingDate} startTime={startTime} />
                        </CardContent>
                    </Card>
                )
                    :
                    secondsLeft?.seconds <= 0 && type === "past" && (
                        <Card className="shadow-xl bg-gray-100 p-4 rounded-lg border border-gray-200">
                            <CardContent>
                                <Typography variant="h6" className="font-bold mb-2 text-gray-700">{serviceName}</Typography>
                                <Typography className="text-gray-500 mb-2">
                                    <span className="font-semibold">Date:</span> {formattedDate}
                                </Typography>
                                <Typography className="text-gray-500 mb-2">
                                    <span className="font-semibold">Time:</span> {startTime} - {endTime}
                                </Typography>
                                <Typography className="text-gray-500 mb-2">
                                    <span className="font-semibold">Vehicle:</span> {vehicle}
                                </Typography>
                                <Typography className="text-gray-500 mb-4">
                                    <span className="font-semibold">Price:</span> ${price.toFixed(2)}
                                </Typography>
                                <CountdownTimer date={bookingDate} startTime={startTime} />
                            </CardContent>
                        </Card>
                    )
                }

            </div>
        </div>
    );
};

export default UserBookings;
