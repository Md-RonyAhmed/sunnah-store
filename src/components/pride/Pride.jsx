import PrideCard from "./PrideCard";
import { prideData } from "./prideData";

const Pride = () => {
  return (
    <>
      <div 
      className="container py-10 my-10">
        <h3 className="text-center text-4xl capitalize text-[#00bf63] font-semibold mb-4">
          our pride
        </h3>
        <div className="grid mx-auto w-full gap-8 md:grid-cols-2 lg:grid-cols-4 py-4 shadow-md rounded-lg">
          {prideData.map((info) => (
            <PrideCard
              key={info.id}
              title={info.title}
              description={info.description}
              image={info.image}
              alt={info.alt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pride;
