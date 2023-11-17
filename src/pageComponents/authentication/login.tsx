//react icons import
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import { useState } from "react";
import CustomAntdButton from "../../antdComponents/CustomAntdButton";
import Layout from "../global/Layout";

//antd imports
import { Form } from "antd";

//styled Components
import { StyledInput } from "../../styledComponents/styledInput";

//firebase auth imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

//react notifications
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  //react states...
  const [spin_loader, set_spin_loader] = useState(false);

  //method of clearing antd form data
  const [form] = Form.useForm();

  const inputField = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your Email",
      icons: <AiOutlineMail />,
      ref: "email",
    },

    {
      label: "Password",
      type: "password",
      placeholder: "Enter Password",
      icons: <RiLockPasswordLine />,
      ref: "password",
    },
  ];
  const login = async (values: any) => {
    try {
      const user_info = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user_info);

      toast.success("🦄Login Successfull", {
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
      localStorage.setItem("auth-token", user_info.user.refreshToken);
      window.location.href = "/dashboard";
    } catch (e) {
      console.log(e);
      toast.error("Login Failed", {
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
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen gap-6 lg:pt-[180px] pt-36 component-padding">
        <div className="flex flex-col gap-6">
          <div className="text-[20px] lg:text-3xl font-semibold text-center">
            Login
          </div>
          <Form
            onFinish={login}
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
                Login
              </CustomAntdButton>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;
