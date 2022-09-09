import React, { useCallback, useEffect, useRef } from "react";
import Memo from "components/MemoComponent";
import Button from "components/Button";
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
      // console.log("clicked");

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
      <MemoForm onSubmit={onSubmitHandler}>
        <input type="text" ref={memoInput} placeholder="새 메모를 입력하세요" />
        <SubmitButton type="submit" aria-label="메모 등록하기">
          메모 등록
        </SubmitButton>
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
  justify-content: center;
  flex-direction: row;

  input:first-child {
    padding: 10px;
    width: 600px;
    height: 70px;
    border: 1.5px solid #e0e0e0;
    border-radius: 20px;
    font-size: 16px;
  }
`;

const SubmitButton = styled(Button)`
  width: 75px;
  height: 45px;
  margin-left: 10px;
  font-weight: 500;
  font-size: 14px; ;
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
