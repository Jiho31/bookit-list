import React from "react";
import styled from "styled-components";
import Button from "./Button";

function SearchResult({ item, toggleModal }) {
  return (
    <Item>
      <img src={item.thumbnail} alt={`${item.title} 표지`} />
      <div className="bookInfo">
        <h2>{item.title}</h2>
        <div>
          <span className="tagName">저자:</span>
          <span>{item.authors[0]}</span>
        </div>
        <div>
          <span className="tagName">출판:</span>
          <span>{item.publisher}</span>
        </div>
        <div>
          <span className="tagName">출간:</span>
          <span>{item.datetime.slice(0, 10).replaceAll("-", ".")}</span>
        </div>
        <div>
          <span className="tagName">ISBN:</span>
          <span>{item.isbn}</span>
        </div>
        <div>
          <p>{item.contents}</p>
          ...
          <button>
            <a href={item.url}>더보기</a>
          </button>
        </div>
        <div>
          <Button onClick={toggleModal}>책꽂이에 담기</Button>
        </div>
      </div>
    </Item>
  );
}

const Item = styled.li`
  /* width: 60vw; */
  width: auto;
  max-width: inherit;
  height: 320px;
  max-height: 320px;
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  margin: 30px auto;
  font-size: 14px;

  img {
    width: 220px;
    max-width: 220px;
    /* height: auto; */
    border-radius: 10px 0 0 10px;
    height: 100%;
    object-fit: fill;
  }
  .bookInfo {
    width: 100%;
    padding: 20px 40px;
  }
  .bookInfo > div {
    padding: 0.2em 0;
  }
  .bookInfo > div:last-child {
    display: flex;
    justify-content: center;
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
  }

  .tagName {
    color: grey;
    margin-right: 0.5em;
  }

  a:visited,
  a:link {
    color: #233142;
  }

  p {
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.5em;
    max-height: 4.5em;
  }
`;

export default SearchResult;
