import ProfileInformation from "./ProfileInformation";

import start_chat from "../../../assets/start_chat.png";
import GlobalButton from "../../global/globalButton";

const ProfileLayout = () => {
  return (
    <div className="ml-[5%]">
      <div className="fixed  w-[20%] h-full   p-6  dark:bg-[#303841]   bg-[#F5F7FB] text-[#1e1e1e]  dark:text-[#EFF2F7] z-50">
        <ProfileInformation />
      </div>
      <div className="ml-[21%]">
        <div
          style={{
            minHeight: "100dvh",
          }}
          className="h-full flex-col gap-20  flex items-center justify-center  z-10 dark:text-white dark:bg-[#262E35] bg-white text-[#1e1e1e]"
        >
          <img
            src={start_chat}
            className="h-[40dvh] object-contain animated-element "
          />
          <GlobalButton
            buttonStyle={{
              borderRadius: "9px",
              padding: "9px 18px",
              backgroundColor: "var(--primary-color)",
            }}
            link="/dashboard/chatroom"
          >
            <div className="text-[15px] font-bold text-white ">Start Chat</div>
          </GlobalButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
