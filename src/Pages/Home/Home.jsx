import Banner from "../../Components/Banner/Banner";
import Faq from "../../Components/Faq/Faq";
import Container from "../../Components/Container/Container";
import CategorySection from "./CategorySection/CategorySection";
import TrendingNow from "./TrendingNow/TrendingNow";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import TopRatedFoods from "./TopRatedFoods/TopRatedFoods";
import HowItWorks from "./HowItWorks/HowItWorks";
import FeaturedRestaurants from "./FeaturedRestaurants/FeaturedRestaurants";
import CommunityTeaser from "./CommunityTeaser/CommunityTeaser";
import TopReviewers from "./TopReviewers/TopReviewers";
import StatsSection from "./StatsSection/StatsSection";
import Newsletter from "./Newsletter/Newsletter";
import TopReviews from "./TopReviews/TopReviews";

const Home = () => {
  const trendingRef = useRef(null); // 1. Create Ref

  const scrollToContent = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" }); // 2. Scroll Function
  };

  return (
    <section className="relative">
      <Banner />

      {/* 3. Improved Bounce Arrow */}
      <div className="translate-y-1/2 flex justify-center z-10">
        <button
          onClick={scrollToContent}
          className="w-14 h-14 bg-base-100 dark:bg-base-200 rounded-full shadow-lg border border-base-300 flex items-center justify-center animate-bounce cursor-pointer hover:bg-primary hover:text-white transition-colors"
          aria-label="Scroll Down"
        >
          <ArrowDown size={24} />
        </button>
      </div>

      <Container>
        <TrendingNow trendingRef={trendingRef} />

        {/* Top Rated reviews  */}
        <TopReviews />

        {/* Top rated foods  */}
        <TopRatedFoods />

        {/* Category section  */}
        <CategorySection />

        {/* How is it works section  */}
        <HowItWorks />

        {/* Featured restaurant section  */}
        <FeaturedRestaurants />

        {/* Community Teaser section  */}
        <CommunityTeaser />

        {/* Top Reviewer Section  */}
        <TopReviewers />

        {/* Stats Section  */}
        <StatsSection />

        {/* Newsletter Section  */}
        <Newsletter />

        <Faq />
      </Container>
    </section>
  );
};

export default Home;
