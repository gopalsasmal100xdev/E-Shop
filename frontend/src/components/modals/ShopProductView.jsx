/* eslint-disable react/prop-types */
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { SERVER_URL } from "../../constants/data";

const ShopProductView = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AiOutlineEye
        color="lightblue"
        size={22}
        className="cursor-pointer"
        onClick={handleClickOpen}
        title="Quick view"
      />
      <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogContent>
          <div className="block w-full md:flex">
            <div className="w-full">
              {data.images.length > 0 && (
                <img
                  src={`${SERVER_URL}/${data.images[0]}`}
                  alt="product_image"
                  className="object-cover"
                />
              )}
              <div className="flex">
                {/* this link will be replace with Shop link */}
                <Link to={"/"} className="flex">
                  <img
                    src={`${SERVER_URL}/${data.shop?.avatar?.url}`}
                    alt="shop"
                    className="w-[50px] h-[50px] object-cover rounded-full mr-2"
                  />
                  {/* <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    {console.log(data.shop)}
                    {data.shop && (
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    )}
                  </div> */}
                </Link>
              </div>
              {data.total_sell && (
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              )}
            </div>
            {/* product description */}
            <div className="w-full pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data.discount_price ? "₹ " + data.discount_price : null}
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.price ? "₹ " + data.price : null}
                </h3>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShopProductView;
