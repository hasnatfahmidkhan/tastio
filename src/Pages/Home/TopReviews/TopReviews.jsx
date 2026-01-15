import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import ReviewCard from "../../../Components/ReviewCard/ReviewCard";
import CardSkeleton from "../../../Components/CardSkeleton/CardSkeleton";

const TopReviews = () => {
  const axiosPublic = useAxios();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/latest-reviews");
      return res.status === 200 ? res.data : [];
    },
  });

  return (
    <section className="py-20 container mx-auto px-4">
      {/* Header */}
      <SectionHeader
        heading="Top Rated Reviews"
        subHeading="Discover what food lovers are raving about in your city."
        badge="Fan Favorites"
        icon={Star}
        badgeColor="text-warning"
        align="left"
      >
        {/* Desktop View All Button (Optional placement) */}
        <Link
          to="/all-reviews"
          className="hidden md:flex btn btn-ghost group hover:text-primary transition-colors"
        >
          Browse All Reviews{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </SectionHeader>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isPending
          ? [...Array(8)].map((_, i) => <CardSkeleton key={i} />)
          : reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
      </div>

      {/* Mobile / Center Bottom Button */}
      <div className="text-center mt-12 md:hidden">
        <Link
          to="/all-reviews"
          className="btn btn-primary btn-wide rounded-full shadow-lg hover:shadow-primary/50 transition-shadow"
        >
          View All Reviews <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default TopReviews;
