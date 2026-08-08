import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import Banner from "../../Components/Banner/Banner";
import Container from "../../Components/Container/Container";
import Faq from "../../Components/Faq/Faq";
import CategorySection from "./CategorySection/CategorySection";
import CommunityTeaser from "./CommunityTeaser/CommunityTeaser";
import DiscoverFoods from "./DiscoverFoods/DiscoverFoods";
import HowItWorks from "./HowItWorks/HowItWorks";
import Newsletter from "./Newsletter/Newsletter";
import StatsSection from "./StatsSection/StatsSection";
import TopReviewers from "./TopReviewers/TopReviewers";
import TopReviews from "./TopReviews/TopReviews";

const Home = () => {
  const trendingRef = useRef(null);
  const scrollToContent = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative">
      <div className="relative">
        <Banner />

        {/* Bounce Arrow */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex justify-center z-10">
          <button
            onClick={scrollToContent}
            className="w-14 h-14 bg-base-100 dark:bg-base-200 rounded-full shadow-lg border border-base-300 flex items-center justify-center animate-bounce cursor-pointer hover:bg-primary hover:text-white transition-colors"
            aria-label="Scroll Down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>

      <Container>
        {/* Discover Foods — merged Trending + Top Rated with tabs */}
        <DiscoverFoods trendingRef={trendingRef} />

        {/* Top Reviews — testimonial carousel */}
        <TopReviews />

        {/* Category section  */}
        <CategorySection />

        {/* How it works section  */}
        <HowItWorks />

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
