import React, { useCallback, useEffect, useRef } from "react";
import Memo from "components/MemoComponent";
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

function Memos({ userInfo }) {
  const memoInput = useRef();
  const memos = useSelector(selectMemosEntities);
  const memosLength = useSelector(selectMemosLength);
  const dispatch = useDispatch();

  // firebase 데이터베이스에 있는 메모 데이터 읽어와서 리덕스 스토어에 저장
  useEffect(() => {
    const q = query(
      collection(dbService, "memo"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const memoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      memoArr.forEach((data) => dispatch(createMemo(data)));
    });
  });

  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (memoInput.current.value === "") return;

      try {
        const newMemo = {
          content: memoInput.current.value,
          createdAt: new Date().toISOString().slice(0, 10),
          creatorId: userInfo.uid,
        };

        const docRef = await addDoc(collection(dbService, "memo"), newMemo);

        // console.log("Document written with ID: ", docRef.id);
        dispatch(createMemo({ id: docRef.id, ...newMemo }));
      } catch (err) {
        console.error("Error adding document to database:", err);
      }
      memoInput.current.value = "";
    },
    [dispatch, userInfo.uid]
  );

  return (
    <div>
      <h2>Memos</h2>
      <MemoForm onSubmit={onSubmitHandler}>
        <input type="text" ref={memoInput} placeholder="Add memo"></input>
        <SubmitButton type="submit" value="Add"></SubmitButton>
      </MemoForm>
      <div>
        <MemoListContainer>
          {memosLength > 0
            ? Object.keys(memos).map((key) => {
                console.log(key);
                return (
                  <Memo
                    key={memos[key].id}
                    memoObj={memos[key]}
                    isOwner={memos[key].creatorId === userInfo.uid}
                  />
                );
              })
            : ""}
        </MemoListContainer>
      </div>
    </div>
  );
}

const MemoForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  input:first-child {
    width: 500px;
    height: 40px;
  }
`;

const SubmitButton = styled.input`
  width: 60px;
  height: 35px;
`;

const MemoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 40px;
  margin: 100px;
`;

export default React.memo(Memos);
