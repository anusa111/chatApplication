import { RouteObject, Navigate } from "react-router-dom";
import DashboardIndex from "../pageComponents/dashboard/DashboardIndex";
import Chatroom from "../pageComponents/dashboard/chatroom/Chatroom";
import IndexHero from "../pageComponents/heroSection/indexHero";
import Layout from "../pageComponents/global/Layout";
import Chatroom_Message from "../pageComponents/dashboard/chatroom/Chatroom_Message";
import ChatroomLayout from "../pageComponents/dashboard/chatroom/ChatroomLayout";
import Login from "../pageComponents/authentication/login";
import PrivateMessageLayout from "../pageComponents/dashboard/privateMessage/PrivateMessageLayout";
import PrivateMessage from "../pageComponents/dashboard/privateMessage/privateMessage";
import Signup from "../pageComponents/authentication/signup";
import ProfileLayout from "../pageComponents/dashboard/profile/ProfileLayout";
const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <IndexHero />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="chatroom" />,
  },

  {
    path: "/dashboard",
    element: <DashboardIndex />,
    children: [
      {
        path: "chatroom",
        element: <ChatroomLayout />,
        children: [
          {
            path: ":room_name/:room_id",
            element: <Chatroom_Message />,
          },
        ],
      },
      {
        path: "startchat",
        element: <PrivateMessageLayout />,
        children: [
          {
            path: ":user_name/:user_id",
            element: <PrivateMessage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfileLayout />,
      },
    ],
  },
];

export default routes;
