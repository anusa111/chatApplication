import { Button, Spin } from "antd";
import React from "react";

//interface...
interface IButtonProps {
  children: React.ReactNode;
  buttonStyle?: React.CSSProperties;
  link?: any;
  loading?: any;
  onClick?: any;
}

const CustomAntdButton = ({
  children,
  buttonStyle,
  link,
  onClick,
  loading,
}: IButtonProps) => {
  return (
    <div className="relative">
      <Button
        href={link}
        style={buttonStyle}
        className=" w-fit  flex items-center justify-center relative"
        onClick={onClick}
        htmlType="submit"
      >
        {children}
      </Button>
      {loading && <Spin className="absolute left-[50%] top-[44%]" />}
    </div>
  );
};

export default CustomAntdButton;
