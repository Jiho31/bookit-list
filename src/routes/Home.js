import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchResult from "components/SearchResult";
import axios from "axios";
import Modal from "components/Modal";
import { Icon } from "@iconify/react";

function Home({ userInfo }) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [resultText, setResultText] = useState("");
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

    console.log("Fetching API");

    try {
      setLoading(true);
      const response = await axios.get("/v3/search/book", options);
      setSearchResult((prev) => [
        ...new Set([...prev, ...response.data.documents]),
      ]);
      setResultText(
        response.data.documents.length ? "검색 결과: " : "검색 결과가 없습니다"
      );
      setLoading(false);
      setPageNum((prev) => prev + 1);
    } catch {
      console.error("fetching error ⚠️");
    }
  };

  // 도서 검색 버튼 클릭할 경우

  const onButtonClickHandler = useCallback(() => {
    // document.querySelector("#searchButton").click();
    // document.querySelector("#searchBar").submit();
    // keywordRef.current.submit();
    onSubmitHandler();
  });

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
      <MainContent>
        <SearchBar id="searchBar" onSubmit={onSubmitHandler}>
          <input
            id="keywordInput"
            ref={keywordRef}
            type="text"
            placeholder="도서명, 작가명 또는 ISBN 코드를 입력해서 검색하세요"
          />
          <SearchButton onClick={onButtonClickHandler}>
            <input id="searchButton" type="submit" value="검색" />
            <Icon icon="charm:search" />
          </SearchButton>
        </SearchBar>
        <SearchResultContainer id="books">
          <h2>{searchResult.length ? "검색 결과: " : resultText}</h2>
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
      </MainContent>
      {isOpen && <Modal toggleModal={toggleModal}>책꽂이 목록</Modal>}
    </div>
  );
}

const MainContent = styled.main`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc((100vw - 950px) / 2);
`;

const SearchBar = styled.form`
  display: flex;
  width: 70vw;
  max-width: 950px;
  height: 50px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 22px;
  margin: 20px auto;

  #keywordInput {
    width: calc(70vw - 50px);
    max-width: 900px;
    height: auto;
    border: none;

    font-size: 16px;
    color: #233142;
  }
  #keywordInput:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 20px;
  padding: 0 5px;

  input {
    display: none;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchResultContainer = styled.section`
  width: 70vw;
  max-width: 950px;

  h2 {
    color: #233142;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 20px 0;
  }
`;

export default React.memo(Home);
