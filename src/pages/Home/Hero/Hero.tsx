import { Button, Typography } from "@mui/material";
import bannerImg from '../../../static/image/banner-1.jpg';
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section
      className="relative bg-cover h-[90vh] text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center space-y-4 z-10">
        <Typography variant="h3">Premium Car Wash Services</Typography>
        <Typography variant="h6">Quality care for your vehicle</Typography>
        <Button onClick={() => navigate('/services')} variant="contained" color="secondary">
          Book a Service
        </Button>
      </div>
    </section>
  );
};

export default Hero;
