import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import { auth, db } from "../../config/firebase";

//react icons
import { IoSend } from "react-icons/io5";

//antd imports
import { Form, Input } from "antd";

//react notifications
import { toast } from "react-toastify";

const Message = () => {
  const [spin_loader, set_spin_loader] = useState(false);

  const msgCollectionRef = collection(db, "message");

  const userCollectionRef = collection(db, "users");

  const { room_name } = useParams();

  const [messageList, setMessageList] = useState<any>([]);

  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);

        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserList(filteredData);
        console.log(filteredData);
      } catch (e) {
        console.log(e);
      }
    };

    getUserList();
  }, []);

  useEffect(() => {
    const queryMessages = query(
      msgCollectionRef,
      where("chatroom", "==", room_name),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messageCollection = [];
      snapshot.forEach((doc) => {
        console.log(doc.data());
        messageCollection.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      console.log(messageCollection);
      setMessageList(messageCollection);
    });
    return () => unsubscribe();
  }, []);

  const createMessage = async (values: any) => {
    console.log(values);
    try {
      console.log(values);

      if (values.message) {
        await addDoc(msgCollectionRef, {
          message: values.message,
          chatroom: room_name,
          createdAt: serverTimestamp(),
          user: auth.currentUser?.displayName,
        });

        form.resetFields();
      } else {
        toast.error("Please provide your message", {
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

  //method of clearing antd form data
  const [form] = Form.useForm();

  return (
    <div className=" relative ">
      <div className="fixed top-0 border-b-[1px] z-50 dark:border-[#2E373F] py-6 w-full dark:bg-[#262E35] bg-white text-black  dark:text-white flex items-center   px-6">
        {room_name}
      </div>
      <div className="my-[4rem] px-20 py-10 h-[100vh]">
        {messageList.map((data: any, index: any) => {
          return (
            <div key={index} className=" relative">
              <div
                className={`${
                  data.user === auth.currentUser?.displayName
                    ? "right-[-45px] top-12"
                    : "left-[-45px] top-12"
                } absolute`}
              >
                {userList.map((userlist: any, index: any) => {
                  if (data.user == userlist.username) {
                    return (
                      <div key={index}>
                        <img
                          src={userlist.profile}
                          alt="loading"
                          onError={(e) => {
                            console.error("Error loading image:", e);
                          }}
                          className="  h-[40px] w-[40px] object-cover  rounded-full"
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className="py-10">
                <div
                  className={`${
                    data.user === auth.currentUser?.displayName
                      ? "bg-[#7269EF]  right-0 text-white rounded-tr-[6px] rounded-br-[24px] rounded-tl-[20px] rounded-bl-[20px] drop-shadow-xl"
                      : "dark:bg-[#36404A] bg-[#D2DBEC] left-0 dark:text-white text-[#1e1e1e] rounded-tl-[6px] rounded-bl-[24px] rounded-tr-[20px] rounded-br-[20px] drop-shadow-md"
                  } w-fit   px-6 py-2 absolute`}
                >
                  <div className="break-all ... ">{data.message}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0  border-t-[1px] z-50 dark:border-[#2E373F]  flex items-center   w-full dark:bg-[#262E35] py-2 px-6 dark:text-white bg-white text-[#1e1e1e]">
        <Form
          onFinish={createMessage}
          className=" translate-y-3 flex gap-6"
          form={form}
        >
          <Form.Item name="message" className="">
            <Input
              type="text"
              placeholder=""
              className="dark:bg-[#36404A] bg-[#E6EBF5] dark:text-white  rounded-[4px]  focus:outline-none w-[140vh]"
              size="large"
            />
          </Form.Item>
          <div className="">
            <Form.Item>
              <CustomAntdButton
                buttonStyle={{
                  backgroundColor: "#7269EF",
                  color: "white",
                  borderRadius: "4px",
                  padding: "16px 16px",
                  height: "40px",
                }}
                loading={spin_loader}
                onClick={() => {
                  set_spin_loader(true);

                  setTimeout(() => {
                    set_spin_loader(false);
                  }, 1000);
                }}
              >
                <IoSend size={20} />
              </CustomAntdButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Message;
