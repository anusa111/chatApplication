import { Link } from "react-router-dom";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import Chat from "./Chat";
import { useRef, useState, useEffect } from "react";

//firebase imports..
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

//react notifications
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

//react icons
import { CiSearch } from "react-icons/ci";

const Chatroom = () => {
  const room_name = useRef(null);
  const [spin_loader, set_spin_loader] = useState(false);
  const [username, set_username] = useState<any>();
  const [chatroomList, setChatroomList] = useState<any>();

  const chatroomCollectionRef = collection(db, "chatroom");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set_username(auth.currentUser?.displayName);
      } else {
        window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    const getChatroomList = async () => {
      try {
        const data = await getDocs(chatroomCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChatroomList(filteredData);
      } catch (e) {
        console.log(e);
      }
    };
    getChatroomList();
  }, []);

  const createChatRoom = async (e: any) => {
    console.log("Hello");
    console.log(room_name.current?.value);

    try {
      e.preventDefault();
      if (room_name.current?.value) {
        await addDoc(chatroomCollectionRef, {
          creator: username,
          room_name: room_name.current?.value,
        });
        alert("Chatroom added successfully");
      } else {
        toast.error("🦄Something went wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <form
        onSubmit={createChatRoom}
        className="flex flex-col gap-4 items-center justify-center"
      >
        <input type="text" placeholder="Enter room name here" ref={room_name} />
        <CustomAntdButton
          buttonStyle={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            borderRadius: "9px",
            padding: "9px 18px",
            width: "100%",
            height: "6vh",
          }}
          loading={spin_loader}
          onClick={() => {
            set_spin_loader(true);

            setTimeout(() => {
              set_spin_loader(false);
            }, 1000);
          }}
        >
          Create ChatRoom
        </CustomAntdButton>
      </form> */}
      <div className="flex flex-col gap-6">
        <div className="text-[25px] font-semibold">Chatroom</div>
        <div className="flex items-center gap-2 dark:bg-[#36404A] bg-[#E6EBF5] px-4 py-2 dark:text-[#8DB0CF] text-[#1e1e1e]">
          <div>
            <CiSearch size={20} />
          </div>
          <input
            className="w-full outline-none dark:bg-[#36404A] bg-[#E6EBF5]"
            placeholder="Search Chatrooms..."
          />
        </div>
        <div className="flex flex-col gap-2">
          {chatroomList?.map((data: any, index: any) => {
            return (
              <div key={index}>
                {/* <div>Admin:{data.creator}</div> */}
                <Link
                  to={`/dashboard/chatroom/${data.room_name.replace(
                    /\s+/g,
                    ""
                  )}`}
                >
                  {data.room_name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chatroom;
