import No_data_found from "../../assets/svg/no-data-found.svg";

const NoDataFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
      className="h-auto">
      <img src={No_data_found} alt="no_data_found" style={{ width: "400px" }} />
      <h1 className="text-center w-full pb-[100px] text-[20px]">
        No data Found!
      </h1>
    </div>
  );
};

export default NoDataFound;
