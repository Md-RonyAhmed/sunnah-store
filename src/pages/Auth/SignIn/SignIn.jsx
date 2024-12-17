// src/components/SignIn.jsx

import { useState } from "react";
import { Button, Card, Input } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ScrollToTopBtn from "../../../components/Shared/ScroollToTop/ScrollToTopBtn";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // State to handle form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for input changes
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
  };

  // Validation function
  const validate = () => {
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

    return newErrors;
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
    } else {
      // Proceed with form submission (e.g., API call)
      console.log("Form submitted successfully:", formData);

      // TODO: Replace the console log with actual sign-in logic

      // Reset form fields
      setFormData({
        email: "",
        password: "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-40">
      <div>
        <Card color="transparent" shadow={false}>
          <div className="text-3xl font-bold text-primary">Sign In</div>
          <div color="gray" className="mt-1 font-normal">
            Enter your details to sign in.
          </div>
          <form
            className="w-full max-w-screen-lg p-6 mt-8 mb-2 rounded-md shadow-md sm:w-[480px]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-6 mb-2">
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
              </div>
            </div>

            {/* Forgot password link */}
            <NavLink
              to="/reset"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Forgot password?
            </NavLink>

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
              <Button className="bg-red-600 w-full flex justify-center items-center gap-2">
                <span>
                  <FaGoogle className="text-xl" />
                </span>
                <span>Continue with Google</span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 font-normal text-center">
              Don&apos;t have an account?
              <Link to={"/signup"} className="ml-2 font-medium text-primary">
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
