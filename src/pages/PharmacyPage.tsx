import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Calculadora } from "../components/Calculadora";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { FooterComponent } from "../components/FooterComponent";
import { IMed } from "../interfaces";

export const PharmacyPage = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();
  const [insulinasList, setInsulinas] = useState<IMed[]>([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      if (user?.role === "administrador") {
        navigate("/admin");
      }
      getInsulinas();
    }
  }, []);

  const getInsulinas = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/med`);
    const data = await response.json();
    setInsulinas(data);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="columns p-2 is-centered">
        <div className={"column is-4 offset-4 w-100"}>
          <Calculadora insulinasList={insulinasList} />
        </div>
      </div>
      <div className="columns px-2">
        <div className={"column is-12"}>
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
