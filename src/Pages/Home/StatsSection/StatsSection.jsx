import CountUp from "react-countup";
import { Users, MessageSquare, Store, Utensils } from "lucide-react";

const StatsSection = () => {
  return (
    <section
      className="my-20 py-24 relative bg-cover bg-center bg-fixed rounded-xl overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1500')",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <StatCard
            end={5000}
            label="Reviews Shared"
            icon={MessageSquare}
            delay={0}
          />

          {/* Stat 2 */}
          <StatCard
            end={1200}
            label="Active Foodies"
            icon={Users}
            delay={0.2}
          />

          {/* Stat 3 */}
          <StatCard
            end={50}
            label="Partner Restaurants"
            icon={Store}
            delay={0.4}
          />

          {/* Stat 4 */}
          <StatCard
            end={350}
            label="Dishes Listed"
            icon={Utensils}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

// --- Reusable Glass Card Component ---
const StatCard = ({ end, label, icon: Icon, delay }) => (
  <div className="group relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/20 hover:border-primary/50">
    {/* Floating Glow Effect behind icon */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all"></div>

    {/* Icon */}
    <div className="mb-4 text-white group-hover:text-primary transition-colors relative z-10">
      <Icon size={48} strokeWidth={1.5} />
    </div>

    {/* Counter */}
    <h3 className="text-5xl font-black text-white mb-2 relative z-10">
      <CountUp
        end={end}
        duration={3}
        suffix="+"
        enableScrollSpy={true} // ✅ Triggers when in view
        scrollSpyOnce={true} // ✅ Runs only once
      />
    </h3>

    {/* Label */}
    <p className="text-gray-300 font-medium uppercase tracking-widest text-sm relative z-10 group-hover:text-white transition-colors">
      {label}
    </p>
  </div>
);

export default StatsSection;
