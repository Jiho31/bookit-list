import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { Icon } from "@iconify/react";

// 캐러셀 크기 변수
const Width = "950px"; // 캐러셀의 넓이
const Height = "350px"; // 캐러셀의 높이
const NumOfContents = 3; // 슬라이드 한 개에서 보이는 컨텐츠 개수

function Carousel({ numOfBooks, children }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const sliderRef = useRef();
  const lastPageIndex = Math.ceil(numOfBooks / NumOfContents) - 1;

  useEffect(() => {
    // console.log(slideIndex);

    sliderRef.current.style.transform = `translateX(calc(${slideIndex} * -${Width}))`;
  }, [slideIndex, isTransitionEnabled]);

  const prevBtnClickHandler = useCallback(() => {
    if (slideIndex === 0) return;

    setSlideIndex((prev) => prev - 1);
  });

  const nextBtnClickHandler = useCallback(() => {
    if (slideIndex === lastPageIndex) return;

    setSlideIndex((prev) => prev + 1);

    // sliderRef.current.style.transition = isTransitionEnabled ? "all 0.25s linear" : "none";
  });

  return (
    <Container>
      <Window>
        <Slider ref={sliderRef}>
          <Slide>{children}</Slide>
        </Slider>
      </Window>
      <Buttons>
        <PrevButton onClick={prevBtnClickHandler}>
          <Icon icon="bxs:left-arrow" />
        </PrevButton>
        <NextButton onClick={nextBtnClickHandler}>
          <Icon icon="bxs:right-arrow" />
        </NextButton>
      </Buttons>
    </Container>
  );
}

// CSS

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: ${Height};
  background-color: #ebf7fd;
`;

const Window = styled.div`
  width: ${Width};
  height: auto;
  margin: 0 calc((100vw - ${Width}) / 2);
  overflow: hidden;
`;

const Slider = styled.div`
  width: calc(${Width} * ${NumOfContents});
  height: auto;
  display: flex;

  transition: all 0.25s linear;
`;

const Slide = styled.div`
  width: ${Width};
  height: auto;
`;

const Buttons = styled.div`
  display: flex;
  width: 100vw;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;

  button {
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
`;

const PrevButton = styled(Button)`
  transform: translateY(calc(${Height} / 2));
  margin-left: 50px;
`;

const NextButton = styled(Button)`
  transform: translateY(calc(${Height} / 2));
  position: absolute;
  right: 0;
  margin-right: 50px;
`;

export default React.memo(Carousel);
