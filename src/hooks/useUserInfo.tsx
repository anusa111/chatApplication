import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const useUserInfo = () => {
  const userCollectionRef = collection(db, "users");

  const [userList, setUserList] = useState<any>();

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        // const filteredData = data.docs.filter(
        //   (doc) => doc.data().email !== auth.currentUser?.email
        // );

        const filteredDataWithIds = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserList(filteredDataWithIds);
      } catch (e) {
        console.log(e);
      }
    };

    getUserList();
  }, []);

  return { userList };
};

export default useUserInfo;
