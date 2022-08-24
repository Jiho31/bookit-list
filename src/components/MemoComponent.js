import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemo, removeMemo, selectMemosEntities } from "redux/memos";
import styled from "styled-components";

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
        <>
          <h3>{memos[memoObj.id].content}</h3>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </StyledMemo>
  );
});

const StyledMemo = styled.li`
  width: 80%;
  border: 3px solid pink;
  padding: 20px;
  margin: 5px;
`;

export default Memo;
