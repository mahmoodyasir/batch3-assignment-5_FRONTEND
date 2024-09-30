import { useEffect, useState } from "react"
import ReviewHome from "../ReviewSection/ReviewHome"
import Hero from "./Hero/Hero"
import { getServices } from "../../ApiGateways/service"
import FeaturedCard from "./FeaturedCard/FeaturedCard"

const Homes = () => {

  const filters = {
    search: "",
    minPrice: null,
    maxPrice: null,
    minDuration: null,
    maxDuration: null,
    sortBy: "",
  }

  const [allFeatured, setAllFeatured] = useState([]);

  useEffect(() => {
    getServices(filters,
      (data) => {
        setAllFeatured(data?.data)
      },
      (res) => console.log(res)
    );
  }, [])

  return (
    <div>
      <Hero />
      <div className="my-12">
      <FeaturedCard message="Featured Services" data={allFeatured} />
      </div>
      <ReviewHome />
    </div>
  )
}

export default Homes
