import { useForm } from "react-hook-form";
import loginImg from "../../assets/Login.json";
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const axiosInstance = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { googleSignInFunc, setUser, emailPassRegister, updateProfileFunc } =
    useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      const currentUser = await emailPassRegister(data?.email, data?.password);
      await updateProfileFunc(data?.name, data?.photo);
      const newUser = {
        email: currentUser.email,
        photo: currentUser.photoURL,
        name: currentUser.displayName,
      };
      navigate("/");
      await axiosInstance.post("/users", { ...newUser });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignInFunc();
      const currentUser = result.user;
      setUser(currentUser);
      const newUser = {
        email: currentUser.email,
        photo: currentUser.photoURL,
        name: currentUser.displayName,
      };
      navigate(location.state || "/");
      await axiosInstance.post("/users", { ...newUser });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="flex items-center gap-10 min-h-[calc(100vh-180px)] ">
      <div className="hidden md:block">
        <Lottie animationData={loginImg} loop={true} className="w-[550px]" />
      </div>
      <div className="w-full max-w-sm h-full">
        <div className="card bg-base-100 w-full h-full shrink-0 shadow-[0px_10px_1px_rgba(221,221,221,1),0_10px_20px_rgba(204,204,204,1)]">
          <div className="card-body">
            <h1 className="text-3xl mb-2 font-bold text-center text-base-content">
              Register
            </h1>
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="fieldset gap-y-3">
                {/* Name */}
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Name len atleast 3" },
                    })}
                    aria-invalid={errors.name ? true : false}
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="text-error" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* Email  */}
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    {...register("email", { required: "Email is required!" })}
                    aria-invalid={errors.email ? true : false}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-error" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Photo  */}
                <div>
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    className="form-input"
                    {...register("photo", {
                      required: "Photo URL is required",
                    })}
                    aria-invalid={errors.photo ? true : false}
                    placeholder="photoURL"
                  />
                  {errors.photo && (
                    <p className="text-error" role="alert">
                      {errors.photo.message}
                    </p>
                  )}
                </div>
                {/* pass  */}
                <div>
                  <label className="label">Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{6,}$/,
                          message:
                            "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long",
                        },
                      })}
                      aria-invalid={errors.password ? true : false}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 cursor-pointer active:translate-y-0.5 transition-transform duration-150 z-20"
                    >
                      {showPassword ? (
                        <FaEye size={24} />
                      ) : (
                        <FaEyeSlash size={24} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-error" role="alert">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                {/* confirm pass  */}
                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative flex items-center">
                    <input
                      type={cShowPassword ? "text" : "password"}
                      className="form-input"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Password do not match",
                      })}
                      aria-invalid={errors.confirmPassword ? true : false}
                    />
                    <span
                      onClick={() => setCShowPassword(!cShowPassword)}
                      className="absolute right-4 cursor-pointer active:translate-y-0.5 transition-transform duration-150 z-20"
                    >
                      {cShowPassword ? (
                        <FaEye size={24} />
                      ) : (
                        <FaEyeSlash size={24} />
                      )}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-error" role="alert">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary mt-4"
                >
                  {isSubmitting ? "loading..." : "Register"}
                </button>
                <p className="text-base tracking-wide py-1">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-primary cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
                <div className="divider text-sm text-gray-400">
                  Or Register With
                </div>
                {/* Google */}
                <button
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="btn bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Register with Google
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
