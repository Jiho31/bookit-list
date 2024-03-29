import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import BookComponent from "./BookComponent";
import Carousel from "./Carousel";

function Bookshelf({ bookshelfID, shelf, numOfBooks }) {
  return (
    <StyledShelf>
      <h2>
        {shelf.name} ({numOfBooks})
      </h2>
      {numOfBooks && numOfBooks > 0 ? (
        <Carousel numOfBooks={numOfBooks}>
          <ul>
            {Object.keys(shelf.books).map((id) => {
              return (
                <li key={uuid()}>
                  <BookComponent shelfID={bookshelfID} book={shelf.books[id]} />
                </li>
              );
            })}
          </ul>
        </Carousel>
      ) : (
        <EmptyShelf>
          <br />
          책꽂이가 비어 있습니다. 책을 검색해서 책꽂이에 책을 추가해보세요.
        </EmptyShelf>
      )}
    </StyledShelf>
  );
}

const BookComponentWidth = "250px";
const CarouselWidth = "950px";

const StyledShelf = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 60px;

  &:after {
    content: "";
    align-self: center;
    margin-top: 60px;
    width: ${CarouselWidth};
    height: 1.5px;
    background-color: #d9d9d9;
  }

  ul {
    display: flex;
    flex-direction: row;
  }

  li:nth-child(3n + 2) {
    margin: 0 calc((${CarouselWidth} - 3 * ${BookComponentWidth}) / 2);
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    padding: 10px 0;
    margin-bottom: 26px;

    padding: 0 calc((100vw - ${CarouselWidth}) / 2);
  }
`;

const EmptyShelf = styled.p`
  margin: 20px 0;
  text-align: center;
  font-size: 15px;

  &::before {
    content: "🫥";
    font-size: 40px;
  }
`;

export default Bookshelf;
