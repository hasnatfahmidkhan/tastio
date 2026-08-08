import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import { Star, Flame } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import FoodCard from "../../../Components/FoodCard/FoodCard";

const TrendingNow = ({ trendingRef }) => {
  const axiosPublic = useAxios();

  const { data: trendingFoods = [], isLoading } = useQuery({
    queryKey: ["trending-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/trending");
      return res.data;
    },
  });

  if (isLoading) return null; // Or a skeleton

  return (
    <section ref={trendingRef} className="scroll-mt-14 py-16 overflow-hidden">
      <SectionHeader
        heading="Trending Now"
        subHeading="The most popular dishes people are talking about this week."
        badge="Hot Items"
        icon={Flame}
        badgeColor="text-error"
        align="left"
      ></SectionHeader>

      <Marquee speed={40} pauseOnHover={true} autoFill gradient={false}>
        {trendingFoods.map((item) => (
          <div key={item._id} className="mx-3 block">
            <FoodCard item={item} />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TrendingNow;
