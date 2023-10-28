import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeProvider from "@mui/material/styles/ThemeProvider.js";
import createTheme from "@mui/material/styles/createTheme.js";
import orange from "@mui/material/colors/orange.js";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
