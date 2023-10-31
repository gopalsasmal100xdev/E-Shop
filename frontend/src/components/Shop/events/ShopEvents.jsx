import { Loader1 } from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";
import { useEffect } from "react";
import { TbReload } from "react-icons/tb";
import {
  deleteShopEvents,
  getShopAllEvents,
} from "../../../redux/reducers/ShopEvents";
import ShopProductView from "../../modals/ShopProductView";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import NoDataFound from "../../NoData/NoDataFound";
import { SERVER_URL } from "../../../constants/data";

const ShopEvents = () => {
  const { loading, events } = useSelector((state) => state.shopEvents);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "image",
      headerName: "Product Image",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <img
            className="w-10 object-cover"
            src={`${SERVER_URL}/${params.row?.url}`}
            alt="product-image"
          />
        );
      },
    },
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ShopProductView data={params.row.data} />
          </>
        );
      },
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {/* <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} color="red" />
            </Button> */}
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
      type: "number",
      sortable: false,
    },
  ];
  const row = [];
  events.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: "₹ " + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
      url: item.images?.[0],
      data: item,
    });
  });

  const handleDelete = (id) => {
    setOpen(false);
    dispatch(deleteShopEvents(id));
  };
  function rerenderPage() {
    dispatch(getShopAllEvents());
  }
  useEffect(() => {
    dispatch(getShopAllEvents());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          {events.length > 0 ? (
            <>
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      )}
    </>
  );
};

export default ShopEvents;
