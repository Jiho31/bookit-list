import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import styled, { keyframes } from "styled-components";
import bookCoverSrc from "images/crazyrichasian.jpeg";

function Carousel(props) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    console.log(slideIndex);

    sliderRef.current.style.transform = `translateX(calc(${slideIndex} * -1200px))`;
  }, [slideIndex, isTransitionEnabled]);

  const prevBtnClickHandler = () => {
    if (slideIndex === 0) return;

    setSlideIndex((prev) => prev - 1);
  };

  const nextBtnClickHandler = () => {
    if (slideIndex === 2) return;

    setSlideIndex((prev) => prev + 1);

    // sliderRef.current.style.transition = isTransitionEnabled ? "all 0.25s linear" : "none";
  };

  return (
    <Container>
      <Window>
        <Slider ref={sliderRef}>
          <Slide>
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
          </Slide>
          <Slide>
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
          </Slide>
          <Slide>
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
            <img src={bookCoverSrc} alt="book cover" />
          </Slide>
        </Slider>
      </Window>
      <PrevButton onClick={prevBtnClickHandler}>이전</PrevButton>
      <NextButton onClick={nextBtnClickHandler}>다음</NextButton>
    </Container>
  );
}

// keyframes
const slideAnimation = keyframes`
  from {
    transform: translateX(0);
    background-color: red;
  }
  50% {
    transform: translateX(-600px);
  }
  to {
    transform: translateX(-1200px);
    background-color: orange
  }
`;

// CSS

const Container = styled.section`
  width: 100vw;
  height: 400px;
  background-color: #ebf7fd;
`;

const Window = styled.div`
  width: 1200px;
  height: auto;
  margin: 0 auto;
`;

const Slider = styled.div`
  width: 3600px;
  height: auto;
  display: flex;

  transition: all 0.25s linear;

  .slide {
    // animation: 이름 | 시작지연시간 | 재생속도 | 재생시간 | 반복횟수 | 진행방향
  }
`;

const Slide = styled.div`
  width: 1200px;
  height: auto;
  // background-color: green;

  img {
    width: 300px;
    margin: 0 50px;
  }
`;

const PrevButton = styled(Button)`
  transform: translateY(-400px);
`;

const NextButton = styled(Button)`
  transform: translateY(-450px);
`;

export default Carousel;
