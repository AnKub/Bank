import React, { MouseEventHandler, ReactElement } from "react";
import "./index.css";

type buttonProps = {
  onClick?: MouseEventHandler;
  children?: ReactElement | ReactElement[] | string;
  isOutside?: boolean;
  color?: string;
  isActive?: boolean;
  style?: React.CSSProperties;
};

export const Button = ({
  onClick,
  children,
  isOutside,
  color,
  isActive = true,
  style,
}: buttonProps) => {
  const buttonStyles: any = {
    "--color": color,
    ...style,
  };

  return (
    <div
      onClick={(e) => {
        if (onClick && isActive) onClick(e);
      }}
      className={`button 
      ${isOutside && "button--outside"} ${isActive && "button--active"}`}
      style={buttonStyles}
    >
      {children}
    </div>
  );
};
