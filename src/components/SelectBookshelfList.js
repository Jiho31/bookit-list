import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";
import CheckboxInput from "./CheckboxInput";
import Button from "./Button";
import { Link } from "react-router-dom";

function SelectBookshelfList({ closeModal, targetBook }) {
  // bookshelf id 값 필요함
  const [bookshelves, setBookshelves] = useState({});

  const checkedItemHandler = (bookshelfID, isChecked) => {
    // 체크된 bookshelf의 books에 targetBook 추가 or 삭제
    setBookshelves((prevState) => {
      const newState = Object.assign({}, JSON.parse(JSON.stringify(prevState)));

      if (isChecked && !newState[bookshelfID].books[targetBook.isbn]) {
        console.log("book added to bookshelf");
        newState[bookshelfID].books[targetBook.isbn] = targetBook;
      } else if (!isChecked) {
        console.log("book deleted from bookshelf");
        delete newState[bookshelfID].books[targetBook.isbn];
      }

      // localstorage 업데이트하는 코드 추가하기 ✨ ✨
      localStorage.setItem("bookshelves", JSON.stringify(newState));

      return newState;
    });
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("bookshelves"));

    if (!storage) {
      return;
    }

    setBookshelves(storage);
  }, []);

  return (
    <div>
      <Header>
        책꽂이에 담기
        <Icon icon="ep:close-bold" onClick={closeModal} />
      </Header>

      <ListWrapper>
        {Object.keys(bookshelves).length > 0 ? (
          Object.keys(bookshelves).map((shelfID) => {
            const shelf = bookshelves[shelfID];
            return (
              <li key={uuid()}>
                <CheckboxInput
                  id={shelfID}
                  name={shelf.name}
                  checkedItemHandler={checkedItemHandler}
                  targetID={targetBook.isbn}
                />
              </li>
            );
          })
        ) : (
          <div>
            <p>책꽂이가 없습니다!</p>
          </div>
        )}

        <Link to="/library">
          <Button width="100%">새 책꽂이 만들기</Button>
        </Link>
      </ListWrapper>
    </div>
  );
}

const Header = styled.h1`
  border-radius: 10px 10px 0 0;
  padding: 10px 0;
  background-color: #6d8fad;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  text-align: center;

  svg {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 14px;
    right: 10px;
    cursor: pointer;
  }
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;

  li {
    padding: 10px 0;
  }

  input {
    margin-left: 20px;
    margin-right: 10px;
  }

  li > label {
    font-size: 16px;
    text-align: center;
  }

  p {
    margin: 20px 0;
    text-align: center;
    font-size: 15px;
  }

  a {
    margin: 5px auto;
    width: 80%;
  }
`;

export default React.memo(SelectBookshelfList);
