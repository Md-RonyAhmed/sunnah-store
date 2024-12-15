import PrideCard from "./PrideCard";
import { prideData } from "./prideData";

const Pride = () => {
  return (
    <section className="bg-[#f2f2f2]">
      <div 
      className="container pt-10 pb-10">
        <h3 className="text-center text-4xl capitalize text-[#00bf63] font-semibold mb-4">
          our pride
        </h3>
        <div className="grid mx-auto w-full gap-8 md:grid-cols-2 lg:grid-cols-4  py-4 ">
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
    </section>
  );
};

export default Pride;
