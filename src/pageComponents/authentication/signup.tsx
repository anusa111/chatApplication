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
  //react states...
  const [spin_loader, set_spin_loader] = useState(false);
  const [img, setImg] = useState<any>();
  const [imgUrl, setImgUrl] = useState<any>();
  const [img_name, set_img_name] = useState<any>();

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
    if (
      imgUrl?.length > 0 &&
      values.email &&
      values.password &&
      values.username
    ) {
      try {
        const user_info = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        form.resetFields();

        const user = user_info.user;

        localStorage.setItem("auth-token", user_info.user.refreshToken);

        const addUserData = async () => {
          try {
            await addDoc(userCollectionRef, {
              email: values.email,
              username: values.username,
              createdAt: serverTimestamp(),
              profile: imgUrl,
              user_id: auth.currentUser?.uid,
            });
          } catch (e) {
            alert(e);
          }
        };

        if (imgUrl?.length > 0) {
          console.log("starting to add user data");
          addUserData();
        }

        const updateProfileitems = async () => {
          try {
            await updateProfile(user, {
              displayName: values.username,
              photoURL: imgUrl,
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

            window.location.href = "/dashboard";
          } catch (error) {
            console.log(error);
          }
        };

        if (imgUrl?.length > 0) {
          updateProfileitems();
        }
      } catch (e) {
        console.log(e);

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
    } else {
      toast.error("Please fill up all the field", {
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

  useEffect(() => {
    const handleImageUpload = () => {
      if (img) {
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

    handleImageUpload();
  }, [img]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full gap-6 lg:pt-[180px] pt-36 component-padding">
        <div className="flex flex-col gap-6">
          <div className="text-[20px] lg:text-3xl font-semibold text-center">
            Sign Up
          </div>
          <Form
            onFinish={(values) => {
              setTimeout(() => {
                signUp(values);
              }, 3000); // 3000 milliseconds = 3 seconds
            }}
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
              // onChange={handleImageUpload}
              beforeUpload={(file, fileList) => {
                set_img_name(file.name);
                console.log(fileList);
                setImg(file);

                return false;
              }}
              className="flex  items-center gap-4"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
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
                onClick={() => {
                  set_spin_loader(true);
                  setTimeout(() => {
                    set_spin_loader(false);
                  }, 3000);
                }}
              >
                Sign Up
              </CustomAntdButton>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ToastContainer className="z-50" />
    </Layout>
  );
};

export default Signup;
