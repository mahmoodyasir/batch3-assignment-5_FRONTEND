import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../../utils";

const CountdownTimer = ({ date, startTime }: { date: string; startTime: string }) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date, startTime));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(date, startTime));
        }, 1000);

        return () => clearTimeout(timer);
    });
    return (
        <div>
            <Typography>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </Typography>
        </div>
    )
}

export default CountdownTimer
