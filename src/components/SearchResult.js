import React from "react";

function SearchResult({ pageNum, item }) {
  return (
    <ul>
      <li>
        <img src={item.thumbnail} alt={`${item.title} 표지`} />
        <h2>{item.title}</h2>
        <h4>{item.authors[0]}</h4>
        <p>
          {item.contents}... <button>더보기</button>
        </p>
      </li>
    </ul>
  );
}

export default SearchResult;
