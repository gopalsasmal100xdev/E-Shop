import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { SERVER_SHOP_COUPON_URL_API } from "../../../constants/data";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CreateCoupon = () => {
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmout] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${SERVER_SHOP_COUPON_URL_API}/create-coupon`,
        {
          name,
          value,
          maxAmount,
          minAmount,
          shopId: seller?._id,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Coupon created successfully");
        setOpen(false);
        setName("");
        setValue("");
        setMaxAmount("");
        setMinAmout("");
      })
      .catch(() => {
        toast.error("Failed to create coupon!");
      });
  };

  useEffect(() => {}, [open]);

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="cursor-pointer"
        onClick={handleClickOpen}>
        <GrAdd size={20} />
      </Fab>
      <Dialog maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>
            <TiDeleteOutline size={30} color="red" />
          </Button>
        </DialogActions>
        <DialogTitle>Create Coupons</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} aria-required={true} className="w-80">
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your coupon code name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Discount Percentenge <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="value"
                value={value}
                required
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your coupon code value..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">Min Amount</label>
              <input
                type="number"
                name="value"
                value={minAmount}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setMinAmout(e.target.value)}
                placeholder="Enter your coupon code min amount..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">Max Amount</label>
              <input
                type="number"
                name="value"
                value={maxAmount}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Enter your coupon code max amount..."
              />
            </div>
            <br />
            <div>
              <Button type="submit" variant="contained" fullWidth>
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCoupon;
