import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchResult from "components/SearchResult";
import axios from "axios";

function Library(props) {
  const TOTAL_PAGES = 10;
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const keywordRef = useRef();

  // Intersection Observer 설정
  const observerOptions = {
    root: document.querySelector("#books"),
    rootMargin: "20px",
    threshold: 0.5,
  };

  /*

  const fetchBooksAPI = useCallback(async () => {
    console.log("fetching function called");

    const options = {
      params: {
        query: keywordRef.current.value,
        page: pageNum,
        size: 10, // default = 10
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
    };

    try {
      const response = await axios.get("/v3/search/book", options);
      setSearchResult((prev) => [
        ...new Set([...prev, ...response.data.documents]),
      ]);
    } catch {
      console.error("fetching error ⚠️");
    }
  }, [pageNum]);

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 뷰포트에 마지막 검색 결과가 들어오면, pageNum 값에 1을 더해서 새로운 fetchBooksAPI 요청 호출
        setPageNum((prev) => prev + 1);

        // 현재 타겟을 unobserve
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    console.log("page", pageNum);
    fetchBooksAPI();
  }, [pageNum]);

  useEffect(() => {
    // observer 인스턴스를 생성한 후 구독
    let observer;
    if (lastElement) {
      observer = new IntersectionObserver(onIntersect, observerOptions);

      // observer 생성 시 observe할 타겟 요소는 불러온 결과의 마지막 아이템으로 지정
      observer.observe(lastElement);
    }
    return () => observer && observer.disconnect();
  }, [lastElement]);

  */

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    }, observerOptions)
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    // 클린업 함수
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  // 카카오 도서 검색 API 호출
  const fetchBooksAPI = useCallback(async () => {
    setLoading(true);

    const options = {
      params: {
        query: keywordRef.current.value,
        page: pageNum,
        size: 10, // default = 10
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
    };

    try {
      const response = await axios.get("/v3/search/book", options);
      setSearchResult((prev) => [
        ...new Set([...prev, ...response.data.documents]),
      ]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      console.log(pageNum);
    }
  }, [pageNum]);

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      fetchBooksAPI();
    }
  }, [pageNum, fetchBooksAPI]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchBooksAPI();
    setPageNum(1);
    keywordRef.current.value = "";
  };

  return (
    <div>
      <h1>Library</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          id="keywordInput"
          ref={keywordRef}
          type="text"
          placeholder="도서명, 작가명 또는 ISBN 코드를 입력해서 검색하세요"
        />
        <input type="submit" value="검색" />
      </form>
      <section id="books" style={{ border: "1px solid red" }}>
        {searchResult.map((item, i) => {
          // console.log(item[0]);
          // return (
          //   !loading &&
          //   pageNum <= TOTAL_PAGES && (
          //     <SearchResult
          //       key={item.isbn + Date.now()}
          //       pageNum={pageNum}
          //       item={item}
          //     />
          //   )
          // );
          return i === searchResult.length - 1 &&
            !loading &&
            pageNum <= TOTAL_PAGES ? (
            <div ref={setLastElement} key={item.isbn + Date.now()}>
              <SearchResult item={item} />
            </div>
          ) : (
            <div key={item.isbn + Date.now()}>
              <SearchResult item={item} />
            </div>
          );
        })}
        {/* <p ref={setLastElement}>Last Element</p> */}
      </section>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Library;
