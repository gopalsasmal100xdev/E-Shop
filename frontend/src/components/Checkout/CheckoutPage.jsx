import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Checkout from "./Checkout";
import CheckoutSteps from "./CheckoutSteps";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
