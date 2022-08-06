import React from "react";
import styled from "styled-components";
import Button from "./Button";

function SearchResult({ item, toggleModal }) {
  return (
    <Item>
      <img src={item.thumbnail} alt={`${item.title} 표지`} />
      <h2>{item.title}</h2>
      <h4>{item.authors[0]}</h4>
      <p>
        {item.contents}... <button>더보기</button>
      </p>
      <Button onClick={toggleModal}>책꽂이에 추가</Button>
    </Item>
  );
}

const Item = styled.li`
  padding: 20px;
`;

export default SearchResult;
