import { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import axios from "axios";
import Header from "../layout/Header";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
import SuggestedProducts from "./SuggestedProducts";
import { SERVER_PRODUCTS_URL } from "../../constants/data";
import toast from "react-hot-toast";
import { Loader1 } from "../Loader/Loader";

const ProductDetailsPage = () => {
  const { details } = useParams();
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [, id] = details.split("[]=");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_PRODUCTS_URL}/single-product/${id}`)
      .then((res) => {
        setProductInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error displaying product details!");
        console.log(err);
      });
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <Header />
      {loading ? <Loader1 /> : <ProductDetails data={productInfo} />}
      {productInfo && <SuggestedProducts data={productInfo} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
