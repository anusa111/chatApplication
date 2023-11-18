import React, { useState, useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//react icons
import { LuDot } from "react-icons/lu";
import { Collapse } from "antd";

const ProfileInformation = () => {
  const [email, setEmail] = useState<any | null>(null);
  const [user_name, setUserName] = useState<any | null>(null);
  const [image_url, setImageUrl] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(auth.currentUser?.displayName);
        setEmail(auth.currentUser?.email);
        setImageUrl(auth.currentUser?.photoURL);
      } else {
        window.location.href = "/";
      }
    });
  }, []);

  const onAboutChange = (key: string | string[]) => {
    console.log(key);
  };

  const items: any = [
    {
      key: "1",
      label: "About",
      children: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-[15px] text-[#8992B4] font-medium">Name</div>
            <div className="text-[14px] font-semibold">{email}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[15px] text-[#8992B4] font-medium">
              Username
            </div>
            <div className="text-[14px] font-semibold">{user_name}</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className=" flex flex-col gap-20 ">
      <div className="text-[25px] font-semibold">My Profile</div>
      <div className="flex flex-col items-center justify-center gap-6">
        <img
          src={image_url}
          className="h-[80px] w-[80px] rounded-full object-cover"
        />
        <div className="flex flex-col items-center">
          <div className="text-[16px] font-semibold">{user_name}</div>
          <div className="flex items-center translate-x-[-8px]">
            <LuDot className="h-[6vh] w-[6vh] text-[#67e067]" />
            <div className="translate-x-[-10px]">Active</div>
          </div>
        </div>
      </div>
      <div className=" ">
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onAboutChange}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;
