import React, { useEffect, useRef, useState } from "react";
import SearchResult from "components/SearchResult";
import axios from "axios";

function Library(props) {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const keywordRef = useRef();

  const lastItemRef = useRef();
  const observer = useRef();

  // 카카오 도서 검색 api 호출
  const fetchBooksAPI = async () => {
    console.log(pageNum);
    const options = {
      params: {
        query: keywordRef.current.value,
        page: pageNum + 1,
        size: 15, // default = 10
      },
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get("/v3/search/book", options);
      console.log(response.data.documents);
      setSearchResult((prev) => [
        ...new Set([...prev, ...response.data.documents]),
      ]);
      setLoading(false);
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
    await fetchBooksAPI();
    setPageNum(1);
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
        setPageNum((prev) => {
          if (prev < 4) {
            return prev + 1;
          }
        });
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
          return i === searchResult.length - 1 && !loading ? (
            <div ref={lastItemRef} key={item.isbn + Date.now()}>
              <SearchResult item={item} />
            </div>
          ) : (
            <div key={item.isbn + Date.now()}>
              <SearchResult item={item} />
            </div>
          );
        })}
      </section>
      {loading && <p>Loading...</p>}
      <div>
        <button onClick={scrollToTop}>🔝 위로</button>
      </div>
    </div>
  );
}

export default Library;
