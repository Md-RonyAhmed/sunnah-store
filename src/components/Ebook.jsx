import { useNavigate } from "react-router-dom";

const Ebook = () => {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate("/products/books");
  };
  return (
    <>
      <div
        className="fixed left-5 top-1/2 transform -translate-y-1/2 -rotate-90 origin-left bg-gray-600 text-white px-3 py-2 rounded-b-md shadow-lg cursor-pointer text-sm md:text-base lg:text-lg"
        onClick={handleBook}
      >
        Read Sunnah Store Books
      </div>
    </>
  );
};

export default Ebook;
