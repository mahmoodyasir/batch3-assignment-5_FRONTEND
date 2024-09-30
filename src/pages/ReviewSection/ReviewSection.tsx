import { useEffect, useState } from "react";
import { Rating, Button, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../Redux/app/hooks";
import { createRating, getAllRating } from "../../ApiGateways/rating";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";


const ReviewSection = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>("");

    const [all_Review, setAll_Review] = useState<any[]>([]);


    const user = useAppSelector((state) => state.userState);

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        setRating(newValue);
    };

    useEffect(() => {
        getAllRating(
            (data) => {
                setAll_Review(data?.data);
            },
            (res) => console.log(res)
        );
    }, []);

    const handleSubmit = () => {

        const payload = {
            rating: rating,
            message: feedback,
        };

        createRating(payload,
            (data) => {
                setAll_Review([data?.data, ...all_Review])
            },
            (res) => console.log(res)
        )
    };

    return (
        <div className="w-full flex flex-col items-center py-8 bg-gray-100 rounded-md shadow-lg">
            {user?.isLoggedIn ? (
                <>
                    <Typography variant="h5" className="mb-4 text-gray-800">
                        Leave a Review
                    </Typography>
                    <TextField
                        label="Your Feedback"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-3/4 mb-4"
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
                        className="w-1/4"
                    >
                        Submit
                    </Button>

                    <div className="w-full max-w-6xl flex flex-col gap-6 mt-8">
                        {all_Review?.map((item: any, i: number) => (
                            <ReviewCard
                                key={i}
                                name={item?.user?.name}
                                rating={item?.rating}
                                message={item?.message}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="w-full h-full absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/login')}
                        className="text-white"
                    >
                        Login to Leave a Review
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;
