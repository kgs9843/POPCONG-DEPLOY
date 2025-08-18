import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
const DragModal = ({
  children,
  minHeight = 350,
  maxHeight = 600,
  height,
  setHeight,
  backgroundColor,
}) => {
  //초기 높이를 동적으로 변화시키기위해 부모의 status를 사용합니다!!
  //const [height, setHeight] = useState(initialHeight); // 초기 높이 (px)
  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(null);
  const startHeight = useRef(null);
  const startTime = useRef(null);

  // 마우스 부분 (가속도 구현 x)
  const onMouseDown = (e) => {
    startY.current = e.clientY;
    startHeight.current = height;
    setIsDragging(true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const diff = startY.current - e.clientY;
    const newHeight = Math.min(
      Math.max(startHeight.current + diff, minHeight),
      maxHeight
    );
    setHeight(newHeight);
  };
  const onMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  // 터치 부분(가속도 구현)
  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
    startTime.current = Date.now();
    setIsDragging(true);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const onTouchMove = (e) => {
    const diff = startY.current - e.touches[0].clientY;
    const newHeight = Math.min(
      Math.max(startHeight.current + diff, minHeight),
      maxHeight
    );
    setHeight(newHeight);
  };

  const onTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    const diffY = startY.current - endY;
    const timeElapsed = Date.now() - startTime.current;
    //가속도
    const velocity = diffY / timeElapsed; // px/ms

    if (velocity > 0.3) {
      setHeight(maxHeight);
    } else if (velocity < -0.3) {
      setHeight(minHeight);
    }
    setIsDragging(false);

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
  };

  return (
    <PopupContainer
      height={height}
      backgroundColor={backgroundColor}
      isDragging={isDragging}
    >
      <DragHandleWrapper onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <DragHandle />
      </DragHandleWrapper>
      <Content>{children}</Content>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  width: 100%;
  border-top-left-radius: 20px; /* rounded-t-2xl */
  border-top-right-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
  display: flex;
  flex-direction: column;
  height: ${({ height }) => `${height}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};

  ${({ isDragging }) =>
    !isDragging &&
    css`
      transition: height 0.5s ease-in-out;
    `}
`;

const DragHandleWrapper = styled.div``;

const DragHandle = styled.div`
  width: 3rem; /* w-12 */
  height: 0.375rem; /* h-1.5 */
  background-color: var(--gray2); /* mainGrayColor */
  border-radius: 9999px; /* rounded-full */
  margin: 0.5rem auto; /* mx-auto my-2 */
  cursor: ns-resize; /* cursor-ns-resize */
`;

const Content = styled.div`
  overflow: auto; /* overflow-auto */
  flex: 1; /* flex-1 */
  padding: 0 1rem; /* px-4 */
`;

export default DragModal;
