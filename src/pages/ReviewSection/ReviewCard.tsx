import { Rating, Typography } from "@mui/material";

type TReviewCard = {
    name: string;
    rating: number;
    message: string;
};

const ReviewCard = (props: TReviewCard) => {
    const { name, rating, message } = props;

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
            <Typography variant="h6" className="font-semibold text-gray-800">
                {name}
            </Typography>
            <div className="mt-2 mb-4">
                <Rating name="read-only" value={rating} readOnly />
            </div>
            <Typography className="text-gray-600">
                {message}
            </Typography>
        </div>
    );
};

export default ReviewCard;
