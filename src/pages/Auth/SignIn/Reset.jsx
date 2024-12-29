import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Reset = () => {
  const [email, setEmail] = useState("");
  const { sendResetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePasswordReset = () => {
    if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email address!",
      });
      return;
    }
    sendResetPassword(email).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Password reset email sent successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/sunnah-store/signin");
    });
  };

  return (
    <div className="flex flex-col p-8 justify-center items-center min-h-screen">
      <Helmet>
        <title>Sunnah Store | Reset</title>
      </Helmet>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address below and we will send you a link to reset
          your password.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
          />
          <button
            className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-green-400 transition duration-300 ease-in-out"
            onClick={handlePasswordReset}
          >
            Send Password Reset Email
          </button>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Didn&apos;t signin yet?{" "}
          <Link
            to="/sunnah-store/signin"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-2">
          <Link to="/" className="text-primary font-medium hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Reset;
