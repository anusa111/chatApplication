import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";

//firebase imports..
import { onAuthStateChanged } from "firebase/auth";
import {
  DocumentReference,
  addDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

//react notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react icons
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

//antd
import { Form, Input, Modal } from "antd";

const Chatroom = () => {
  const [spin_loader, set_spin_loader] = useState(false);
  const [username, set_username] = useState<any>();
  const [chatroomList, setChatroomList] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    getChatroomList();
  }, []);

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

  const createChatRoom = async (values: any) => {
    setIsModalOpen(true);
    console.log("Hello");
    getChatroomList();
    try {
      if (values.room_name) {
        const docRef = await addDoc(chatroomCollectionRef, {
          creator: username,
          room_name: values.room_name,
          creator_id: auth.currentUser?.uid,
        });
        await updateDoc(docRef, {
          room_id: docRef.id,
        });
        toast.success("🦄Chatroom Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        form.resetFields();
        setIsModalOpen(false);
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //method of clearing antd form data
  const [form] = Form.useForm();
  return (
    <div className="relative h-full">
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
                  )}/${data.id}`}
                >
                  {data.room_name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={showModal}
        className="absolute left-[10%] px-6 py-2 right-[10%] hover:cursor-pointer rounded-md drop-shadow-md flex items-center justify-center bottom-0 dark:bg-[#7269EF] dark:text-white bg-[white] text-[#7269EF]"
      >
        Create Chatroom
      </div>
      <Modal
        title="Create Chatroom"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          onFinish={createChatRoom}
          className="  mt-8   flex flex-col gap-2 rounded-[8px] "
          form={form}
        >
          <Form.Item name="room_name">
            <Input
              type="text"
              placeholder="Enter Room Name "
              className=""
              size="large"
            />
          </Form.Item>
          <Form.Item>
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
              Create
            </CustomAntdButton>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer className="z-50" />
    </div>
  );
};

export default Chatroom;
