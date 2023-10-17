/* eslint-disable react/prop-types */
import { BiSolidMessageDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePayment,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook, TbLogout } from "react-icons/tb";
import { useSelector } from "react-redux";
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
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ProfileSidebar = ({ active, setActive }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    Cookies.remove("token");
    toast.success("You successfully logged out!");
    navigate("/");
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {/* Profile */}
      <div
        className={`flex items-center cursor-pointer w-full mb-8`}
        onClick={() => setActive(1)}>
        <RxPerson size={25} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Profile
        </span>
      </div>
      {/* Orders */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={25} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Orders
        </span>
      </div>
      {/* Refunds */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund size={25} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Refunds
        </span>
      </div>
      {/* Inbox */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}>
        <BiSolidMessageDetail size={25} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Inbox
        </span>
      </div>
      {/* Track Order */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={25} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Track Order
        </span>
      </div>
      {/* Change Password */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}>
        <RiLockPasswordLine size={25} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Change Password
        </span>
      </div>
      {/* Payment Method */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}>
        <MdOutlinePayment size={25} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Payment Method
        </span>
      </div>
      {/* Address */}
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8)}>
        <TbAddressBook size={25} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Address
        </span>
      </div>

      {/* User/Admin */}
      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(9)}>
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 9 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 9 ? "text-[red]" : ""
              } 800px:block hidden`}>
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      {/* Logout  */}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={() => {
          setActive(10);
          onOpen();
        }}>
        <TbLogout size={20} color={active === 10 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 10 ? "text-[red]" : ""
          } 800px:block hidden`}>
          Log out
        </span>
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
              <Button colorScheme="red" ml={3} onClick={logoutHandler}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfileSidebar;
