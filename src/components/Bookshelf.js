import React from "react";

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
    <article>
      <h2>{shelf.name}</h2>
      <div>Book1</div>
    </article>
  );
}

export default Bookshelf;
