import { Form, Input } from "antd";
import { onAuthStateChanged } from "firebase/auth";
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
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CustomAntdButton from "../../../antdComponents/CustomAntdButton";
import { auth, db } from "../../../config/firebase";

import avatar from "../../../assets/avatar.png";

const PrivateMessage = () => {
  const { user_name, user_id } = useParams();
  const [spin_loader, set_spin_loader] = useState(false);

  const userCollectionRef = collection(db, "users");

  const privateMsgCollectionRef = collection(db, "private_message");
  const [messageList, setMessageList] = useState<any>([]);
  const [mymessageList, setMyMessageList] = useState<any>([]);
  const [username, set_username] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set_username(auth.currentUser?.displayName);
      } else {
        window.location.href = "/";
      }
    });
  }, []);

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
    console.log(auth.currentUser?.displayName);
    console.log(username);

    if (auth.currentUser?.displayName) {
      const queryMessages = query(
        privateMsgCollectionRef,
        where("destination", "==", user_id),
        where("source", "==", auth.currentUser?.uid),
        orderBy("createdAt")
      );
      onSnapshot(queryMessages, (snapshot) => {
        console.log("New Messages");
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
    }
  }, [user_id, auth.currentUser?.uid]);

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const queryMessages = query(
        privateMsgCollectionRef,
        where("source", "==", user_id),
        where("destination", "==", auth.currentUser?.uid),
        orderBy("createdAt")
      );
      onSnapshot(queryMessages, (snapshot) => {
        console.log("New Messages");
        console.log(queryMessages);
        const messageCollection: any = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          messageCollection.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        console.log(messageCollection);
        setMyMessageList(messageCollection);
      });
    }
  }, [user_id, auth.currentUser?.uid]);

  const createMessage = async (values: any) => {
    try {
      if (values.message) {
        await addDoc(privateMsgCollectionRef, {
          message: values.message,

          destination: user_id,

          createdAt: serverTimestamp(),
          source: auth.currentUser?.uid,
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

  const dataArray = messageList.concat(mymessageList);

  const combinedMessages = dataArray.slice().sort((a: any, b: any) => {
    if (a.createdAt && b.createdAt) {
      const timestampA =
        a.createdAt?.seconds * 1000 + a.createdAt.nanoseconds / 1e6;
      const timestampB =
        b.createdAt?.seconds * 1000 + b.createdAt.nanoseconds / 1e6;

      return timestampA - timestampB;
    }
  });

  //method of clearing antd form data
  const [form] = Form.useForm();

  return (
    // <div>
    //   PrivateMessage
    //   <div>{user_name}</div>
    //   <form
    //     onSubmit={createMessage}
    //     className="flex flex-col gap-4 items-center justify-center"
    //   >
    //     <input type="text" placeholder="Enter msg here" ref={message} />
    //     <CustomAntdButton
    //       buttonStyle={{
    //         backgroundColor: "var(--primary-color)",
    //         color: "white",
    //         borderRadius: "9px",
    //         padding: "9px 18px",
    //         width: "100%",
    //         height: "6vh",
    //       }}
    //       loading={spin_loader}
    //       onClick={() => {
    //         set_spin_loader(true);

    //         setTimeout(() => {
    //           set_spin_loader(false);
    //         }, 1000);
    //       }}
    //     >
    //       Send
    //     </CustomAntdButton>
    //   </form>
    //   <div className="">
    //     {mymessageList.map((data: any, index: any) => {
    //       return (
    //         <div key={index} className="flex  gap-2">
    //           <div>{data.source}:</div>
    //           <div>{data.message}</div>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className="">
    //     {messageList.map((data: any, index: any) => {
    //       return (
    //         <div key={index} className="flex  gap-2">
    //           <div>{data.source}:</div>
    //           <div>{data.message}</div>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <div className="">
    //     {combinedMessages.map((data, index) => (
    //       <div key={index} className="flex gap-2">
    //         <div>{data.source}:</div>
    //         <div>{data.message}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className=" relative">
      <div className="fixed top-0 border-b-[1px] z-50 dark:border-[#2E373F] py-6 w-full dark:bg-[#262E35] bg-white text-black  dark:text-white flex items-center   px-6">
        {user_name}
      </div>
      <div className="my-[4rem] px-20 py-10">
        {/* {combinedMessages.map((data, index) => (
          <div
            key={index}
            className={`${
              data.source === auth.currentUser?.displayName
                ? "bg-[#7269EF]  flex-col ml-[60%] text-white"
                : "dark:bg-[#36404A] bg-[#d2dbec]"
            } w-fit flex   px-6 py-2 rounded-[8px] relative`}
          >
            <div>{data.source}:</div>
            <div className="break-all ...">{data.message}</div>
          </div>
        ))} */}
        {combinedMessages.map((data: any, index: any) => {
          return (
            <div key={index} className=" relative">
              <div
                className={`${
                  data.source === auth.currentUser?.uid
                    ? "right-[-45px] top-12"
                    : "left-[-45px] top-12"
                } absolute`}
              >
                {userList.map((userlist: any, index: any) => {
                  if (data.source == userlist.user_id) {
                    return (
                      <div key={index}>
                        {userlist.profile ? (
                          <img
                            src={userlist.profile}
                            alt="loading"
                            onError={(e) => {
                              console.error("Error loading image:", e);
                            }}
                            className="  h-[40px] w-[40px] object-cover  rounded-full"
                          />
                        ) : (
                          <img
                            src={avatar}
                            alt="loading"
                            onError={(e) => {
                              console.error("Error loading image:", e);
                            }}
                            className="  h-[40px] w-[40px] object-cover  rounded-full"
                          />
                        )}
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
                    data.source === auth.currentUser?.uid
                      ? "bg-[#7269EF]   right-0  text-white  rounded-tr-[6px] rounded-br-[24px] rounded-tl-[20px] rounded-bl-[20px] drop-shadow-xl"
                      : "dark:bg-[#36404A] bg-[#D2DBEC] left-0 dark:text-white text-[#1e1e1e] rounded-tl-[6px] rounded-bl-[24px] rounded-tr-[20px] rounded-br-[20px] drop-shadow-md"
                  } w-fit flex   px-6 py-2 rounded-[8px] absolute`}
                >
                  <div className="break-all ...">{data.message}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0  border-t-[1px] z-50 dark:border-[#2E373F]  flex items-center   w-full dark:bg-[#262E35] py-2 px-6 dark:text-white bg-white text-[#1e1e1e]">
        <Form
          onFinish={createMessage}
          className="translate-y-3 flex gap-6"
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
      <ToastContainer className="z-50" />
    </div>
  );
};

export default PrivateMessage;
