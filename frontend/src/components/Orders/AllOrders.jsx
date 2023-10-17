import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const orders = [
    {
      id: 1,
      title: "gopal",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "success",
      itemsQty: 10,
    },
    {
      id: 2,
      title: "krishna",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "failed",
      itemsQty: 10,
    },
    {
      id: 3,
      title: "cronix",
      cart: [{ message: "gopal" }],
      totalPrice: 100,
      status: "pending",
      itemsQty: 10,
    },
  ];
  const columns = [
    { key: "id", name: "Order ID", minWidth: 150, flex: 0.7 },

    {
      key: "status",
      name: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      key: "itemsQty",
      name: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      key: "total",
      name: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      key: "link",
      flex: 1,
      minWidth: 150,
      name: "",
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id, // this id will replace with _id
        title: item.cart.length,
        total: "US$ " + item.totalPrice,
        status:
          item.status === "success" ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              {item.status}
            </span>
          ) : item.status === "pending" ? (
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {item.status}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
              {item.status}
            </span>
          ),
        itemsQty: item.itemsQty,
        link: (
          <>
            <Link to={`/user/order/${item.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        ),
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid rows={row} columns={columns} />
    </div>
  );
};

export default AllOrders;
