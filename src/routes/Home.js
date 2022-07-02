import Memo from "components/Memo";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

function Home({ userInfo }) {
  const [memoInput, setMemoInput] = useState("");
  const [memos, setMemos] = useState([]);

  // const getMemos = async () => {
  //   const querySnapshot = await getDocs(collection(dbService, "memo"));
  //   querySnapshot.forEach((doc) => {
  //     const memoObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setMemos((prev) => [memoObj, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getMemos();
    const q = query(
      collection(dbService, "memo"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const memoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemos(memoArr);
    });
  }, []);

  const onChangeHandler = (e) => {
    const {
      target: { value },
    } = e;
    setMemoInput(value);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "memo"), {
        content: memoInput,
        createdAt: Date.now(),
        creatorId: userInfo.uid,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document:", err);
    }
    setMemoInput("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          onChange={onChangeHandler}
          value={memoInput}
          placeholder="Add memo"
        ></input>
        <input type="submit" value="Add"></input>
      </form>
      <div>
        <h2>Memos</h2>
        <ul>
          {memos.map((memo) => (
            <Memo
              key={memo.id}
              memoObj={memo}
              isOwner={memo.creatorId === userInfo.uid}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
