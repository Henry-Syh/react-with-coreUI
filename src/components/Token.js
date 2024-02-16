import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "src/utils";

export const ChkToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken() == null) {
      alert("NO TOKEN!");
      navigate("/login");
    }
  }, []);
};
