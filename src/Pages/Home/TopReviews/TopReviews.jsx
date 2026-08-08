import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Star, ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopReviews = () => {
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/latest-reviews");
      return res.status === 200 ? res.data : [];
    },
  });

  return (
    <section className="py-20">
      <div className="bg-base-200/50 rounded-3xl px-4 md:px-10 py-14 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-warning/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header — centered for differentiation */}
        <SectionHeader
          heading="What Food Lovers Say"
          subHeading="Discover what food lovers are raving about in your city."
          badge="Top Reviews"
          icon={Star}
          badgeColor="text-warning"
          align="center"
        />

        {/* Carousel */}
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-6">
                <div className="skeleton h-4 w-20 bg-gray-300" />
                <div className="skeleton h-4 w-full bg-gray-300" />
                <div className="skeleton h-4 w-full bg-gray-300" />
                <div className="skeleton h-4 w-3/4 bg-gray-300" />
                <div className="flex items-center gap-3 mt-4">
                  <div className="skeleton h-12 w-12 rounded-full bg-gray-300" />
                  <div className="flex flex-col gap-2">
                    <div className="skeleton h-4 w-24 bg-gray-300" />
                    <div className="skeleton h-3 w-16 bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Custom Nav Buttons */}
            <div className="hidden md:flex absolute -top-16 right-0 gap-2 z-10">
              <button className="review-prev w-10 h-10 rounded-full border border-base-300 bg-base-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button className="review-next w-10 h-10 rounded-full border border-base-300 bg-base-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={24}
              navigation={{
                prevEl: ".review-prev",
                nextEl: ".review-next",
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={reviews.length > 3}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="pb-14"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  {/* Testimonial Card */}
                  <div
                    onClick={() => navigate(`/review-details/${review._id}`)}
                    className="group bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    {/* Quote Icon + Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <Quote
                        size={32}
                        className="text-primary/20 fill-primary/20"
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "text-warning fill-warning"
                                : "text-base-300"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Food Image (small) + Food Name */}
                    <div className="flex items-center gap-3 mb-4 bg-base-200/50 rounded-xl p-3">
                      <img
                        loading="lazy"
                        src={review.photo}
                        alt={review.foodName}
                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                          {review.foodName}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {review.restaurantName}
                        </p>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 grow mb-5">
                      {review.reviewText ||
                        "An amazing food experience that I would highly recommend to any food enthusiast!"}
                    </p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-base-200 mt-auto">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          {review.reviewerPhoto ? (
                            <img
                              loading="lazy"
                              src={review.reviewerPhoto}
                              alt={review.reviewerName}
                              onError={(e) => {
                                e.currentTarget.src = "/profile.png";
                              }}
                            />
                          ) : (
                            <span className="text-sm">
                              {review.reviewerName?.charAt(0) || "U"}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">
                          {review.reviewerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Verified Reviewer
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-base-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Browse All Button */}
        <div className="text-center mt-4">
          <Link
            to="/all-reviews"
            className="btn btn-outline btn-wide rounded-full hover:btn-primary transition-all"
          >
            Browse All Reviews <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopReviews;
