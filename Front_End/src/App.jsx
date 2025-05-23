import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import DataProvider, { DataContext } from "./Context/DataProvider";
import { Suspense, lazy } from "react";
import CreatePost from "./components/create/CreatePost";
import DetailPost from "./components/Home_Component/DetailPost";
import UpdatePost from "./components/create/UpdatePost";

// Lazy-loaded components
const Login = lazy(() => import("./components/account/Login"));
const Register = lazy(() => import("./components/account/Register"));
const Home = lazy(() => import("./components/pages/Home"));
const About = lazy(() => import("./components/pages/About"));
const Contact = lazy(() => import("./components/pages/Contact"));

function App() {
  const { isAuthenticated,account} = useContext(DataContext)

  const PrivateRoute = () => {
    if (account.username) {
      return (
        <>
          <Outlet />
        </>
      );
    } else {
      return <Navigate replace to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <DataProvider>

        {/* Add Suspense to handle the fallback */}

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PRIVATE ROUTES AFTER LOGIN */}
            
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/postDetails" element={<DetailPost />} />
              <Route path="/Update" element={<UpdatePost />} />

            </Route>
          </Routes>
        </Suspense>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
