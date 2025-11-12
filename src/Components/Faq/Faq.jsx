const Faq = () => {
  return (
    <section className="mt-20 space-y-5">
      <h2 className="text-4xl text-center md:text-5xl font-bold text-base-content">
        <span className="text-primary">Most Ask</span> Questions
      </h2>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">
          1. Can I edit or delete my review after posting?
        </div>
        <div className="collapse-content text-base">
          Yes. You can edit or delete your review anytime from your profile’s
          ‘My Reviews’ section. Just tap on the review you want to modify.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          2. Do I need an account to post a review?
        </div>
        <div className="collapse-content text-base">
          Yes. You must be logged in to submit reviews or ratings. This helps
          ensure all feedback comes from real users and prevents spam or fake
          ratings.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          3. How do I find top-rated foods near me?
        </div>
        <div className="collapse-content text-base">
          You can explore the ‘Top Rated’ or ‘Nearby’ sections on the home
          screen. The app automatically shows highly-rated dishes and
          restaurants based on your location.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          4. Can restaurant owners respond to reviews?
        </div>
        <div className="collapse-content text-base">
          Yes, verified restaurant owners can reply to reviews to thank
          customers or address concerns. These responses appear directly below
          the user’s review.
        </div>
      </div>
    </section>
  );
};

export default Faq;
