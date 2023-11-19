import React from "react";
import ProfileInformation from "./ProfileInformation";

const ProfileLayout = () => {
  return (
    <div className="ml-[5%]">
      <div className="fixed  w-[20%] h-full   p-6  dark:bg-[#303841]   bg-[#F5F7FB] text-[#1e1e1e]  dark:text-[#EFF2F7] z-50">
        <ProfileInformation />
      </div>
      <div className="ml-[21%]">
        <div
          style={{
            minHeight: "150vh",
          }}
          className="h-full  z-10 dark:text-white dark:bg-[#262E35] bg-white text-[#1e1e1e]"
        >
          Friends
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
