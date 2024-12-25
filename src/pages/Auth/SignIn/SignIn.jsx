// src/components/SignIn.jsx

import { useState, useEffect, useContext } from "react";
import { Button, Card, Input } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ScrollToTopBtn from "../../../components/Shared/ScroollToTop/ScrollToTopBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import usePublicAxios from "../../../hooks/usePublicAxios";

const SignIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log("state in the location login page", location.state);

  const axiosPublicInstance = usePublicAxios();

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
  });

  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsCaptchaValid] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(4, "#00BF63");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "captcha") {
      setIsCaptchaValid(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Captcha Validation
    if (!formData.captcha) {
      newErrors.captcha = "Captcha is required.";
    } else if (!validateCaptcha(formData.captcha)) {
      newErrors.captcha = "Captcha does not match.";
    } else {
      setIsCaptchaValid(true);
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    signInUser(formData.email, formData.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logged in!",
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset form
        setFormData({
          email: "",
          password: "",
          captcha: "",
        });

        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid credentials",
          text: "Please check your email and password",
          showConfirmButton: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        // Reload captcha
        loadCaptchaEnginge(4, "#00BF63");
      });
  };
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle().then(async (res) => {
        // create user entry in the database
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
        };
        axiosPublicInstance.post("users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
          }
        });
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged in with Google!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Google Sign In Failed",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center mt-44">
      <div>
        <Helmet>
          <title>Sunnah Store | Sign In</title>
        </Helmet>
        <Card color="transparent" shadow={false}>
          <div className="text-3xl font-bold text-primary">Sign In</div>
          <div className="mt-1 font-normal text-gray-700">
            Enter your details to sign in.
          </div>
          <form
            className="w-full max-w-screen-lg p-6 mt-8 mb-2 rounded-md shadow-md sm:w-[480px]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-6 mb-3">
              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 text-base font-bold text-blue-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  size="lg"
                  placeholder="name@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    errors.email ? "!border-red-500 focus:!border-red-500" : ""
                  }`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-1 text-base font-bold text-blue-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                      errors.password
                        ? "!border-red-500 focus:!border-red-500"
                        : ""
                    }`}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VscEyeClosed size={24} />
                    ) : (
                      <VscEye size={24} />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
                {/* Forgot password link */}
                <NavLink
                  to="/sunnah-store/reset"
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 mt-2"
                >
                  Forgot password?
                </NavLink>
              </div>

              {/* Captcha Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="captcha"
                  className="mb-1 text-base font-bold text-blue-gray-700"
                >
                  Captcha
                </label>
                <label className="label">
                  <LoadCanvasTemplateNoReload />
                </label>
                <Input
                  id="captcha"
                  name="captcha"
                  type="text"
                  placeholder="Type the captcha above"
                  size="lg"
                  value={formData.captcha}
                  onChange={handleChange}
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 mt-2 ${
                    errors.captcha
                      ? "!border-red-500 focus:!border-red-500"
                      : ""
                  }`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.captcha && (
                  <p className="mt-3 text-sm text-red-500">{errors.captcha}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-6 bg-primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-5">
              <hr className="w-1/4 h-1 bg-gray-600" />
              <p>Or Continue</p>
              <hr className="w-1/4 h-1 bg-gray-600" />
            </div>

            {/* Google Sign-In */}
            <div className="w-full">
              <Button
                className="bg-red-600 w-full flex justify-center items-center gap-2"
                onClick={handleGoogleSignIn}
              >
                <span>
                  <FaGoogle className="text-xl" />
                </span>
                <span>Continue with Google</span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 font-normal text-center">
              Don&apos;t have an account?
              <Link
                to={"/sunnah-store/signup"}
                className="ml-2 font-medium text-primary"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Card>
      </div>
      <ScrollToTopBtn />
    </div>
  );
};

export default SignIn;
