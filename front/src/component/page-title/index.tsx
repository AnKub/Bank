import React from "react";
import "./index.css";

export const PageTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="page__title">
      <h1>{title}</h1>
      <h4>{subTitle}</h4>
    </div>
  );
};
