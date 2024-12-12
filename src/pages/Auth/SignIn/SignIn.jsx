import { FaGithub, FaFacebook, FaGoogle } from "react-icons/fa";
import { Card, Input, Checkbox, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SingIn() {
  return (
    <div className="flex justify-center my-28">
      <Card color="transparent" shadow={false}>
        <div className="text-[#00BF63] text-2xl font-bold">Sign In</div>
        <div color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to sign in.
        </div>
        <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
          <div className="flex flex-col gap-6 mb-1">
            <div color="blue-gray" className="-mb-3 text-base font-bold">
              Your Name
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
              Your Email
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
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <div
                color="gray"
                className="flex items-center text-sm font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </div>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6 bg-[#00BF63]" fullWidth>
            sign In
          </Button>

          <div className="flex items-center justify-center gap-2 my-5">
            <hr className="w-1/4 h-1 bg-gray-600" />
            <p>Or Contiue</p>
            <hr className="w-1/4 h-1 bg-gray-600" />
          </div>

          <div className="flex items-center justify-between w-1/2 mx-auto text-3xl">
            <button>
              <FaGoogle className="hover:text-[#00BF63]" />
            </button>
            <button>
              <FaFacebook className="hover:text-[#00BF63]" />
            </button>
            <button>
              <FaGithub className="hover:text-[#00BF63]" />
            </button>
          </div>

          <div color="gray" className="mt-4 font-normal text-center">
            Dont have an account?
            <Link
              to={"/auth/signup"}
              className="ml-2 font-medium text-[#00BF63]"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
