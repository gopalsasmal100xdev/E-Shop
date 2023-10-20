import { Button } from "@chakra-ui/react";
import notFoundGIF from "../assets/gif/funny_404.gif";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const redirectPage = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div>
        <img src={notFoundGIF} alt="not-found-gif" className="rounded-md" />
      </div>
      <div>
        <h1>Page not found</h1>
        <Button color={"red"} onClick={redirectPage}>
          Go to home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
