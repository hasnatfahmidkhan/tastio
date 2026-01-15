import { Search, Utensils, ChefHat, MessageSquare } from "lucide-react";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200/50 rounded-xl">
      <div>
        {/* Header */}
        <SectionHeader
          heading="How Tastio Works"
          subHeading="Discover your next favorite meal in 3 simple steps."
          badge="Easy Process"
          icon={Utensils}
          align="center"
        />

        <div className="relative mt-16">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-linear-to-r from-blue-200 via-green-200 to-orange-200 -z-10 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <StepCard
              number="01"
              title="Discover Food"
              desc="Search for the best food, restaurants, or cuisines near you using our smart filters."
              icon={<Search size={32} />}
              color="bg-blue-100 text-blue-600"
              borderColor="border-blue-200"
            />

            {/* Step 2 */}
            <StepCard
              number="02"
              title="Visit & Eat"
              desc="Visit the restaurant, order your favorite meal, and enjoy the authentic taste."
              icon={<ChefHat size={32} />}
              color="bg-green-100 text-green-600"
              borderColor="border-green-200"
            />

            {/* Step 3 */}
            <StepCard
              number="03"
              title="Share Review"
              desc="Share your experience, rate the food, and help the community find the best spots."
              icon={<MessageSquare size={32} />}
              color="bg-orange-100 text-orange-600"
              borderColor="border-orange-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Step Card
const StepCard = ({ number, title, desc, icon, color, borderColor }) => (
  <div className="relative flex flex-col items-center text-center group">
    {/* Icon Circle */}
    <div
      className={`w-24 h-24 ${color} rounded-full flex items-center justify-center mb-6 shadow-lg border-4 ${borderColor} group-hover:scale-110 transition-transform duration-300 relative z-10`}
    >
      {icon}
      {/* Step Number Badge */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-base-100 rounded-full flex items-center justify-center text-sm font-bold shadow-md border border-base-200 text-base-content">
        {number}
      </div>
    </div>

    <h3 className="text-2xl font-bold mb-3 text-base-content">{title}</h3>
    <p className="text-gray-500 max-w-xs leading-relaxed">{desc}</p>
  </div>
);

export default HowItWorks;
