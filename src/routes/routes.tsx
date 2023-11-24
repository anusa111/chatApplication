import { Navigate, RouteObject } from "react-router-dom";
import Login from "../pageComponents/authentication/login";
import Signup from "../pageComponents/authentication/signup";
import DashboardIndex from "../pageComponents/dashboard/DashboardIndex";
import ChatroomLayout from "../pageComponents/dashboard/chatroom/ChatroomLayout";
import Chatroom_Message from "../pageComponents/dashboard/chatroom/Chatroom_Message";
import PrivateMessageLayout from "../pageComponents/dashboard/privateMessage/PrivateMessageLayout";
import PrivateMessage from "../pageComponents/dashboard/privateMessage/privateMessage";
import ProfileLayout from "../pageComponents/dashboard/profile/ProfileLayout";
import Layout from "../pageComponents/global/Layout";
import IndexHero from "../pageComponents/heroSection/indexHero";
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
