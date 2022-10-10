import React, { useCallback, useEffect, useRef, useState } from "react";
import MemoComponent from "components/MemoComponent";
import MemoForm from "components/MemoForm";
import styled from "styled-components";
import { dbService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  createMemo,
  selectMemosLength,
  selectMemosEntities,
} from "../redux/memos";
import { v4 as uuid } from "uuid";

function Memos({ userInfo }) {
  const memoInput = useRef();
  // const memos = useSelector(selectMemosEntities);
  // const memosLength = useSelector(selectMemosLength);
  // const dispatch = useDispatch();
  const [memos, setMemos] = useState({});

  useEffect(() => {
    if (localStorage.getItem("bookMemos")) {
      setMemos(JSON.parse(localStorage.getItem("bookMemos")));
    }
  }, []);

  // firebase 데이터베이스에 있는 메모 데이터 읽어와서 저장
  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, "memo"),
  //     orderBy("createdAt", "desc")
  //   );
  //   onSnapshot(q, (snapshot) => {
  //     const memoArr = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log(memoArr);

  //     memoArr.forEach((data) => {
  //       // 리덕스 스토어에 저장
  //       dispatch(createMemo(data));
  //     });

  //     // local storage에 저장
  //     localStorage.setItem("bookMemos", JSON.stringify(memoArr));
  //   });
  // });

  // const onSubmitHandler = useCallback(
  //   async (e) => {
  //     e.preventDefault();

  //     if (memoInput.current.value === "") return;

  //     try {
  //       const newMemo = {
  //         content: memoInput.current.value,
  //         createdAt: new Date().toISOString().slice(0, 10),
  //         creatorId: userInfo.uid,
  //       };

  //       const docRef = await addDoc(collection(dbService, "memo"), newMemo);

  //       // console.log("Document written with ID: ", docRef.id);
  //       dispatch(createMemo({ id: docRef.id, ...newMemo }));
  //     } catch (err) {
  //       console.error("Error adding document to database:", err);
  //     }
  //     memoInput.current.value = "";
  //   },
  //   [dispatch, userInfo.uid]
  // );

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (memoInput.current.value === "") return;

      const memoID = uuid();
      const newMemo = {
        id: memoID,
        content: memoInput.current.value,
        createdAt: new Date().toISOString().slice(0, 10),
        creatorId: userInfo.uid,
        bookId: null,
        bookshelfId: null,
      };

      // local storage에 새로운 메모 저장
      if (localStorage.getItem("bookMemos")) {
        const savedMemos = JSON.parse(localStorage.getItem("bookMemos"));

        localStorage.setItem(
          "bookMemos",
          JSON.stringify({
            ...savedMemos,
            memoID: newMemo,
          })
        );
      } else {
        const newStorage = {};
        newStorage[newMemo.id] = newMemo;
        localStorage.setItem("bookMemos", JSON.stringify(newStorage));
      }

      // memos 상태 값 업데이트
      setMemos((prev) => {
        return {
          ...prev,
          memoID: newMemo,
        };
      });

      memoInput.current.value = "";
    },
    [userInfo.uid]
  );

  return (
    <MemosWrapper>
      <MemoForm onSubmit={onSubmitHandler} ref={memoInput} />
      <MemoListContainer>
        {Object.keys(memos).length > 0
          ? Object.keys(memos).map((key) => {
              return (
                <MemoComponent
                  key={key}
                  memoObj={memos[key]}
                  isOwner={memos[key].creatorId === userInfo.uid}
                />
              );
            })
          : ""}
      </MemoListContainer>
    </MemosWrapper>
  );
}

const MemosWrapper = styled.div`
  padding: 30px 0;
`;

const MemoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 40px; */
  margin-top: 40px;
`;

export default React.memo(Memos);
