import "antd/dist/reset.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./app/reducers/auth/authSlice";
import { isAuthenticateSelector } from "./app/selector";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Project from "./components/Project";
import ProtectedRouter from "./components/shares/ProtectedRouter";
import { ACCESS_TOKEN_LOCALSTORAGE } from "./custom";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const isAuthenticated = useSelector(isAuthenticateSelector);
  const dispatch = useDispatch();
  const checkUser = async () => {
    await axiosInstance
      .get("/api/auth")
      .then((response) => {
        if (response.data.success) {
          dispatch(
            loadUser({
              isLoading: false,
              isAuthenticated: true,
              user: response.data.result,
            })
          );
        } else {
          dispatch(
            loadUser({
              isLoading: false,
              isAuthenticated: false,
              user: response.data.result,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
        localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);
        dispatch(
          loadUser({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          })
        );
      });
  };
  useEffect(() => {
    checkUser();
  }, [localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE)]);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRouter
              isAuthen={isAuthenticated}
              redirectPath="/auth/login"
            >
              <Dashboard />
            </ProtectedRouter>
          }
        />
        <Route path="/project/*" element={<Project />} />
        <Route path="/auth/*" element={<Auth isAuthen={isAuthenticated} />} />
      </Routes>
    </div>
  );
}

export default App;
