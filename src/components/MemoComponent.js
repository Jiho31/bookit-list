import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemo, removeMemo, selectMemosEntities } from "redux/memos";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import Button from "./Button";

const Memo = React.memo(function Memo({ memoObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  // const [newMemo, setNewMemo] = useState(memoObj.content);
  const memos = useSelector(selectMemosEntities);
  const newMemoInput = useRef();
  newMemoInput.current = memoObj.content;

  const dispatch = useDispatch();

  const memoDocRef = doc(dbService, "memo", `${memoObj.id}`);

  const onDeleteClick = async () => {
    await deleteDoc(memoDocRef);

    dispatch(removeMemo(memoObj.id));
  };
  const onEditClick = () => {
    toggleEditing();
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newContent = newMemoInput.current.value;
    console.log(newContent);

    if (newContent === "") {
      // 에러 처리
      // 빈 메모를 입력할 수 없습니다 메시지 띄우기
      return;
    }
    toggleEditing();

    // firebase에 저장된 데이터 업데이트
    await updateDoc(memoDocRef, {
      content: newContent,
    });

    // 리덕스 데이터 갱신
    dispatch(updateMemo({ ...memos[memoObj.id], content: newContent }));
  };

  return (
    <StyledMemo>
      {isEditing ? (
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            ref={newMemoInput}
            defaultValue={memoObj.content}
          ></input>
          <input type="submit" value="Save Memo"></input>
        </form>
      ) : (
        <MemoWrapper>
          <p>{memos[memoObj.id].content}</p>
          <EditButton
            backgroundColor="#fff"
            width="32px"
            height="32px"
            padding="0"
          >
            <Icon
              title="메모 편집"
              icon="carbon:overflow-menu-horizontal"
              color="#6D8FAD"
              width="26px"
              height="26px"
            />
          </EditButton>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </MemoWrapper>
      )}
    </StyledMemo>
  );
});

const StyledMemo = styled.li`
  width: 80%;
  /* border: 3px solid pink; */
  background-color: #fff;
  border-radius: 0 20px 0 20px;
  padding: 20px;
  margin: 5px;
`;

const MemoWrapper = styled.div`
  position: relative;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export default Memo;
