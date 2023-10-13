import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import WishList from "../wishList/WishList";
import { useSelector } from "react-redux";

const WishListDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wishListItems } = useSelector((state) => state.wishList);
  return (
    <>
      <div onClick={() => onOpen()}>
        <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
        {wishListItems.length > 0 && (
          <span className="absolute right-0 top-0 rounded-full bg-[#de3e33] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
            {wishListItems.length}
          </span>
        )}
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Your Wish List 💝</DrawerHeader>
          <DrawerBody>
            <WishList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default WishListDrawer;
