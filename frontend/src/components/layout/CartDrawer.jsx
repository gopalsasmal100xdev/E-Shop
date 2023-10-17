import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <div onClick={() => onOpen()} className="cursor-pointer">
        <AiOutlineShoppingCart size={30} color="white" />
        {cartItems.length > 0 && (
          <span className="absolute right-0 top-0 rounded-full bg-[#de3e33] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {cartItems.length}
          </span>
        )}
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Your Cart Items 🛒</DrawerHeader>
          <DrawerBody>
            <Cart />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
