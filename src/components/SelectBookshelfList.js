import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

function SelectBookshelfList({ closeModal }) {
  // bookshelf id 값 필요함

  const shelf = {
    id: "id123",
    isSelected: false,
    name: "To Read",
  };

  const bookshelves = ["To Read", "READ", "Assignment Ref"];

  return (
    <div>
      <Header>
        책꽂이에 담기
        <Icon icon="ep:close-bold" onClick={closeModal} />
      </Header>

      <ListWrapper>
        {bookshelves.map((shelf) => {
          return (
            <li>
              <input type="checkbox" id={shelf} name={shelf} />
              <label htmlFor={shelf}>{shelf}</label>
            </li>
          );
        })}
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
    font-size: 18px;
    text-align: center;
  }
`;

export default SelectBookshelfList;
