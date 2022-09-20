import React from "react";
import styled from "styled-components";
import Button from "./Button";

const MemoForm = React.forwardRef(function MemoForm({ onSubmit }, ref) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <textarea
        name="memo"
        ref={ref}
        maxLength={200}
        placeholder="새 메모를 입력하세요 (최대 200자)"
      ></textarea>
      <SubmitButton type="submit" aria-label="메모 등록하기">
        메모 등록
      </SubmitButton>
    </StyledForm>
  );
});

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    resize: none;
    padding: 10px;
    width: 600px;
    height: 70px;
    border: 1.5px solid #e0e0e0;
    border-radius: 10px;
    font-family: "Roboto", "Noto Sans KR";
    font-size: 14px;
  }
`;

const SubmitButton = styled(Button)`
  width: 75px;
  height: 45px;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px; ;
`;

export default MemoForm;
