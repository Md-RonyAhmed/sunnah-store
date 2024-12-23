import { Button } from "@material-tailwind/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        className="bg-primary flex items-center gap-x-2 justify-center"
        ripple={true}
      >
        <IoMdArrowRoundBack className="size-4" /> Go Back
      </Button>
    </>
  );
};

export default GoBack;
