import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Star, Flame, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import CardSkeleton from "../../../Components/CardSkeleton/CardSkeleton";
import FoodOverlayCard from "./FoodOverlayCard";
import FoodCard from "../../../Components/FoodCard/FoodCard";

const tabs = [
  { id: "trending", label: "Trending Now", icon: Flame, color: "text-error" },
  {
    id: "top-rated",
    label: "Top Rated",
    icon: Star,
    color: "text-warning",
  },
];

const DiscoverFoods = ({ trendingRef }) => {
  const [activeTab, setActiveTab] = useState("trending");
  const axiosPublic = useAxios();

  // Fetch trending foods
  const { data: trendingFoods = [], isLoading: trendingLoading } = useQuery({
    queryKey: ["trending-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/trending");
      return res.data;
    },
  });

  // Fetch top rated foods
  const { data: topRatedFoods = [], isLoading: topRatedLoading } = useQuery({
    queryKey: ["top-rated-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/top-rated");
      return res.data;
    },
  });

  return (
    <section ref={trendingRef} className="scroll-mt-14 py-16 overflow-hidden">
      {/* Section Header */}
      <SectionHeader
        heading="Discover Foods"
        subHeading="Explore what's hot and what's loved by our community."
        badge="Food Picks"
        icon={Sparkles}
        badgeColor="text-primary"
        align="left"
      >
        <Link
          to="/all-foods"
          className="hidden md:flex btn btn-ghost group hover:text-primary transition-colors"
        >
          View All Foods{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </SectionHeader>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              <Icon
                size={16}
                className={isActive ? "fill-white" : tab.color}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "trending" ? (
          <motion.div
            key="trending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {trendingLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Marquee
                speed={40}
                pauseOnHover={true}
                autoFill
                gradient={false}
              >
                {trendingFoods.map((item) => (
                  <div key={item._id} className="mx-3 block">
                    <FoodCard item={item} />
                  </div>
                ))}
              </Marquee>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="top-rated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {topRatedLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Marquee
                speed={35}
                pauseOnHover={true}
                autoFill
                gradient={false}
                direction="right"
              >
                {topRatedFoods.map((item) => (
                  <div key={item._id} className="mx-3 block w-72">
                    <FoodOverlayCard item={item} />
                  </div>
                ))}
              </Marquee>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DiscoverFoods;
