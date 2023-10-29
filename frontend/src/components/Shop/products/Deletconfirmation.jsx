/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../redux/reducers/Product";
import { AiOutlineDelete } from "react-icons/ai";

const Deletconfirmation = ({ params }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
    <div>
      <Button
        onClick={() => {
          onOpen();
        }}>
        <AiOutlineDelete size={20} color={"red"} />
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>No</Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => handleDelete(params)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Deletconfirmation;
