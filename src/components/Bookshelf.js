import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import BookComponent from "./BookComponent";
import Carousel from "./Carousel";

function Bookshelf({ shelf, numOfBooks }) {
  return (
    <StyledShelf>
      <h2>
        {shelf.name} ({numOfBooks})
      </h2>
      <Carousel>
        <ul>
          {numOfBooks > 0 ? (
            Object.keys(shelf.books).map((id) => {
              return (
                <li key={uuid()}>
                  <BookComponent book={shelf.books[id]} />
                </li>
              );
            })
          ) : (
            <div>
              책꽂이가 비어 있습니다. 책을 검색해서 책꽂이에 책을 추가해보세요.{" "}
            </div>
          )}
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
