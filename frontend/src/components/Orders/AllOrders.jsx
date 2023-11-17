import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";

const AllOrders = () => {
  const orders = [
    {
      _id: 1,
      title: "gopal",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "success",
      itemsQty: 10,
    },
    {
      _id: 2,
      title: "krishna",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "failed",
      itemsQty: 10,
    },
    {
      _id: 3,
      title: "cronix",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "pending",
      itemsQty: 10,
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <>
            <Chip
              label={params?.value}
              color={`${
                params?.value === "success"
                  ? "primary"
                  : params?.value === "pending"
                  ? "warning"
                  : "error"
              }`}
            />
          </>
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`this link will be replace with dynamic data ${params._id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default AllOrders;
