import { Helmet } from "react-helmet-async";

const Cart = () => {
  return (
    <div className="mt-32 mb-6 text-2xl">
      <Helmet>
        <title>Sunnah Store | Cart</title>
      </Helmet>
      The cart is empty
    </div>
  );
};

export default Cart;
