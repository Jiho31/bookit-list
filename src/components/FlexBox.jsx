import React from "react";
import styled from "styled-components";

function FlexBox(props) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const itemLength = items.length;

  return (
    <Container>
      {items.map((item) => {
        const rows = Math.ceil(Math.sqrt(itemLength));
        console.log(rows);

        return <Item rows={rows}>ss</Item>;
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70vh;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Item = styled.div`
  background-color: violet;
  border-radius: 10px;
  min-height: 100px;
  aspect-ratio: 16/9;

  flex-basis: max(calc(90vw / ${(props) => props.rows}), 200px);
  /* flex-basis: max(calc(90vw / 2), 200px); */
  /* flex-basis: 200px; */
  /* flex-shrink: 100px; */
`;

export default FlexBox;
