import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../productCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const bestSellingProducts = productData.sort(
      (a, b) => b.total_sell - a.total_sell
    );
    const firstFiveProducts = bestSellingProducts.slice(0, 5);
    setData(firstFiveProducts);
  }, []);

  return (
    <div className="bg-slate-100">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length > 0 && (
            <>
              {data.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
