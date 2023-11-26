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
import CustomAntdButton from "../../../antdComponents/CustomAntdButton";
import { auth, db } from "../../../config/firebase";

//react icons
import { IoSend } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

//antd imports
import { Form, Input } from "antd";

//react notifications
import { toast } from "react-toastify";

import avatar from "../../../assets/avatar.png";

//group videocall
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Message = () => {
  const { room_name, room_id } = useParams();

  const [spin_loader, set_spin_loader] = useState(false);

  const [messageList, setMessageList] = useState<any>([]);

  const [userList, setUserList] = useState<any>([]);

  const [chatroomList, setChatroomList] = useState<any>([]);

  const [chatroomMember, setChatroomMember] = useState<any>();

  const [start_call, set_start_call] = useState<any>(false);

  //firebase/database
  const msgCollectionRef = collection(db, "chatroomMessage");

  const userCollectionRef = collection(db, "users");

  const chatroomCollectionRef = collection(db, "chatroom");

  const chatroomMemberRef = collection(db, "chatroomMember");

  //get chatroomlist

  useEffect(() => {
    const getChatroomList = async () => {
      try {
        const chatroomData = await getDocs(chatroomCollectionRef);
        const filteredChatroomData = chatroomData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChatroomList(filteredChatroomData);
        console.log(filteredChatroomData);
      } catch (e) {
        console.log(e);
      }
    };

    getChatroomList();
  }, [room_name]);

  //get userlist

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

  //get chatroom memmber

  useEffect(() => {
    getChatroomMember();
  }, []);

  const getChatroomMember = async () => {
    try {
      const data = await getDocs(chatroomMemberRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setChatroomMember(filteredData);
      console.log(chatroomMember);
    } catch (e) {
      console.log(e);
    }
  };

  //getting room messages

  useEffect(() => {
    const queryMessages = query(
      msgCollectionRef,
      where("chatroom_id", "==", room_id),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const messageCollection: any = [];
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
  }, [room_id]);

  //creating chatroom message

  const createMessage = async (values: any) => {
    console.log(values);
    try {
      console.log(values);

      if (values.message) {
        await addDoc(msgCollectionRef, {
          message: values.message,
          chatroom: room_name,
          chatroom_id: room_id,
          createdAt: serverTimestamp(),
          user: auth.currentUser?.displayName,
          user_id: auth.currentUser?.uid,
        });

        form.resetFields();

        await addDoc(chatroomMemberRef, {
          chatroom_id: room_id,
          chatroom_name: room_name,
          member_id: auth.currentUser?.uid,
          member_name: auth.currentUser?.displayName,
        });
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

  //video calls
  // const myMetting = async (element) => {
  //   console.log(room_name);
  //   const appID = 751325053;
  //   const serverSecret = "f0d7ebdc764a40ebbe5d10e2c54df90e";
  //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //     appID,
  //     serverSecret,
  //     room_id?.toString(),
  //     Date.now().toString(),
  //     auth.currentUser?.displayName
  //   );
  //   const zegocloud = ZegoUIKitPrebuilt.create(kitToken);
  //   zegocloud.joinRoom({
  //     container: element,
  //     scenario: {
  //       mode: ZegoUIKitPrebuilt.GroupCalls,
  //     },
  //     showScreenSharingButton: true,
  //   });
  // };

  //method of clearing antd form data
  const [form] = Form.useForm();

  return (
    <div className=" relative ">
      <div className="fixed top-0   border-b-[1px] z-40 dark:border-[#2E373F] py-6 w-full dark:bg-[#262E35] bg-white text-black  dark:text-white      px-6">
        <div className="flex items-center  relative">
          <div>{room_name}</div>

          <div className="absolute top-0 right-[30%]">
            {chatroomList.map((data: any, index: any) => {
              return (
                <div key={index}>
                  <div>
                    {data.room_id === room_id && (
                      <div className="flex items-center gap-2">
                        <div className="text-[15px] font-semibold">
                          Admin :{"   "}{" "}
                        </div>
                        <div>
                          {" "}
                          {data.creator.charAt(0).toUpperCase() +
                            data.creator.slice(1)}
                        </div>
                        <div
                          onClick={() => {
                            set_start_call(!start_call);
                          }}
                        >
                          <FaPhoneAlt
                            style={{
                              color: "var(--primary-color)",
                            }}
                            size={20}
                            className="hover:cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="my-[4rem] px-20 py-10 h-[100vh]">
        {messageList.map((data: any, index: any) => {
          return (
            <div key={index} className=" relative">
              <div
                className={`${
                  data.user_id === auth.currentUser?.uid
                    ? "right-[-45px] top-12"
                    : "left-[-45px] top-12"
                } absolute`}
              >
                {userList.map((userlist: any, index: any) => {
                  if (data.user_id == userlist.user_id) {
                    return (
                      <div key={index}>
                        <img
                          src={userlist.profile ? userList.profile : avatar}
                          alt="loading"
                          onError={(e) => {
                            console.error("Error loading image:", e);
                          }}
                          className="  h-[40px] w-[40px] object-cover  rounded-full"
                        />
                        {chatroomList.map((data: any, index: any) => {
                          if (
                            data.creator_id === userlist.user_id &&
                            data.room_id === room_id
                          ) {
                            return (
                              <div key={index}>
                                <div className="text-[#8992B4] text-[12px]">
                                  Admin
                                </div>
                              </div>
                            );
                          }
                        })}
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
                    data.user_id === auth.currentUser?.uid
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
      {/* {start_call && <div ref={myMetting} />} */}

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
