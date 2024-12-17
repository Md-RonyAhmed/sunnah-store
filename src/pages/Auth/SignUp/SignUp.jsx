// src/components/SignUp.jsx

import { useState, useEffect } from "react";
import { Button, Card, Input } from "@material-tailwind/react";
import ScrollToTopBtn from "../../../components/Shared/ScroollToTop/ScrollToTopBtn";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track captcha validity
  const [, setIsCaptchaValid] = useState(false);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Load captcha once on mount
  useEffect(() => {
    loadCaptchaEnginge(6, "#00BF63");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message as the user types
    setErrors({
      ...errors,
      [name]: "",
    });

    // Reset captcha validity if captcha field is modified
    if (name === "captcha") {
      setIsCaptchaValid(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else {
      const nameRegex = /^[A-Z.a-z.\s]+$/;
      if (!nameRegex.test(formData.name.trim())) {
        newErrors.name = "Name can only contain letters and spaces.";
      }
    }

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

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Captcha Validation on Submission
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
    } else {
      console.log("Form submitted successfully:", formData);

      // TODO: Replace with actual sign-up logic

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        captcha: "",
      });
      setIsCaptchaValid(false);
      setErrors({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        captcha: "",
      });
      setIsSubmitting(false);

      // Reload captcha after successful submission
      loadCaptchaEnginge(6, "#00BF63");
    }
  };

  return (
    <div className="flex justify-center mt-32">
      <Helmet>
        <title>Sunnah Store | Sign Up</title>
      </Helmet>
      <div>
        <Card color="transparent" shadow={false}>
          <div className="text-3xl font-bold text-primary">Sign Up</div>
          <div color="gray" className="mt-1 font-normal">
            Enter your details to Register or Sign Up.
          </div>
          <form
            className="w-full max-w-screen-lg p-6 mt-8 mb-2 rounded-md shadow-md sm:w-[480px]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-6 mb-2">
              {/* Name Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-1 text-base font-bold text-blue-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  size="lg"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={handleChange}
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                    errors.name ? "!border-red-500  focus:!border-red-500" : ""
                  }`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

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
                    errors.email ? "!border-red-500  focus:!border-red-500" : ""
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
                      errors.password ? "!border-red-500  focus:!border-red-500" : ""
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
              </div>

              {/* Confirm Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 text-base font-bold text-blue-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                      errors.confirmPassword ? "!border-red-500  focus:!border-red-500" : ""
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
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
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
                  // Removed onBlur event
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 mt-2 ${
                    errors.captcha ? "!border-red-500  focus:!border-red-500" : ""
                  }`}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.captcha && (
                  <p className="mt-2 text-sm text-red-500">{errors.captcha}</p>
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
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-5">
              <hr className="w-1/4 h-1 bg-gray-600" />
              <p>Or Continue</p>
              <hr className="w-1/4 h-1 bg-gray-600" />
            </div>

            {/* Google Sign-Up */}
            <div className="w-full">
              <Button className="bg-red-600 w-full flex justify-center items-center gap-2">
                <span>
                  <FaGoogle className="text-xl" />
                </span>
                <span>Continue with Google</span>
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="mt-4 font-normal text-center">
              Already have an account?
              <Link to={"/signin"} className="ml-2 font-medium text-primary">
                Sign In
              </Link>
            </div>
          </form>
        </Card>
      </div>
      <ScrollToTopBtn />
    </div>
  );
};

export default SignUp;
