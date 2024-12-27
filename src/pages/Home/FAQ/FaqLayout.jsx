import FAQ from "./FAQ";
import faqImage from "../../../assets/images/FAQImage/FAQ.jpg";
import faqsData from "./FaqData.json";
import { useState } from "react";
import { useEffect } from "react";

const FaqLayout = () => {
  const [faqData, setFaqData] = useState([]);
  const [showFaq, setShowFaq] = useState(false);

  const handleShowAndHide = (id) => {
    setShowFaq((privId) => (privId === id ? false : id));
  };

  useEffect(() => {
    setFaqData(faqsData);
  }, []);

  return (
    <section className="p-10 my-10">
      <h2 className="mb-5 text-3xl font-bold text-center capitalize text-primary">
        frequently ask questions
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-1/2">
          <img src={faqImage} alt="faqImage" className="w-3/4" />
        </div>
        <ul className="w-1/2 space-y-6">
          {faqData.map((correntFaq) => (
            <li key={correntFaq.id}>
              <FAQ
                faqData={correntFaq}
                showFaq={showFaq === correntFaq.id}
                handleShowAndHide={() => handleShowAndHide(correntFaq.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FaqLayout;
