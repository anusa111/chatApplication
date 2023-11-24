import { useState } from "react";

//images...
//react icons..
import { BiMenuAltRight } from "react-icons/bi";
import CustomDrawer from "../../antdComponents/CustomDrawer";
import GlobalButton from "./globalButton";

const Header = () => {
  //states..
  const [openNavDrawer, setOpenNavDrawer] = useState(false);

  //functions...
  const showNavDrawer = () => {
    setOpenNavDrawer(true);
  };

  const onCloseNavDrawer = () => {
    setOpenNavDrawer(false);
  };

  const header_menu = [
    {
      menu: "Home",
      link: "/",
    },

    {
      menu: "Features",
      link: "/",
    },
    {
      menu: "Pricing",
      link: "/",
    },

    {
      menu: "Contact us",
      link: "/",
    },
    {
      menu: "Blogs",
      link: "/",
    },
  ];

  return (
    <div className=" fixed w-full bg-white z-50 ">
      <div className="layout layout-padding">
        <div className="lg:py-[25px] py-[20px]">
          <div className="grid lg:grid-cols-12 grid-cols-2 lg:gap-10 items-center justify-center">
            <a
              href="/"
              className=" lg:col-span-3 flex items-center text-2xl font-bold "
              style={{
                color: "var(--primary-color)",
              }}
            >
              Chat Chamber
            </a>
            <div className="hidden lg:flex lg:col-span-6 justify-center ">
              <div className="flex gap-[40px] text-[16px] font-semibold items-center">
                {header_menu.map((menu, index) => {
                  return (
                    <div key={index}>
                      <a href={menu.link} className="">
                        {menu.menu}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden text-[14px] lg:flex  lg:col-span-3 items-center justify-end gap-[32px] font-bold">
              <a href="/login">Login</a>
              <a
                href="/sign-up"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
                className="px-[18px] py-[9px] rounded-[9px]"
              >
                Sign up
              </a>
            </div>

            <div
              className="lg:hidden flex items-center justify-end"
              onClick={showNavDrawer}
            >
              <BiMenuAltRight size={25} />
            </div>
          </div>
        </div>
        <CustomDrawer onClose={onCloseNavDrawer} open={openNavDrawer}>
          <div className="flex flex-col items-center  mt-20 ">
            <div className=" flex flex-col items-center justify-center gap-6 text-[16px] mb-10">
              {header_menu.map((menu, index) => {
                return (
                  <div key={index} className="">
                    <a href={menu.link} className="">
                      {menu.menu}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <GlobalButton
                buttonStyle={{
                  color: "var(--black-color)",
                  borderRadius: "9px",
                  padding: "9px 18px",
                }}
                link="/sign-up"
              >
                <div className="text-[15px] font-bold">Login</div>
              </GlobalButton>
              <GlobalButton
                buttonStyle={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: "9px",
                  padding: "9px 18px",
                  width: "40vh",
                }}
                link="/sign-up"
              >
                Sign Up
              </GlobalButton>
            </div>
          </div>
        </CustomDrawer>
      </div>
    </div>
  );
};

export default Header;
