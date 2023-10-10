import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { FaCartArrowDown } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}>
      <div className={`${styles.section} w-[90%] md:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-sans font-[400] text-[#000000ba]">
          Welcome to our shopping page, the heart of your online shopping
          experience. Here, you will find a <br /> vast selection of products
          across various categories, each carefully curated to meet your needs
          and <br /> preferences. Browse, search, and explore our offerings,
          take advantage of exclusive deals, and read <br /> customer reviews to
          make informed decisions. Happy shopping!
        </p>
        <Link to="/products" className="inline-block">
          <div
            className={`w-[160px] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer ease-in-out delay-150 bg-[#101820FF] hover:-translate-y-1 hover:scale-100 hover:bg-[#1c3046] duration-300 mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px] hover:backdrop-blur-md">
              Shop Now
            </span>
            <FaCartArrowDown size={23} color="cyan" className="ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
