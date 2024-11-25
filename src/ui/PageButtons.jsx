import styled from "styled-components";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

const MAX_DISPLAY_PAGES = 5;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: none;
  font-size: small;
  padding: 20px 0;
  @media only screen and (min-width: 768px) {
    gap: 25px;
  }
`;

const Button = styled.button`
  /* height: 64px; */
  border: 1px solid;
  border-radius: 15px;
  padding: 7px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "var(--color-grey-300)" : "transparent"};

  @media only screen and (min-width: 768px) {
    padding: 15px;
  }

  &:hover,
  &:focus {
    outline: none;
  }
  &:active {
    background-color: var(--color-grey-50);
  }
`;

function PageButtons({ currentPage, setCurrentPage, totoalPages }) {
  const { lang } = useLanguage();
  const exceeded = totoalPages > MAX_DISPLAY_PAGES;
  const handleGoPrev = () => setCurrentPage((i) => i - 1);
  const handleGoNext = () => setCurrentPage((i) => i + 1);
  const handleGoTo = (p) => {
    if (p !== currentPage) setCurrentPage(p);
  };

  return (
    <Container>
      {currentPage > 1 && (
        <Button onClick={handleGoPrev}>{translate("previous", lang)}</Button>
      )}
      {exceeded ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <Button
              selected={i + 1 === currentPage}
              key={i}
              onClick={() => handleGoTo(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <span>. . .</span>
          {currentPage > 3 && <Button selected={true}>{currentPage}</Button>}
          {currentPage < totoalPages && (
            <>
              <span>. . .</span>
              <Button
                selected={currentPage === totoalPages}
                onClick={() => handleGoTo(totoalPages)}
              >
                {totoalPages}
              </Button>
            </>
          )}
        </>
      ) : (
        Array.from({ length: totoalPages }).map((_, i) => (
          <Button
            selected={i + 1 === currentPage}
            key={i}
            onClick={() => handleGoTo(i + 1)}
          >
            {i + 1}
          </Button>
        ))
      )}
      {currentPage < totoalPages && (
        <Button onClick={handleGoNext}>{translate("next", lang)}</Button>
      )}
    </Container>
  );
}

export default PageButtons;
