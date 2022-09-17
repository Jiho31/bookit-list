import React from "react";
import styled from "styled-components";

function BookComponent({ book, width, height }) {
  return (
    <Book width={width} height={height}>
      <img src={book.thumbnail} alt={`${book.title}의 표지`} />
      <Info>
        <h3>{book.title}</h3>
        <div>{book.authors[0]}</div>
      </Info>
    </Book>
  );
}

const Book = styled.div`
  width: ${(props) => (props.width ? props.width : "260px")};
  height: ${(props) => (props.height ? props.height : "340px")};
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;

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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  div {
    margin-top: 15px;
    font-size: 15px;
  }
`;

export default BookComponent;
