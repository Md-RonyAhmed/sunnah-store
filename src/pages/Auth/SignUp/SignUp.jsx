import { Button, Card, Input } from "@material-tailwind/react";
import ScrollToTopBtn from "../../../components/Shared/ScroollToTop/ScrollToTopBtn";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const captchaValue = e.target.value;
    if (validateCaptcha(captchaValue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
          <form className="w-full max-w-screen-lg p-6 mt-8 mb-2 rounded-md shadow-md sm:w-[450px]">
            <div className="flex flex-col gap-6 mb-2">
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Name
              </div>
              <Input
                size="lg"
                name="name"
                placeholder="enter your name..."
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Email
              </div>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Password
              </div>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  placeholder="enter your password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Confirm Password
              </div>
              <div className="relative">
                <Input
                  name="c-password"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  placeholder="confirm your password"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
              <div>
                <label className="label">
                  <LoadCanvasTemplate reloadColor="#00BF63" />
                </label>
                <Input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha above"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            <Button className="mt-6 bg-primary" fullWidth disabled={disabled}>
              sign up
            </Button>
            <div className="flex items-center justify-center gap-2 my-5">
              <hr className="w-1/4 h-1 bg-gray-600" />
              <p>Or Continue</p>
              <hr className="w-1/4 h-1 bg-gray-600" />
            </div>
            <div className="w-full">
              <Button className="bg-red-600 w-full flex justify-center items-center gap-2">
                <span>
                  <FaGoogle className="text-xl" />
                </span>
                <span>Continue with Google</span>
              </Button>
            </div>
            <div color="gray" className="mt-4 font-normal text-center">
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
