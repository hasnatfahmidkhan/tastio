import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { ChessQueen, Medal, CircleStar } from "lucide-react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

const TopReviewers = () => {
  const axiosPublic = useAxios();

  const { data: topReviewers = [] } = useQuery({
    queryKey: ["topReviewers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/leaderboard?limit=3");
      return res.data;
    },
  });

  // Rank Badges Helper
  const getRankIcon = (index) => {
    if (index === 0)
      return <ChessQueen size={32} className="text-yellow-500" />;
    if (index === 1) return <Medal size={32} className="text-teal-500" />;
    if (index === 2)
      return <CircleStar size={32} className="text-orange-500" />;
    return null;
  };

  return (
    <section className="py-20 px-4">
      <SectionHeader
        heading="Hall of Fame"
        subHeading="Meet our top contributors who help you find the best food."
        badge="Top Reviewers"
        icon={ChessQueen}
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-end">
        {topReviewers.map((reviewer, index) => {
          // Apply scale effect for #1 (Center usually, but grid order is linear here)
          const isFirst = index === 0;

          return (
            <div
              key={index}
              className={`relative bg-base-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl border ${
                isFirst
                  ? "border-yellow-400 border-2 scale-105 z-10 shadow-yellow-100"
                  : "border-base-200"
              }`}
            >
              {/* Rank Badge Absolute */}
              <div className="absolute -top-6 bg-base-100 p-2 rounded-full border-4 border-base-200 shadow-sm">
                {getRankIcon(index)}
              </div>
              {/* User Image */}
              <div className={`avatar mb-4 mt-4`}>
                <div
                  className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${
                    isFirst ? "ring-yellow-400" : "ring-base-300"
                  }`}
                >
                  <img
                    loading="lazy"
                    src={reviewer.photo}
                    alt={reviewer.name}
                    onError={(e) => {
                      e.currentTarget.src = "/profile.png";
                    }}
                  />
                </div>
              </div>
              {/* Info */}
              <h3 className="text-xl font-bold text-base-content">
                {reviewer.name}
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {reviewer.reviewerEmail}
              </p>{" "}
              {/* Maybe hide email for privacy? */}
              {/* Stats */}
              <div className="bg-base-200 w-full py-3 rounded-xl">
                <p className="text-3xl font-black text-primary">
                  {reviewer.totalReviews}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Reviews
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopReviewers;
