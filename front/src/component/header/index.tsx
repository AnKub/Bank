import React from "react";
import back from "../../assets/svg/arrow-back.svg";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ title }: { title?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img
        className="click"
        onClick={() => navigate(-1)}
        src={back}
        alt="back"
      />
      <h3>{title}</h3>
    </div>
  );
};
