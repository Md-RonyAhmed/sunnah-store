
const PrideCard = ({title, description, image, alt}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>
        <img src={image} alt={alt} />
      </div>
      <div className="text-center">
        <h3
        className="text-2xl text-gray-800 capitalize"
        >{title}</h3>
        <p
        className="text-base text-blue-gray-600 capitalize"
        >{description}</p>
      </div>
    </div>
  );
};

export default PrideCard;
