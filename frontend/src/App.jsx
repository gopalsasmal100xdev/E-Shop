import { Routes, Route } from "react-router-dom";
import { Login, Signup, ActivationPage } from "./Routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes>
    </>
  );
};

export default App;
