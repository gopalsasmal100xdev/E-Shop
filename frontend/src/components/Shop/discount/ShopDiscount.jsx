import { useCallback, useEffect, useState } from "react";
import CreateCoupon from "./CreateCoupon";
import { Loader1 } from "../../Loader/Loader";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { SERVER_SHOP_COUPON_URL_API } from "../../../constants/data";
import { toast } from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { TbReload } from "react-icons/tb";

const ShopDiscount = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { seller } = useSelector((state) => state.seller);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    if (seller) {
      axios
        .delete(`${SERVER_SHOP_COUPON_URL_API}/delete-coupon-code/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setOpen(false);
          toast.success(res.data.message);
          getAllCouponCode();
        })
        .catch(() => {
          setOpen(false);
          toast.error("Failed to delete coupon!");
        });
    }
  };

  const getAllCouponCode = useCallback(() => {
    axios
      .get(`${SERVER_SHOP_COUPON_URL_API}/get-shop-coupon-codes/${seller?._id}`)
      .then((res) => {
        setLoading(false);
        setCoupons(res.data);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to get coupon");
      });
  }, [seller?._id]);

  const rerenderPage = () => {
    getAllCouponCode();
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={handleClickOpen}>
              <AiOutlineDelete size={20} color={"red"} />
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={() => handleClose()}
              aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">
                {"Delete Product"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this product?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>
                  cancel
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AiTwotoneDelete />}
                  color="error"
                  onClick={() => handleDelete(params.id)}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
    },
    {
      field: "Reload",
      headerName: (
        <TbReload
          size={20}
          className="cursor-pointer m-5"
          color="green"
          onClick={rerenderPage}
        />
      ),
      type: "string",
      sortable: false,
    },
  ];
  const row = [];
  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  useEffect(() => {
    setLoading(true);
    if (seller) {
      getAllCouponCode();
    }
  }, [getAllCouponCode, seller, seller._id]);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10">
          <div className="w-full flex justify-start">
            <CreateCoupon />
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default ShopDiscount;
