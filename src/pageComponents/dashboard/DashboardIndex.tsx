import { useContext, useEffect, useState } from "react";

//images...
import chat from "../../../public/logo/chat.png";

//context

import { Theme } from "../../config/ThemeContext";

//react icons..
import { CiSettings, CiUser } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { IoChatbubblesOutline, IoMoonOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { GoSignOut } from "react-icons/go";

//antd imports
import { Modal, Tooltip } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const DashboardIndex = () => {
  const { dark, handleTheme } = useContext(Theme);
  const [is_signout_modal_open, set_is_signout_modal_open] = useState(false);

  const authToken = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken === null) {
      localStorage.clear();
      navigate("/");
      console.log("Anusa");
    }
  }, [authToken]);

  useEffect(() => {
    const div = document.getElementById("dark");
    if (dark) {
      div?.classList.add("dark");
    } else {
      div?.classList.remove("dark");
    }
  }, [dark]);

  const showSignoutModal = () => {
    set_is_signout_modal_open(true);
  };

  const handleOk = () => {
    set_is_signout_modal_open(false);
  };

  const handleCancel = () => {
    set_is_signout_modal_open(false);
  };

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" grid " id="dark">
      <div className="  fixed w-[5%] h-full   flex items-center flex-col">
        <div className=" p-6 h-full flex flex-col justify-between items-center bg-white drop-shadow-md dark:bg-[#36404A]">
          <div className="hover:cursor-pointer  translate-y-2">
            <img src={chat} alt="" className="h-[25px] object-cover" />
          </div>
          <div className="flex flex-col gap-8 items-center justify-center">
            <Tooltip title="Profile" placement="rightBottom">
              <a href="/dashboard/profile">
                <CiUser className="text-[#A6B0CF] font-bold p-4 dark:hover:bg-[#3E4A56] hover:bg-[#F7F7FF] hover:text-[#7269EF] hover:rounded-[8px]  h-[60px] w-[60px]" />
              </a>
            </Tooltip>
            <Tooltip title="Chatroom" placement="rightBottom">
              <a href="/dashboard/chatroom">
                <PiUsersThree className="text-[#A6B0CF] font-bold p-4  h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:bg-[#F7F7FF] hover:text-[#7269EF] hover:rounded-[8px]" />
              </a>
            </Tooltip>
            <Tooltip title="Start Chat" placement="rightBottom">
              <a href="/dashboard/startchat">
                <IoChatbubblesOutline className="text-[#A6B0CF]  font-bold p-4 hover:bg-[#F7F7FF]  h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:text-[#7269EF] hover:rounded-[8px]" />
              </a>
            </Tooltip>
            <Tooltip placement="rightBottom" title="Settings">
              <CiSettings className="text-[#A6B0CF] font-bold p-4 hover:bg-[#F7F7FF] h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:text-[#7269EF] hover:rounded-[8px]" />
            </Tooltip>
            <Tooltip placement="rightBottom" title="Signout">
              <GoSignOut
                onClick={showSignoutModal}
                className="text-[#A6B0CF] font-bold p-4 hover:bg-[#F7F7FF] h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:text-[#7269EF] hover:rounded-[8px]"
              />
              <Modal
                open={is_signout_modal_open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
              >
                <div className="text-[16px] mb-6">Are you sure to logout?</div>
                <div className="flex justify-end">
                  <CustomAntdButton
                    buttonStyle={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      borderRadius: "9px",
                      padding: "9px 18px",

                      height: "6vh",
                    }}
                    onClick={() => {
                      localStorage.setItem("auth-token", "");

                      Logout();
                      window.location.href = "/";
                    }}
                  >
                    OK
                  </CustomAntdButton>
                </div>
              </Modal>
            </Tooltip>
          </div>
          <Tooltip title="Dark/Light mode" placement="rightBottom">
            <div
              className="flex items-center justify-center"
              onClick={() => {
                handleTheme();
              }}
            >
              {dark ? (
                <FiSun
                  id="display"
                  className="text-[#A6B0CF] font-bold p-4 hover:bg-[#F7F7FF]  h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:text-[#7269EF] hover:rounded-[8px] "
                />
              ) : (
                <IoMoonOutline
                  id="display"
                  className="text-[#A6B0CF] font-bold p-4 hover:bg-[#F7F7FF]  h-[60px] w-[60px] dark:hover:bg-[#3E4A56] hover:text-[#7269EF] hover:rounded-[8px] "
                />
              )}
            </div>
          </Tooltip>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardIndex;
