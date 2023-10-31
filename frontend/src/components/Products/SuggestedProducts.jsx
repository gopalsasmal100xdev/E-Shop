/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../home/productCard/ProductCard";
import NoDataFound from "../NoData/NoDataFound";
import { useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const productData = [...products];
    const d = productData.filter(
      (item) => item.category === data.category && item._id !== data._id
    );
    setFilteredProducts(d);
  }, [data._id, data.category, data.id, products]);

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
