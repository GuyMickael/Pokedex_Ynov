import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header/Header";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
