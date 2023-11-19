import React, { useLayoutEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

//images...
import chat from "../../../public/logo/chat.png";

//context

import { Theme } from "../../config/ThemeContext";

//react icons..
import { CiSettings, CiUser } from "react-icons/ci";
import { FiSun } from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";

//antd imports
import { Tooltip } from "antd";
import { Outlet } from "react-router-dom";
import Chatroom from "./chatroom/Chatroom";

const DashboardIndex = () => {
  const [user_email, set_user_email] = useState<any>();
  const [username, set_username] = useState<any>();

  const { dark, handleTheme } = useContext(Theme);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set_user_email(auth.currentUser?.email);
        set_username(auth.currentUser?.displayName);
      } else {
        window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    const div = document.getElementById("dark");
    if (dark) {
      div?.classList.add("dark");
    } else {
      div?.classList.remove("dark");
    }
  }, [dark]);

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
