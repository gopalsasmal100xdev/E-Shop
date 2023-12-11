import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import toast from "react-hot-toast";

const CartDialog = () => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleClickOpen = () => {
    if (isAuthenticated) setOpen(true);
    else {
      toast.error("Please login❗");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Badge
        color="secondary"
        badgeContent={(cartItems && cartItems.length) || 0}>
        <AiOutlineShoppingCart
          size={30}
          color="white"
          onClick={handleClickOpen}
          className="cursor-pointer"
        />
      </Badge>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}>
        <DialogContent>
          <Cart />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartDialog;
