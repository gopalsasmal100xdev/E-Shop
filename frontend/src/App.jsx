import { Routes, Route } from "react-router-dom";
import { Login, Signup } from "./Routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
