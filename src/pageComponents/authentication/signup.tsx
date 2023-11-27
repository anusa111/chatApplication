//react icons import
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import { useState, useEffect } from "react";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import Layout from "../global/Layout";

//antd imports
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";

//styled Components
import { StyledInput } from "../../styledComponents/styledInput";

//firebase auth imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

//firebase storage imports
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { image_db } from "../../config/firebase";

//react notifications
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [img, setImg] = useState<any>();
  const [imgUrl, setImgUrl] = useState<any>();
  const [img_name, set_img_name] = useState<any>();
  const [spin_loader, set_spin_loader] = useState(false);

  let imageURL: any = "";

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
      msg: "Please provide your email",
    },
    {
      label: "Username",
      type: "text",
      placeholder: "Enter Username",
      icons: <AiOutlineUser />,
      ref: "username",
      msg: "Please provide your username",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      icons: <RiLockPasswordLine />,
      ref: "password",
      msg: "Please provide your password",
    },
  ];

  useEffect(() => {
    handleImageUpload();
  }, [img]);
  const handleSubmit = async (values: any) => {
    console.log(values);

    // Wait for the image upload to complete
    set_spin_loader(true);
    await handleImageUpload();
    console.log("state", imgUrl);
    console.log("variable", imageURL);

    const postData = {
      ...values,
      profile: imageURL,
    };
    console.log(postData);
    try {
      if (values.password.length < 5) {
        toast.error("Password length must be greater than 5", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return null;
      }

      const user_info = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = user_info.user;
      localStorage.setItem("auth-token", user_info.user.refreshToken);

      const response = await addDoc(userCollectionRef, {
        email: postData.email,
        username: postData.username,
        createdAt: serverTimestamp(),
        profile: imageURL,
        user_id: auth.currentUser?.uid,
      });
      console.log(response);

      try {
        await updateProfile(user, {
          displayName: values.username,
          photoURL: imageURL,
        });
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
        window.location.href = "/dashboard/profile";
        set_spin_loader(false);
      } catch (error) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", {
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

  const handleImageUpload = () => {
    if (img) {
      const imgRef = ref(image_db, `uploads/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl(url);
          imageURL = url;
          console.log(url);
        });
      });
    }
  };
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center h-full gap-6 lg:pt-[180px] pt-36 component-padding">
          <div className="flex flex-col gap-6">
            <div className="text-[20px] lg:text-3xl font-semibold text-center">
              Sign Up
            </div>
            <Form
              onFinish={handleSubmit}
              className="bg-[white] drop-shadow-md lg:p-12 p-8 lg:w-[60vh] w-[40vh]   flex flex-col gap-6 rounded-[8px]"
              form={form}
            >
              <div className="flex flex-col gap-2">
                {inputField.map((data, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div>{data.label}</div>
                      <Form.Item
                        name={data.ref}
                        rules={[
                          {
                            required: true,
                            message: `${data.msg}`,
                          },
                        ]}
                      >
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
                // onChange={handleImageUpload}
                beforeUpload={(file, fileList) => {
                  set_img_name(file.name);
                  console.log(fileList);
                  setImg(file);

                  return false;
                }}
                className="flex  items-center gap-4"
              >
                <Button icon={<UploadOutlined />}>
                  Select your profile picture
                </Button>
                <div>{img_name}</div>
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
                  onClick={() => {}}
                >
                  Sign Up
                </CustomAntdButton>
              </Form.Item>
            </Form>
          </div>
        </div>
        <ToastContainer className="z-50" />
      </Layout>
    </>
  );
};

export default Signup;
