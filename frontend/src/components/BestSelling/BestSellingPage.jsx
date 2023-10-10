import Header from "../layout/Header";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import ProductCard from "../home/productCard/ProductCard";
import Footer from "../layout/Footer";
import NoData from "../../../src/assets/svg/Questions-amico.svg";
import { useEffect, useState } from "react";

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(sortedData);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section} flex justify-center items-center`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.length > 0 &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
        {data.length === 0 && (
          <div>
            <img src={NoData} alt="no_data_found" style={{ width: "400px" }} />
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
