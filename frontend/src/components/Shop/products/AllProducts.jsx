import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/reducers/Product";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../constants/data";

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

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
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
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
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        url: item.images?.[0],
        id: item._id,
        name: item.name,
        price: "₹ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  const handleDelete = () => {};

  useEffect(() => {
    dispatch(getAllProducts(seller._id));
  }, [dispatch, products?.length, seller._id]);
  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
};

export default AllProducts;
