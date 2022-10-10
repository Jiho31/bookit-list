import { Icon } from "@iconify/react";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMemo, selectMemosEntities, updateMemo } from "redux/memos";
import styled from "styled-components";
import Button from "./Button";
import MemoForm from "./MemoForm";

const MemoComponent = React.memo(function Memo({
  memoObj,
  isOwner,
  memoWidth,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const memos = useSelector(selectMemosEntities);
  const newMemoInput = useRef();
  newMemoInput.current = memoObj.content;

  // const dispatch = useDispatch();
  // const memoDocRef = doc(dbService, "memo", `${memoObj.id}`);

  const onDeleteClick = async () => {
    // await deleteDoc(memoDocRef);

    // dispatch(removeMemo(memoObj.id));
    console.log(`delete this memo: ${memoObj.id}`);
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

    // // firebase에 저장된 데이터 업데이트
    // await updateDoc(memoDocRef, {
    //   content: newContent,
    // });

    // // 리덕스 데이터 갱신
    // dispatch(updateMemo({ ...memos[memoObj.id], content: newContent }));
  };

  return (
    <StyledMemo width={memoWidth}>
      {isEditing ? (
        <MemoForm
          onSubmit={onSubmitHandler}
          ref={newMemoInput}
          buttonVal="저장"
          defaultValue={memoObj.content}
        />
      ) : (
        <MemoWrapper>
          <div>{memoObj.content}</div>
          <EditButton
            backgroundColor="#fff"
            width="32px"
            height="32px"
            padding="0"
          >
            <Icon
              title="메모 편집"
              icon="carbon:overflow-menu-horizontal"
              color="#36506C"
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
  width: ${(props) => (props.width ? props.width : "80%")};
  /* width: 80%; */
  max-width: 860px;
  box-shadow: 0px 3px 3px 0px #959da533;
  background-color: #fff;
  color: #000;
  border-radius: 0 20px 0 20px;
  padding: 20px;
  margin: 10px;
`;

const MemoWrapper = styled.div`
  position: relative;

  & > div {
    white-space: pre;
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export default MemoComponent;
