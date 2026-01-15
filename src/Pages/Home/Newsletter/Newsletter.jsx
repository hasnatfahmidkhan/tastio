import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 px-4">
      <div>
        <div className="bg-primary text-primary-content rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
            {/* Text Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Mail size={16} /> Weekly Food Guide
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Never Miss a <br /> Delicious Update!
              </h2>
              <p className="text-primary-content/80 text-lg">
                Join 10,000+ foodies. Get the latest top-rated dishes and
                restaurant offers delivered to your inbox.
              </p>
            </div>

            {/* Form */}
            <div className="w-full max-w-md">
              <form className="bg-white p-2 rounded-full shadow-lg flex flex-col md:flex-row focus-within:ring-4 ring-white/30 transition-all">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-full outline-none text-gray-800 placeholder-gray-400 bg-transparent text-lg"
                  required
                />
                <button type="button" className="btn btn-neutral rounded-full px-8 py-3 h-auto text-lg normal-case font-bold mt-2 md:mt-0">
                  Subscribe <Send size={18} className="ml-2" />
                </button>
              </form>
              <p className="text-xs text-primary-content/60 mt-4 text-center">
                No spam, just good food. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
