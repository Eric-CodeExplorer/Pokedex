import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { translateMoveLearnMethod } from "../util/dictionary";
const StyledSelector = styled.div`
  /* width: 150px; */
  min-width: 150px;
  /* @media only screen and (min-width: 768px) {
    min-width: 150px;
  } */
  height: 50px;
  position: relative;
  user-select: none;
  box-sizing: content-box;
  margin: 10px;
`;

const StyledSelectionBar = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* background-color: red; */
  border: 0px;
  border-radius: 20px;
  box-shadow: var(--shadow-bar);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-bar-focus);
  }
`;

const StyledOptionList = styled.div`
  background-color: var(--color-grey-200);
  position: absolute;
  top: 55px;
  border-radius: 20px;
  box-shadow: var(--shadow-bar-focus);
  padding: 5px 0;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 1000;
  min-width: 150px;
`;

const StyledOption = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  align-items: center;
  border-radius: inherit;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f3f3f4" : "transparent")};

  &:hover {
    background-color: rgb(243, 243, 244, 0.5);
  }
`;

const SelectionBar = forwardRef(function SelectionBar(
  { selected, onClick, lang },
  ref
) {
  return (
    <StyledSelectionBar onClick={onClick} ref={ref}>
      {translateMoveLearnMethod(selected, lang)}
    </StyledSelectionBar>
  );
});

const OptionList = forwardRef(function OptionList(
  { onMouseLeave, selected, onClick, methods, lang },
  ref
) {
  return (
    <StyledOptionList onMouseLeave={onMouseLeave} ref={ref}>
      {methods.map((m) => (
        <Option
          key={m}
          value={m}
          selected={selected}
          onClick={onClick}
          lang={lang}
        />
      ))}
    </StyledOptionList>
  );
});

function Option({ value, selected, onClick, lang }) {
  const handleOnClick = () => {
    if (value !== selected) onClick(value);
  };
  return (
    <StyledOption selected={value === selected} onClick={handleOnClick}>
      {translateMoveLearnMethod(value, lang)}
    </StyledOption>
  );
}

function LearnMethodSelector({ value, setter, lang }) {
  const [showList, setShowList] = useState(false);
  const methods = ["level-up", "egg", "tutor", "machine", "other"];
  const barRef = useRef(null);
  const listRef = useRef(null);

  const handleOnClickBar = () => {
    setShowList((show) => !show);
  };

  const handleOnClickOption = (type) => {
    setter(type);
    setShowList(false);
  };

  function handleClickOutside(event) {
    if (
      listRef.current &&
      !listRef.current.contains(event.target) &&
      barRef.current &&
      !barRef.current.contains(event.target)
    ) {
      console.log(`Log from handleOnClickOutSide`);
      setShowList(false);
    }
  }

  const handleOnMouseLeaveList = () => setShowList((show) => !show);

  useEffect(() => {
    if (showList) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showList]);
  return (
    <StyledSelector>
      <SelectionBar
        lang={lang}
        selected={value}
        onClick={handleOnClickBar}
        ref={barRef}
      />
      {showList && (
        <OptionList
          onMouseLeave={handleOnMouseLeaveList}
          selected={value}
          onClick={handleOnClickOption}
          methods={methods}
          lang={lang}
          ref={listRef}
        />
      )}
    </StyledSelector>
  );
}

export default LearnMethodSelector;
