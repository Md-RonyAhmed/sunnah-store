import { Button, Card, Input } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import ScrollToTopBtn from "../../../components/Shared/ScroollToTop/ScrollToTopBtn";

const SignIn = () => {
  return (
    <div className="flex justify-center mt-40">
      <div>
        <Card color="transparent" shadow={false}>
          <div className="text-3xl font-bold text-primary">Sign In</div>
          <div color="gray" className="mt-1 font-normal">
            Enter your details to sign in.
          </div>
          <form className="w-full max-w-screen-lg p-6 mt-8 mb-2 rounded-md shadow-md sm:w-96">
            <div className="flex flex-col gap-6 mb-2">
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Email
              </div>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Password
              </div>
              <Input
                name="password"
                type="password"
                size="lg"
                placeholder="enter your password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {/* <!-- Forgot password link --> */}
            <NavLink
              to="/reset"
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Forgot password?
            </NavLink>
            <Button className="mt-6 bg-primary" fullWidth>
              sign In
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
