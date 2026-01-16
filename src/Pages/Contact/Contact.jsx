import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import Container from "../../Components/Container/Container";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import toast from "react-hot-toast";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Here you would typically send data to your backend or EmailJS
    console.log(data);
    toast.success("Message sent successfully! We will get back to you soon.");
    reset();
  };

  return (
    <>
      <Container className={'mt-20'}>
        {/* Header */}
        <SectionHeader
          heading="Get in Touch"
          subHeading="Have a question or feedback? We would love to hear from you."
          badge="Contact Us"
          icon={Mail}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-base-200">
          {/* Left Side: Contact Info */}
          <div className="bg-primary text-primary-content p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-primary-content/80 mb-10 text-lg">
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 opacity-80" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="opacity-80">+880 19 4422 4475</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1 opacity-80" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="opacity-80">support-tastio@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 opacity-80" />
                  <div>
                    <p className="font-semibold">Office</p>
                    <p className="opacity-80">
                      Level 4, Khan Plaza, Dhanmondi 27,
                      <br /> Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <p className="font-semibold mb-4">Follow Us</p>
              <div className="flex gap-4">
                <SocialIcon icon={<Facebook size={20} />} />
                <SocialIcon icon={<Twitter size={20} />} />
                <SocialIcon icon={<Linkedin size={20} />} />
                <SocialIcon icon={<Instagram size={20} />} />
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10 md:p-14 bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label font-semibold text-gray-600">
                    First Name
                  </label>
                  <input
                    {...register("firstName", { required: true })}
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full focus:input-primary bg-base-200/50"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-gray-600">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full focus:input-primary bg-base-200/50"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full focus:input-primary bg-base-200/50"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-600">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  className="textarea textarea-bordered h-32 w-full focus:textarea-primary bg-base-200/50 resize-none text-base"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/30">
                Send Message <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
  >
    {icon}
  </a>
);

export default Contact;
