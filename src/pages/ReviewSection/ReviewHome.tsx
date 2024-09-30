import { Button, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createRating, getAllRating } from "../../ApiGateways/rating";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";

const ReviewHome = () => {
    const [all_Review, setAll_Review] = useState<any[]>([]);
    const [rating, setRating] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>("");
    const [averageRating, setAverageRating] = useState<number | null>(null);

    const navigate = useNavigate();

    // Calculate the average rating
    const calculateAverageRating = (reviews: any[]) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review?.rating, 0);
        return totalRating / reviews.length;
    };

    useEffect(() => {
        getAllRating(
            (data) => {
                const reviews = data?.data || [];
                setAll_Review(reviews);
                setAverageRating(calculateAverageRating(reviews)); // Calculate and set average rating
            },
            (res) => console.log(res)
        );
    }, []);

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        setRating(newValue);
    };

    const handleSubmit = () => {
        const payload = {
            rating: rating,
            message: feedback,
        };

        createRating(payload,
            (data) => {
                const newReviews = [data?.data, ...all_Review];
                setAll_Review(newReviews);
                setAverageRating(calculateAverageRating(newReviews)); // Recalculate after new review
            },
            (res) => console.log(res)
        );
    };

    return (
        <div className="py-8 bg-gradient-to-b from-gray-50 to-gray-200 px-3">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col max-w-6xl w-full">

                    <Typography variant="h5" className="mb-4 text-gray-800">
                        Leave a Review
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Feedback"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mb-4 bg-white"
                    />
                    <Rating
                        name="star-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        size="large"
                        className="mb-4"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className="bg-violet-400 w-fit"
                    >
                        Submit
                    </Button>
                </div>

                {/* Display Average Rating */}
                <div className="flex flex-col items-center mt-8 mb-6">
                    <Typography variant="h4" className="text-gray-800 font-bold">
                        Average Rating: {averageRating?.toFixed(1) || "N/A"} / 5
                    </Typography>
                    <Rating
                        name="average-rating"
                        value={averageRating}
                        precision={0.1}
                        readOnly
                        size="large"
                        className="mt-2"
                    />
                </div>

                <Typography variant="h4" className="mb-6 text-gray-800 font-bold">
                    Recent Reviews
                </Typography>

                <div className="w-full max-w-3xl flex flex-col gap-6">
                    {all_Review?.slice(0, 2).map((item: any, i: number) => (
                        <ReviewCard
                            key={i}
                            name={item?.user?.name}
                            rating={item?.rating}
                            message={item?.message}
                        />
                    ))}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-8"
                    onClick={() => navigate('/review')}
                    style={{ borderRadius: '999px', padding: '0.5rem 2rem' }}
                >
                    See All Reviews
                </Button>
            </div>
        </div>
    );
};

export default ReviewHome;
