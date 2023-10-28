import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/reducers/Product";

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(seller._id));
  }, [dispatch, products?.length, seller._id]);
  return <div>products</div>;
};

export default AllProducts;
