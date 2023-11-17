import { Spin } from "antd";
import React from "react";

//interface...
interface IButtonProps {
  children: React.ReactNode;
  buttonStyle?: React.CSSProperties;
  link?: any;
  loading?: any;
  onClick?: any;
}

const GlobalButton = ({
  children,
  buttonStyle,
  link,
  onClick,
  loading,
}: IButtonProps) => {
  return (
    <div className="relative">
      <a
        href={link}
        style={buttonStyle}
        className=" w-fit  flex items-center justify-center relative"
        onClick={onClick}
      >
        {children}
      </a>
      {loading && <Spin className="absolute left-[50%] top-[44%]" />}
    </div>
  );
};

export default GlobalButton;
