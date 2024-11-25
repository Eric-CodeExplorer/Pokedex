import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { getName } from "../util/helpers";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

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

function GenerationSelector({ value, setter }) {
  const [showList, setShowList] = useState(false);
  const { gens } = useContext(AppContext);
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

  if (gens === null) return null;

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
  return (
    <StyledSelector>
      <SelectionBar
        selected={value}
        onClick={handleOnClickBar}
        gens={gens}
        ref={barRef}
      />
      {showList && (
        <OptionList
          onClick={handleOnClickOption}
          selected={value}
          onMouseLeave={handleOnMouseLeaveList}
          generations={gens}
          ref={listRef}
        />
      )}
    </StyledSelector>
  );
}

const SelectionBar = forwardRef(function SelectionBar(
  { selected, onClick, gens },
  ref
) {
  const { lang } = useLanguage();

  return (
    <StyledSelectionBar onClick={onClick} ref={ref}>
      {selected === ""
        ? translate("all", lang)
        : getName(gens[selected].names, lang)}
    </StyledSelectionBar>
  );
});

const OptionList = forwardRef(function OptionList(
  { onMouseLeave, selected, onClick, generations },
  ref
) {
  return (
    <StyledOptionList onMouseLeave={onMouseLeave} ref={ref}>
      {Object.keys(generations).map((gen, i) => (
        <Option
          gen={generations[gen]}
          key={i}
          selected={selected}
          onClick={onClick}
        />
      ))}
    </StyledOptionList>
  );
});

function Option({ gen, selected, onClick }) {
  const { lang } = useLanguage();
  const value = gen.name;
  const handleOnClick = () => {
    if (value === "null") onClick("");
    else onClick(value);
  };
  return (
    <StyledOption selected={selected === value} onClick={handleOnClick}>
      {value === "" ? translate("all", lang) : getName(gen.names, lang)}
    </StyledOption>
  );
}

export default GenerationSelector;
