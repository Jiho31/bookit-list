import React, { useRef, useState } from "react";
import styled from "styled-components";
import Bookshelf from "components/Bookshelf";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createBookshelf,
  updateBookshelf,
  removeBookshelf,
  selectAllBookshelves,
  selectBookshelvesEntities,
} from "redux/bookshelves";
import Carousel from "components/Carousel";
import Modal from "components/Modal";

function Library({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };
  const dispatch = useDispatch();
  const bookshelves = useSelector(selectBookshelvesEntities);

  const clickEventHandler = () => {
    console.log("clicked");
  };

  function addNewBookshelf(e) {
    e.preventDefault();

    // 책꽂이 제목 input 값이 비어 있을 경우 리턴
    if (inputRef.current.value === "") return;

    // 리덕스 스토어에 데이터 저장
    dispatch(
      createBookshelf({
        // id: cloud 에 bookshelf 컬렉션 생성 후 아이디 값 전달
        creatorId: userInfo.uid,
        name: inputRef.current.value,
        createdAt: new Date().toISOString().slice(0, 10),
        books: [],
      })
    );

    // 💫💫💫💫💫💫💫💫💫💫💫💫💫 모달창 닫기 💫💫💫💫💫💫💫💫💫💫💫💫💫💫
  }

  return (
    <>
      <Button onClick={toggleModal}>새 책꽂이</Button>
      <Button onClick={clickEventHandler}>목록 편집</Button>
      <Carousel />
      <Bookshelves>
        <Bookshelf />
        <Bookshelf />
        <Bookshelf />
      </Bookshelves>
      {isOpen && (
        <Modal toggleModal={toggleModal} width="auto" height="auto">
          <BookshelfForm>
            <label htmlFor="newBookshelf">📚 새 책꽂이 만들기 📚</label>
            <input
              ref={inputRef}
              id="newBookshelf"
              placeholder="책꽂이 이름 (15자 이내로 입력)"
            />
            <div id="buttonWrapper">
              <Button width="55%" type="submit" onClick={addNewBookshelf}>
                만들기
              </Button>
              <Button width="40%" onClick={toggleModal}>
                취소
              </Button>
            </div>
          </BookshelfForm>
        </Modal>
      )}
    </>
  );
}

const Bookshelves = styled.section`
  display: flex;
  flex-direction: column;
`;

const BookshelfForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 180px;
  padding: 30px;

  label {
    font-size: 16px;
    font-weight: 500;
  }
  input {
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px 10px;
  }
  input:focus {
    outline: none;
  }
  #buttonWrapper {
    width: 100%;

    button:first-child {
      margin-right: 5%;
    }
  }
`;

export default Library;
