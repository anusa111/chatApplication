import React from "react";

//antd imports
import { Drawer } from "antd";

//interface..
interface IDrawerProps {
  onClose?: any;
  open?: any;
  children?: React.ReactNode;
}

const CustomDrawer = ({ onClose, open, children }: IDrawerProps) => {
  return (
    <Drawer title="" placement="right" onClose={onClose} open={open}>
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
