import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchResult from "components/SearchResult";
import axios from "axios";
import Modal from "components/Modal";

function Home({ userInfo }) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const keywordRef = useRef();

  const lastItemRef = useRef();
  const observer = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  // 카카오 도서 검색 api 호출
  const fetchBooksAPI = async (isFirstFetch = false) => {
    const options = {
      params: {
        query: keywordRef.current.value,
        page: isFirstFetch ? 1 : pageNum + 1,
        size: 15, // default = 10
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get("/v3/search/book", options);
      setSearchResult((prev) => [
        ...new Set([...prev, ...response.data.documents]),
      ]);
      setLoading(false);
      setPageNum((prev) => prev + 1);
    } catch {
      console.error("fetching error ⚠️");
    }
  };

  // 도서 검색 버튼 클릭할 경우
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 도서 검색 결과 빈 배열로 초기화
    setPageNum(0);
    setSearchResult([]);

    if (!keywordRef.current.value) return;

    // 도서 검색 api 호출
    await fetchBooksAPI(true);
  };

  // Intersection Observer 설정
  useEffect(() => {
    const options = {
      root: document,
      rootMargin: "-20px",
      threshold: 0.5,
    };
    const onIntersect = async (entries) => {
      if (entries[0].isIntersecting && pageNum <= 5) {
        // setPageNum((prev) => {
        //   if (prev < 4) {
        //     return prev + 1;
        //   }
        // });
        await fetchBooksAPI();
      } else return;
    };

    observer.current = new IntersectionObserver(onIntersect, options);
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    return () => observer.current && observer.current.disconnect();
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <h1>Library</h1>
        <SearchBar onSubmit={onSubmitHandler}>
          <input
            id="keywordInput"
            ref={keywordRef}
            type="text"
            placeholder="도서명, 작가명 또는 ISBN 코드를 입력해서 검색하세요"
          />
          <input id="searchButton" type="submit" value="검색" />
        </SearchBar>
        <SearchResultContainer id="books" style={{ border: "1px solid red" }}>
          <ul>
            {searchResult.map((item, i) => {
              return i === searchResult.length - 1 && !loading ? (
                <div ref={lastItemRef} key={item.isbn + Date.now()}>
                  <SearchResult item={item} toggleModal={toggleModal} />
                </div>
              ) : (
                <div key={item.isbn + Date.now()}>
                  <SearchResult item={item} toggleModal={toggleModal} />
                </div>
              );
            })}
          </ul>
        </SearchResultContainer>
        {loading && <p>Loading...</p>}
        {searchResult.length > 0 ? (
          <div>
            <button onClick={scrollToTop}>🔝 위로</button>
          </div>
        ) : (
          ""
        )}
      </div>
      {isOpen && <Modal toggleModal={toggleModal}>책꽂이 목록</Modal>}
    </div>
  );
}

const SearchBar = styled.form`
  width: fit-content;
  margin: 0 auto;

  #keywordInput {
    width: 550px;
    height: 40px;
  }
  #keywordInput:focus {
    outline: none;
  }

  #searchButton {
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }
`;

const SearchResultContainer = styled.section`
  ul {
    margin: 0 auto;
    width: 600px;
    display: flex;
    flex-direction: column;
  }
`;

export default React.memo(Home);
