import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* padding: 50px 0; */
  gap: 10px;
  position: relative;
  overflow: hidden;
  /* margin: 0 auto; */
  user-select: none;
`;

const Slider = styled.div`
  display: flex;
  /* border: 1px solid; */
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => `calc(50% + ${props["data-offset"]}px)`});
  box-sizing: content-box;
  transition: all linear 0.5s;
  align-items: center;
`;

const SliderItem = styled.div`
  /* flex-shrink: 0; */
  width: 128px;
  height: 128px;
  img {
    /* display: none; */
    width: 128px;
    height: 128px;
  }
  object-fit: cover;
  flex-shrink: 0;
  transform: ${(props) =>
    `translate3d(0px,0px,${100 * props["data-diff"]}px) rotateY(${
      50 * props["data-diff"]
    }deg) scale(${props["data-diff"] === 0 ? "1" : "0.5"})`};
  transform-style: preserve-3d;
  position: relative;
  background-position: center;
  background-size: cover;
  transition: all linear 0.5s;
`;

// const ItemShadow = styled.div`
//   pointer-events: none;
//   background-image: ${(props) =>
//     `linear-gradient(${
//       props["data-isleft"] ? "to left" : "to right"
//     }, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));`};
//   opacity: ${(props) =>
//     (props["data-diff"] < 0 && props["data-isleft"]) ||
//     (props["data-diff"] > 0 && !props["data-isleft"])
//       ? Math.abs(props["data-diff"])
//       : "0"};
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   border-radius: 50%;
//   transition: all linear 0.5s;
// `;

const StyledButton = styled.button`
  width: 35px;
  height: 35px;
  border: 0px;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  left: ${(props) => (props["data-isleft"] ? "0" : "unset")};
  right: ${(props) => (!props["data-isleft"] ? "0" : "unset")};
  top: 50%;
  transform: translate(0, -50%);
  background-image: ${({ "data-isleft": isLeft }) =>
    isLeft
      ? "url('/src/assets/icons/left.svg')"
      : "url('/src/assets/icons/right.svg')"};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-color: var(--color-grey-100); */
  background-color: transparent;
  &:focus {
    outline: none;
  }

  &:active {
    background-color: var(--color-brand-200);
  }
`;

function Button({ children, onClick, isLeft }) {
  return (
    <StyledButton onClick={onClick} data-isleft={isLeft}>
      {children}
    </StyledButton>
  );
}

function VarietySlider({ images, index, setIndex }) {
  // const [index, setIndex] = useState(0);
  const list_length = images.length;
  const IMAGE_SIZE = 128;
  const offset = -(IMAGE_SIZE * index) - IMAGE_SIZE / 2;
  const handleMoveLeft = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleMoveRight = () =>
    setIndex((prev) => (prev < list_length - 1 ? prev + 1 : prev));

  const isFirst = index === 0;
  const isLast = index === list_length - 1;
  return (
    <Container>
      {!isFirst && <Button onClick={handleMoveLeft} isLeft={true}></Button>}

      <Slider data-offset={offset}>
        {images.map((image, i) => (
          <SliderItem key={i} data-diff={index - i}>
            <img src={image} />
            {/* <ItemShadow data-diff={index - i} data-isleft={true} />
            <ItemShadow data-diff={index - i} data-isleft={false} /> */}
          </SliderItem>
        ))}
      </Slider>

      {!isLast && <Button onClick={handleMoveRight} isLeft={false}></Button>}
    </Container>
  );
}

export default VarietySlider;
