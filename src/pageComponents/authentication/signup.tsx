//react icons import
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { CiImageOff } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";

import { useState, useEffect } from "react";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import Layout from "../global/Layout";

//antd imports
import { Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

//styled Components
import { StyledInput } from "../../styledComponents/styledInput";

//firebase auth imports
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//firebase storage imports
import { image_db } from "../../config/firebase";
import {
  getDownloadURL,
  list,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

//react notifications
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  //react states...
  const [spin_loader, set_spin_loader] = useState(false);
  const [img, setImg] = useState<any>();
  const [imgUrl, setImgUrl] = useState<any>([]);

  //method of clearing antd form data
  const [form] = Form.useForm();

  //database reference
  const userCollectionRef = collection(db, "users");

  const inputField = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your Email",
      icons: <AiOutlineMail />,
      ref: "email",
    },
    {
      label: "Username",
      type: "text",
      placeholder: "Enter Username",
      icons: <AiOutlineUser />,
      ref: "username",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      icons: <RiLockPasswordLine />,
      ref: "password",
    },
  ];
  const signUp = async (values: any) => {
    try {
      const user_info = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (user_info) {
        toast.success("Registered Successfully", {
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

      form.resetFields();

      const user = user_info.user;

      await updateProfile(user, {
        displayName: values.username,
        photoURL: imgUrl,
      });

      localStorage.setItem("auth-token", user_info.user.refreshToken);

      await addDoc(userCollectionRef, {
        email: values.email,
        username: values.username,
        createdAt: serverTimestamp(),
        profile: imgUrl,
        user_id: auth.currentUser?.uid,
      });

      window.location.href = "/dashboard";
    } catch (e) {
      console.log(e);

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
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //image upload

  const handleImageUpload = () => {
    if (img) {
      console.log(img);
      alert("Upload successfull");

      const imgRef = ref(image_db, `uploads/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          console.log(url);
          setImgUrl(url);
        });
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full gap-6 lg:pt-[180px] pt-36 component-padding">
        <div className="flex flex-col gap-6">
          <div className="text-[20px] lg:text-3xl font-semibold text-center">
            Sign Up
          </div>
          <Form
            onFinish={signUp}
            onFinishFailed={onFinishFailed}
            className="bg-[white] drop-shadow-md lg:p-12 p-8 lg:w-[60vh] w-[40vh]   flex flex-col gap-6 rounded-[8px]"
            form={form}
          >
            <div className="flex flex-col gap-2">
              {inputField.map((data, index) => {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <div>{data.label}</div>
                    <Form.Item name={data.ref}>
                      <StyledInput
                        type={data.type}
                        placeholder=""
                        addonBefore={data.icons}
                        className=""
                        size="large"
                      />
                    </Form.Item>
                  </div>
                );
              })}
            </div>
            <Upload
              showUploadList={false} // Hide the default Ant Design upload list
              onChange={handleImageUpload}
              beforeUpload={(file, fileList) => {
                console.log(file);
                setImg(file);

                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
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
                Sign Up
              </CustomAntdButton>
            </Form.Item>
          </Form>
          {/* <div>
            <input
              type="file"
              onChange={(e) => {
                setImg(e.target?.files[0]);
              }}
            />
            <button onClick={handleImageUpload}>Upload</button>
          </div> */}
        </div>
      </div>
      <ToastContainer className="z-50" />
    </Layout>
  );
};

export default Signup;
