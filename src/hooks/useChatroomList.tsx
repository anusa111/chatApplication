import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const useChatroomList = () => {
  const [chatroomlist, setChatroomList] = useState<any>();

  const chatroomCollectionRef = collection(db, "chatroom");

  useEffect(() => {
    getChatroomList();
  }, []);

  const getChatroomList = async () => {
    try {
      const data = await getDocs(chatroomCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatroomList(filteredData);
      console.log(chatroomlist);
    } catch (e) {
      console.log(e);
    }
  };

  return { chatroomlist };
};

export default useChatroomList;
