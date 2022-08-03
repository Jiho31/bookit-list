import React, { useState } from "react";
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

function Library(props) {
  const [isOpen, setIsOpen] = useState(false);

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

  function addNewBookshelf() {}

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
              id="newBookshelf"
              placeholder="책꽂이 이름 (15자 이내로 입력)"
            />
            <div id="buttonWrapper">
              <Button width="55%" type="submit">
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
