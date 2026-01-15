import { HelpCircle } from "lucide-react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Link } from "react-router";

const Faq = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <SectionHeader
                heading="Frequently Asked Questions"
                subHeading="Everything you need to know about using Tastio."
                badge="Support"
                icon={HelpCircle}
                align="left"
              />
              <div className="mt-8 p-6 bg-base-200 rounded-2xl border border-base-300">
                <h4 className="font-bold text-lg mb-2">
                  Still have questions?
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Can’t find the answer you’re looking for? Please chat to our
                  friendly team.
                </p>
                <Link to={"/contact"} className="btn btn-primary w-full">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Accordion List */}
          <div className="lg:w-2/3 space-y-4">
            <FaqItem
              question="Can I edit or delete my review after posting?"
              answer="Yes. You can edit or delete your review anytime from your profile’s ‘My Reviews’ section. Just tap on the review you want to modify."
              isOpen={true} // Open first one by default
            />

            <FaqItem
              question="Do I need an account to post a review?"
              answer="Yes. You must be logged in to submit reviews or ratings. This helps ensure all feedback comes from real users and prevents spam or fake ratings."
            />

            <FaqItem
              question="How do I find top-rated foods near me?"
              answer="You can explore the ‘Top Rated’ or ‘Nearby’ sections on the home screen. The app automatically shows highly-rated dishes and restaurants based on your location."
            />

            <FaqItem
              question="Can restaurant owners respond to reviews?"
              answer="Yes, verified restaurant owners can reply to reviews to thank customers or address concerns. These responses appear directly below the user’s review."
            />

            <FaqItem
              question="Is it free to list my restaurant?"
              answer="Yes! Listing your restaurant on Tastio is completely free. We charge a small commission only on premium promoted listings."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Accordion Item
const FaqItem = ({ question, answer, isOpen = false }) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-xl hover:shadow-md transition-shadow group">
      <input type="radio" name="faq-accordion" defaultChecked={isOpen} />
      <div className="collapse-title text-lg font-semibold group-hover:text-primary transition-colors flex items-center gap-3">
        {question}
      </div>
      <div className="collapse-content">
        <p className="text-gray-500 leading-relaxed pb-2">{answer}</p>
      </div>
    </div>
  );
};

export default Faq;
