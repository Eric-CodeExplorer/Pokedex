import { forwardRef, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLanguage from "../hooks/useLanguage";

const langs = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Français",
    value: "fr",
  },
  {
    name: "简体中文",
    value: "zh-Hans",
  },
];
const Container = styled.div`
  position: relative;
  user-select: none;
`;

const StyledSelectedBar = styled.div`
  border: 1px solid;
  border-radius: 30%;
  width: 20px;
  height: 20px;
  object-fit: contain;
  cursor: pointer;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 25px;
  background-color: var(--color-grey-800);
  padding: 3px;
`;

const StyledOption = styled.div`
  padding: 5px;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 10px;
  background-color: ${({ "data-selected": selected }) =>
    selected ? "var(--color-grey-900)" : "transparent"};
  &:hover {
    background-color: var(--color-grey-600);
  }
`;

function Option({ option_obj, onClickOption, isSelected }) {
  const value = option_obj.value;
  return (
    <StyledOption
      onClick={() => onClickOption(value)}
      data-selected={isSelected}
    >
      {option_obj.name}
    </StyledOption>
  );
}

const LanguageList = forwardRef(function LanguageList(
  { onClickOption, selected },
  ref
) {
  return (
    <StyledList ref={ref}>
      {langs.map((o, i) => (
        <Option
          key={i}
          option_obj={o}
          onClickOption={onClickOption}
          isSelected={selected === o.value}
        />
      ))}
    </StyledList>
  );
});

function LanguageSelector() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  const barRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (showList) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showList]);

  const handleOnClickBar = () => {
    setShowList((show) => !show);
  };

  const handleOnClickOption = (value) => {
    if (value === lang) return;
    const parts = location.pathname.split("/");
    if (parts.length > 1) {
      parts[1] = value;
    }
    const updatedPath = parts.join("/");
    // console.log("OnClick Option");
    navigate(updatedPath);
    setShowList(false);
  };

  function handleClickOutside(event) {
    if (
      listRef.current &&
      !listRef.current.contains(event.target) &&
      barRef.current &&
      !barRef.current.contains(event.target)
    ) {
      //   console.log(`Log from handleOnClickOutSide`);
      setShowList(false);
    }
  }
  return (
    <Container>
      <StyledSelectedBar onClick={handleOnClickBar} ref={barRef}>
        <img src="/src/assets/icons/language.svg" />
      </StyledSelectedBar>
      {showList && (
        <LanguageList
          ref={listRef}
          onClickOption={handleOnClickOption}
          selected={lang}
        />
      )}
    </Container>
  );
}

export default LanguageSelector;
