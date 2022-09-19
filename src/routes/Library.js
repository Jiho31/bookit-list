import React, { useEffect, useRef, useState } from "react";
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
import Modal from "components/Modal";
import { dbService } from "fbase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

function Library({ userInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookshelves, setBookshelves] = useState(
    JSON.parse(localStorage.getItem("bookshelves"))
  );
  // const bookshelves = useSelector(selectBookshelvesEntities);
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

  const clickEventHandler = () => {
    console.log("clicked");
  };

  async function addNewBookshelf(e) {
    e.preventDefault();

    // 책꽂이 제목 input 값이 비어 있을 경우 리턴
    if (inputRef.current.value === "") return;

    const newBookshelf = {
      creatorId: userInfo.uid,
      name: inputRef.current.value,
      createdAt: new Date().toISOString().slice(0, 10),
      books: {},
    };

    // 🔥🔥🔥🔥🔥🔥 Firestore 업데이트 잠시 멈춤 🔥🔥🔥🔥🔥🔥
    // firestore에 bookshelf 생성
    /*
    const docRef = await addDoc(
      collection(dbService, "bookshelves"),
      newBookshelf
    );

    const { id: bookshelfID } = docRef;
    */
    const bookshelfID = uuid();

    // 리덕스 스토어에 데이터 저장
    dispatch(createBookshelf({ id: bookshelfID, ...newBookshelf }));

    // 로컬 스토리지에 저장
    if (localStorage.getItem("bookshelves")) {
      const localBookshelf = JSON.parse(localStorage.getItem("bookshelves"));
      localBookshelf[bookshelfID] = newBookshelf;

      localStorage.setItem("bookshelves", JSON.stringify(localBookshelf));
    } else {
      const newStorage = {};
      newStorage[bookshelfID] = newBookshelf;
      localStorage.setItem("bookshelves", JSON.stringify(newStorage));
    }

    // 모달창 닫기
    toggleModal();

    // bookshelves 상태 값 업데이트
    setBookshelves((prevState) => {
      const newState = Object.assign({}, JSON.parse(JSON.stringify(prevState)));
      newState[bookshelfID] = newBookshelf;
      return newState;
    });
  }

  // 🔥🔥🔥🔥🔥🔥 Firestore 업데이트 잠시 멈춤 🔥🔥🔥🔥🔥🔥
  /*
  // firestore에서 bookshelves 컬렉션 읽어와서 저장
  useEffect(() => {
    async function getBookshelfData() {
      const querySnapshot = await getDocs(collection(dbService, "bookshelves"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }

    getBookshelfData();

    // 💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫 받아온 bookshelf 목록으로 렌더링 하기 💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
  }, []);
  */

  return (
    <Container>
      <ButtonWrapper>
        <Button
          aria-label="새 책꽂이 만들기"
          title="새 책꽂이 만들기"
          onClick={toggleModal}
        >
          새 책꽂이
        </Button>
        <Button
          aria-label="목록 편집하기"
          title="목록 편집하기"
          onClick={clickEventHandler}
        >
          목록 편집
        </Button>
      </ButtonWrapper>
      <Bookshelves>
        {Object.keys(bookshelves).map((id) => {
          const shelf = bookshelves[id];
          return (
            <Bookshelf
              key={id}
              bookshelfID={id}
              shelf={shelf}
              numOfBooks={Object.keys(shelf.books).length}
            />
          );
        })}
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
              <Button
                aria-label="책꽂이 만들기 폼 제출"
                width="55%"
                type="submit"
                onClick={addNewBookshelf}
              >
                만들기
              </Button>
              <Button
                aria-label="새 책꽂이 모달 닫기"
                width="40%"
                onClick={toggleModal}
              >
                취소
              </Button>
            </div>
          </BookshelfForm>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 calc((100vw - 950px) / 2);

  button:first-child {
    margin-right: 10px;
  }
`;

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
