import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = ({ faqData, handleShowAndHide, showFaq }) => {
  return (
    <div className="p-3 transition-all duration-700 ease-in-out bg-gray-200 border-l-4 border-primary">
      <div
        onClick={handleShowAndHide}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="mb-2 text-2xl"> {faqData.question} </h2>
        {showFaq ? (
          <FaMinus className="text-2xl text-primary" />
        ) : (
          <FaPlus className="text-2xl text-primary" />
        )}
      </div>
      <div className="transition-all duration-700 ease-in-out">
        {showFaq && <p> {faqData.answer} </p>}
      </div>
    </div>
  );
};

export default FAQ;
