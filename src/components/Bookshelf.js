import React from "react";
import styled from "styled-components";
import BookComponent from "./BookComponent";
import Carousel from "./Carousel";

function Bookshelf(props) {
  // bookshelf id 를 입력 받고 리덕스 스토어에서 검색해서 가져오면 되나?
  // 아님 props로 전달 받아야 되나?
  const book = {
    id: 1,
    name: "Crazy Rich Asians",
    author: "Kevin Kwan",
    publisher: "Penguins ",
    coverImage: "",
  };

  const shelf = {
    id: 1,
    name: "Books I've Read",
    books: [book, book, book, book, book], // book id ? 아님 ✨✨객체를 통째로✨✨ 저장?
    numOfBooks: 0,
  };
  return (
    <StyledShelf>
      <h2>
        {shelf.name} ({shelf.numOfBooks})
      </h2>
      <Carousel>
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
          <li>
            <BookComponent />
          </li>
          <li>
            <BookComponent />
          </li>
          <li>
            <BookComponent />
          </li>
          <li>
            <BookComponent />
          </li>
          <li>
            <BookComponent />
          </li>
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
      </Carousel>
    </StyledShelf>
  );
}

const BookComponentWidth = "260px";
const CarouselWidth = "950px";

const StyledShelf = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  margin: 30px 0;

  ul {
    display: flex;
    flex-direction: row;
  }

  li:nth-child(3n + 2) {
    margin: 0 calc((${CarouselWidth} - 3 * ${BookComponentWidth}) / 2);
  }

  h2 {
    font-size: 26px;
    font-weight: 600;
    line-height: 28px;
    padding: 10px 0;
    margin-bottom: 26px;

    padding: 0 calc((100vw - 950px) / 2);
  }
`;

export default Bookshelf;
