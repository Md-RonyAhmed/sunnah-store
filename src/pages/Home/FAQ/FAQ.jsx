const FAQ = ({ faqData, handleShowAndHide, showFaq }) => {
  return (
    <div className="p-3 bg-gray-200 border-l-4 border-primary">
      <div
        onClick={handleShowAndHide}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="mb-2 text-lg font-bold md:text-2xl">
          {faqData.question}
        </h2>
        <svg
          className=" fill-green-500 shrink-0"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="6"
            width="16"
            height="4"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              showFaq && "!rotate-180"
            }`}
          />
          <rect
            y="6"
            width="16"
            height="4"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              showFaq && "!rotate-180"
            }`}
          />
        </svg>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          showFaq ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{faqData.answer}</div>
      </div>
    </div>
  );
};

export default FAQ;
