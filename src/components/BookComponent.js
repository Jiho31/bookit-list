import React from "react";
import styled from "styled-components";
import bookCoverSrc from "images/crazyrichasian.jpeg";

function BookComponent({ width, height }) {
  const book = {
    id: 1,
    name: "Crazy Rich Asians",
    author: "Kevin Kwan",
    publisher: "Penguins ",
    coverImage: "",
  };
  return (
    <Book width={width} height={height}>
      <img src={bookCoverSrc} alt="book cover" />
      <Info>
        <h3>{book.name}</h3>
        <div>{book.author}</div>
      </Info>
    </Book>
  );
}

const Book = styled.div`
  width: ${(props) => (props.width ? props.width : "260px")};
  height: ${(props) => (props.height ? props.height : "320px")};
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: #fff;

  img {
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: 0% 10%;
    overflow: hidden;

    border-bottom: 1px solid #d9d9d9;
  }
`;

const Info = styled.div`
  width: 100%;
  height: fit-content;
  padding: 14px 24px;

  h3 {
    font-size: 22px;
  }
  div {
    margin-top: 5px;
    font-size: 16px;
  }
`;

export default BookComponent;