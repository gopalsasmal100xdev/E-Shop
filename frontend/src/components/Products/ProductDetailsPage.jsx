import { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import ProductDetails from "./productDetails";
import { useParams } from "react-router-dom";
import { productData } from "../../static/data";
import SuggestedProducts from "./SuggestedProducts";

const ProductDetailsPage = () => {
  const { details } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [, id] = details.split("[]=");
  useEffect(() => {
    const data = productData.filter((item) => item.id === parseInt(id));
    setProductInfo(data[0]);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <Header />
      <ProductDetails data={productInfo} />
      {productInfo && <SuggestedProducts data={productInfo} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
