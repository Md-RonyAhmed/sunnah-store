import { Button, Card, Input } from "@material-tailwind/react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            <div className="flex flex-col gap-6 mb-1">
              <div color="blue-gray" className="-mb-3 text-base font-bold">
                Email
              </div>
              <Input
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
              <Input
                type="password"
                size="lg"
                placeholder="enter your password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6 bg-primary" fullWidth>
              sign In
            </Button>

            <div className="flex items-center justify-center gap-2 my-5">
              <hr className="w-1/4 h-1 bg-gray-600" />
              <p>Or Contiue</p>
              <hr className="w-1/4 h-1 bg-gray-600" />
            </div>

            <div className="flex items-center justify-between w-1/2 mx-auto text-3xl">
              <button>
                <FaGoogle className="hover:text-primary" />
              </button>
              <button>
                <FaFacebook className="hover:text-primary" />
              </button>
              <button>
                <FaGithub className="hover:text-primary" />
              </button>
            </div>

            <div color="gray" className="mt-4 font-normal text-center">
              Dont have an account?
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
