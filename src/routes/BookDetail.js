import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react";

function BookDetail(props) {
  const params = useParams();
  const item = {
    title: "harry potter",
    authors: ["j.k. rowling"],
    publisher: "Penguin",
    datetime: "2022-09-19",
    isbn: "as23efk2398xckj sd23",
    contents: "책 내용 어쩌구 저쩌구 랄랄라 loremips",
    url: "",
    thumbnail: "",
  };

  const [shelfName, setShelfName] = useState("");
  const [bookInfo, setBookInfo] = useState(item);

  useEffect(() => {
    // console.log(params);
    const storageData = JSON.parse(localStorage.getItem("bookshelves"));

    setShelfName(storageData[params.bookshelfID].name);
    setBookInfo(storageData[params.bookshelfID].books[params.bookID]);
  }, []);

  return (
    <Container>
      <BookInfoWrapper>
        <img src={bookInfo.thumbnail} alt={`${bookInfo.title} 표지`} />
        <BookInfo>
          <h1>
            <Icon icon="mdi:bookshelf" />
            {shelfName}
          </h1>
          <h2>{bookInfo.title}</h2>
          <div>
            <span className="tagName">저자: </span>
            <span>{bookInfo.authors[0]}</span>
          </div>
          <div>
            <span className="tagName">출판: </span>
            <span>{bookInfo.publisher}</span>
          </div>
          <div>
            <span className="tagName">출간: </span>
            <span>{bookInfo.datetime.slice(0, 10).replaceAll("-", ".")}</span>
          </div>
          <div>
            <span className="tagName">ISBN: </span>
            <span>{bookInfo.isbn}</span>
          </div>
          <div className="description">
            <p>{bookInfo.contents}</p>
            <button>
              <a href={bookInfo.url}>👉 더보기</a>
            </button>
          </div>
        </BookInfo>
      </BookInfoWrapper>
      <Divider />
      <MemosWrapper>
        <article>memo1</article>
        <article>memo2</article>
        <article>memo3</article>
      </MemosWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 70vw;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const BookInfoWrapper = styled.section`
  /* display: flex; */
  display: inherit;
  flex-direction: row;
  margin: 70px 0;

  img {
    max-width: 200px;
    width: auto;
    height: 280px;
    object-fit: cover;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
  }

  h1 {
    color: #6d8fad;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
  }
  h2 {
    padding: 10px 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 34px;
  }
`;

const BookInfo = styled.div`
  flex-direction: column;
  margin-left: 64px;
  width: 50vw;
  font-size: 14px;
  line-height: 28px;

  .tagName {
    font-weight: 500;
  }

  .description > p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  .description a,
  a:hover {
    text-decoration: none;
    color: #000;
  }
`;

const Divider = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #6d8fad;
`;
const MemosWrapper = styled.section``;

export default BookDetail;
