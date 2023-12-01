import React from "react";
import "./index.css";

export const PageContent = ({ children, isBetween, gap }: any) => {
  return (
    <div
      className={`page__content ${isBetween && "page__content--between"}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
};
