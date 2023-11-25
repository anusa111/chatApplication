import GlobalButton from "../global/globalButton";

//react icons...
import { BsArrowRight } from "react-icons/bs";

//react images...
import chatbot from "../../../public/index/chatbot.png";

const IndexHero = () => {
  return (
    <div className="lg:pt-[160px] pt-36 layout layout-padding  flex flex-col gap-20">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="lg:text-[40px] text-[25px] font-bold text-center">
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Text
          </span>{" "}
          your customers as easy <br></br> as you chat with{" "}
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            friends
          </span>{" "}
        </div>
        <div className="text-center lg:text-[16px] text-[14px] text-[#7e7d7d]">
          The app offers cost-effective communication, reducing expenses
          associated with <br></br> traditional forms of contact, such as
          international calls or postage.
        </div>
        <div>
          <GlobalButton
            buttonStyle={{
              color: "white",
              borderRadius: "9px",
              padding: "9px 18px",
              backgroundColor: "var(--primary-color)",
            }}
            link="/sign-up"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="text-[15px] font-bold">Sign up for free</div>
              <div>
                <BsArrowRight />
              </div>
            </div>
          </GlobalButton>
        </div>
      </div>
      <div className=" flex items-center justify-center ">
        <div className="h-[60vh] w-[70vh] object-contain">
          <img src={chatbot} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default IndexHero;
