/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../home/productCard/ProductCard";
import NoDataFound from "../NoData/NoDataFound";

const SuggestedProducts = ({ data }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const d = productData.filter(
      (item) => item.category === data.category && item.id !== data.id
    );
    setFilteredProducts(d);
  }, [data.category, data.id]);

  return (
    <>
      {filteredProducts.length > 0 && (
        <div>
          {data ? (
            <div className={`p-4 ${styles.section}`}>
              <h2
                className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                Related Product
              </h2>
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {filteredProducts &&
                  filteredProducts.map((item, index) => (
                    <ProductCard data={item} key={index} />
                  ))}
              </div>
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}
    </>
  );
};

export default SuggestedProducts;
