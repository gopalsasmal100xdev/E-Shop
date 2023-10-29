import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClear, AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../static/data";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SERVER_PRODUCTS_URL } from "../../../constants/data";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const [loadingBTN, setLoadingBTN] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [viewImage, setViewImage] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingBTN(true);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("shopId", seller._id);
    axios
      .post(`${SERVER_PRODUCTS_URL}/create-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Product created successfully!");
        setLoadingBTN(false);
        navigate("/shop/all-products");
      })
      .catch(() => {
        setLoadingBTN(false);
        toast.error("Filed to create product!");
      });
  };
  const handleImageChange = (event) => {
    if (event.target.files) {
      const file = Array.from(event.target.files);
      setViewImage((prev) => [
        ...prev,
        URL.createObjectURL(event.target.files[0]),
      ]);
      setImages((prev) => [...prev, ...file]);
    }
  };

  const clearAllImages = () => {
    setImages([]);
    setViewImage([]);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] bg-white  shadow h-[80vh] rounded-md p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option
                  value={item.title}
                  key={item.title}
                  className="cursor-pointer">
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <AiOutlineClear
            size={20}
            color="green"
            className={`${
              viewImage.length === 0 ? "hidden" : ""
            } cursor-pointer m-2`}
            title="Clear all images"
            onClick={clearAllImages}
          />
          <input
            type="file"
            multiple
            name="images"
            id="upload"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 cursor-pointer"
                color="#555"
                title="Click to upload image!"
              />
            </label>
            {viewImage &&
              viewImage.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt="selected_images"
                  className="h-[120px] w-[120px] rounded-md object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value={`${loadingBTN ? "Creating..." : "Create"}`}
              disabled={loadingBTN}
              className="mt- cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 hover:bg-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
