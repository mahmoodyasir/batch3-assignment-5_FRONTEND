import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ServiceCard from '../../../components/ServiceCard/ServiceCard';


type CardProps = {
    message: string;
    data: Record<string, any>[];
}

const FeaturedCard = (props: CardProps) => {

    const { message = "", data = [] } = props;
    const navigate = useNavigate();

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 500;
        }
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 500;
        }
    };

    return (
        <div className=" bg-gray-50 pt-6 md:px-6 lg:px-12 mx-6 rounded-3xl relative pb-6">
            <section>
                <Typography variant='h4' className="absolute mt-[-3rem] font-alegreya" >{message}</Typography>
                <Button onClick={() => navigate('/services')} size='large' className="bg-transparent text-gray-700 mb-8" ><u>Explore More</u></Button>
            </section>

            <section className="flex items-center overflow-hidden">
                <Typography><MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} /></Typography>
                <style>
                    {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }

        `}
                </style>
                <div id='slider' className=" overflow-x-scroll scroll-smooth hide-scrollbar">
                    <div className="flex items-center gap-3">
                        {data.length > 0 && data?.slice(0, 6)?.map((item: any, id: number) => (
                            <div className="flex-none w-72" key={id}>
                                <ServiceCard
                                    _id={item?._id}
                                    name={item?.name}
                                    description={item?.description}
                                    price={item?.price}
                                    duration={item?.duration}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Typography><MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} /></Typography>
            </section>
        </div>
    );
};

export default FeaturedCard;
