import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import NavbarContainer from "./containers/NavbarContainer";
import PostDetailsPage from "./pages/PostDetailsPage";
import GymDetailsPage from "./pages/GymDetailsPage";

function App() {
  return (
    <>
      <NavbarContainer />
      <div className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailsPage/>}/>
          <Route path="/gym/:id" element={<GymDetailsPage/>}/>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
      </div>

      <Toaster
        position="top center"
      />
    </>
  );
}

export default App;
