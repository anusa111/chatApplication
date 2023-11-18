import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { CiSearch } from "react-icons/ci";

const PrivateUser = () => {
  const userCollectionRef = collection(db, "users");

  const [userList, set_user_List] = useState<any>([]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.filter(
          (doc) => doc.data().email !== auth.currentUser?.email
        );

        const filteredDataWithIds = filteredData.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        set_user_List(filteredDataWithIds);
        console.log(filteredDataWithIds);
      } catch (e) {
        console.log(e);
      }
    };

    getUserList();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-[25px] font-semibold">Start Chat</div>
      <div className="flex items-center gap-2 dark:bg-[#36404A] bg-[#E6EBF5] px-4 py-2 dark:text-[#8DB0CF] text-[#1e1e1e]">
        <div>
          <CiSearch size={20} />
        </div>
        <input
          className="w-full outline-none dark:bg-[#36404A] bg-[#E6EBF5]"
          placeholder="Search Users..."
        />
      </div>
      <div className="flex flex-col gap-4">
        {userList.map((data, index) => {
          return (
            <div key={index}>
              <Link
                to={`/dashboard/startchat/${data.username.replace(
                  /\s+/g,
                  ""
                )}/${data.user_id}`}
              >
                {data.username}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivateUser;
