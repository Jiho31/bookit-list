import React from "react";
import styled from "styled-components";
import BookComponent from "./BookComponent";

function Bookshelf(props) {
  // bookshelf id 를 입력 받고 리덕스 스토어에서 검색해서 가져오면 되나?
  // 아님 props로 전달 받아야 되나?

  const shelf = {
    id: 1,
    name: "Books I've Read",
    books: [], // book id ? 아님 객체를 통째로 저장?
    numOfBooks: 0,
  };
  return (
    <StyledShelf>
      <h2>
        {shelf.name} ({shelf.numOfBooks})
      </h2>
      <ul>
        <li>
          <BookComponent />
        </li>
        <li>
          <BookComponent />
        </li>
        <li>
          <BookComponent />
        </li>
      </ul>
    </StyledShelf>
  );
}

const StyledShelf = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  margin: 30px 0;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  h2 {
    font-size: 26px;
    font-weight: 600;
    line-height: 28px;
    padding: 10px 0;
    margin-bottom: 26px;
  }
`;

export default Bookshelf;
