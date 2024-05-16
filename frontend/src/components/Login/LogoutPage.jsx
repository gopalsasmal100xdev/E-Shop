import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetCartItems } from "../../redux/reducers/Cart";
import { useDispatch } from "react-redux";


const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const logoutHandler = () => {
    // clear previous user cart items
    resetCartItems(dispatch);
    Cookies.remove("token");
    Cookies.remove("userId");
    alert("Logout")
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  return (
    <div>
      <Center className="">
        <Button colorScheme="red" onClick={onOpen}>
          Logout
        </Button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered>
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={logoutHandler}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    </div>
  );
};

export default LogoutPage;
