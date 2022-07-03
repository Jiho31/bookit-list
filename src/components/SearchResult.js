import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchResult(props) {
  const [keyword, setKeyword] = useState("해리포터");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const options = {
      params: {
        query: keyword,
        display: 10,
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
      },
    };
    const fetchBooksAPI = async () => {
      try {
        const response = await axios.get("/v1/search/book.json", options);
        setResult(response.data.items);
        console.log(response.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooksAPI();
  }, [keyword]);

  return (
    <div>
      <ul>
        {result.map((item) => (
          <li key={item.isbn}>
            <img src={item.image} alt={`${item.title} 표지`} />
            <h2>{item.title}</h2>
            <h4>{item.author}</h4>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;
