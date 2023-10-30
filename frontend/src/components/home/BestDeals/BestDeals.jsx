import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
// import { productData } from "../../../static/data";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/reducers/Product";

const BestDeals = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const productData = [...products];
    const bestSellingProducts = productData.sort(
      (a, b) => b.sold_out - a.sold_out
    );
    const firstFiveProducts = bestSellingProducts.slice(0, 5);
    setData(firstFiveProducts);
  }, [products]);

  return (
    <div className="bg-slate-100">
      <div className={`${styles.section}`}>
        {data.length > 0 && (
          <>
            <div className={`${styles.heading}`}>
              <h1>Best Deals</h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
              {data.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
