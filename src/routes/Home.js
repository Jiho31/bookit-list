import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchResult from "components/SearchResult";
import axios from "axios";
import Modal from "components/Modal";
import SelectBookshelfList from "components/SelectBookshelfList";
import Button from "components/Button";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";

const PROXY =
  window.location.hostname === "localhost"
    ? "/v3/search/book"
    : "/proxy/v3/search/book";

function Home({ userInfo }) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [resultText, setResultText] = useState("");
  const keywordRef = useRef();
  const pageNum = useRef(1);

  const lastItemRef = useRef();
  const observer = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const targetRef = useRef();

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);

    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [setIsOpen]);

  // 클릭된 책 아이디를 ref 값으로 저장
  const setTarget = useCallback(
    (targetID) => {
      targetRef.current = targetID;
    },
    [targetRef]
  );

  const fetchAndUpdateResult = useCallback((data, isFirstFetch = false) => {
    // 검색 결과 리스트 업데이트
    setSearchResult((prev) => {
      if (isFirstFetch) return [...data];

      const newResult = [...prev];

      data.forEach((obj) => {
        const { isbn } = obj;

        if (prev.filter((x) => x.isbn === isbn).length === 0) {
          newResult.push(obj);
        }
      });

      return newResult;
    });

    // 검색 결과 안내 문구 업데이트
    setResultText(data.length ? "검색 결과: " : "검색 결과가 없습니다");

    // 페이지 인덱스 번호 업데이트
    pageNum.current += 1;
  }, []);

  // 카카오 도서 검색 api 호출
  const fetchBooksAPI = useCallback(async () => {
    const options = {
      params: {
        query: keywordRef.current.value,
        page: pageNum.current,
        size: 10, // default = 10
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(`${PROXY}`, options);
      setLoading(false);
      return response.data.documents;
    } catch (err) {
      throw new Error(err);
      // console.error("fetching error ⚠️");
    }
  });

  // 도서 검색 버튼 클릭할 경우
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    pageNum.current = 1;

    if (!keywordRef.current.value) return;

    // 도서 검색 api 호출
    const data = await fetchBooksAPI(true);
    fetchAndUpdateResult(data, true);
  };

  // Intersection Observer 설정
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const onIntersect = async (entries) => {
      if (entries[0].isIntersecting && pageNum.current <= 8) {
        const data = await fetchBooksAPI();
        fetchAndUpdateResult(data);
      }
    };

    observer.current = new IntersectionObserver(onIntersect, options);
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }
    return () => observer.current && observer.current.disconnect();
  }, [fetchBooksAPI, lastItemRef]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
          <SearchButton onClick={onSubmitHandler}>
            <input
              id="searchButton"
              type="submit"
              value="검색"
              alt="도서 검색하기"
            />
            <Icon icon="charm:search" />
          </SearchButton>
        </SearchBar>
        <SearchResultContainer id="books">
          <h2>{searchResult.length ? "검색 결과: " : resultText}</h2>
          <ul>
            {searchResult.map((item, i) => {
              return i === searchResult.length - 1 ? (
                <div ref={lastItemRef} key={uuid()}>
                  <SearchResult
                    item={item}
                    toggleModal={toggleModal}
                    setTarget={setTarget}
                  />
                </div>
              ) : (
                <div key={uuid()}>
                  <SearchResult
                    item={item}
                    toggleModal={toggleModal}
                    setTarget={setTarget}
                  />
                </div>
              );
            })}
          </ul>
        </SearchResultContainer>
        {loading && <p>Loading...</p>}
        {searchResult.length > 0 ? (
          <ScrollToTopButton>
            <Button
              aria-label="scroll to top"
              title="Scroll to top"
              onClick={scrollToTop}
              padding="4px"
            >
              <Icon icon="bx:arrow-to-top" width="24px" height="24px" />
            </Button>
          </ScrollToTopButton>
        ) : (
          ""
        )}
      </MainContent>
      {isOpen && (
        <Modal width="300px" height="auto" toggleModal={toggleModal}>
          <SelectBookshelfList
            closeModal={toggleModal}
            targetBook={targetRef.current}
          />
        </Modal>
      )}
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
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  #keywordInput {
    width: calc(70vw - 90px);
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

const SearchButton = styled(Button)`
  width: 32px;
  height: 32px;
  margin-left: 30px;
  padding: 0 4px;
  color: inherit;
  background-color: #fff;

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

const ScrollToTopButton = styled.div`
  z-index: 1;
  position: fixed;
  right: 20px;
  bottom: 20px;

  button {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

export default React.memo(Home);
