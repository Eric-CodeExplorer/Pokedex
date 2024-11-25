import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";
import { getName } from "../util/helpers";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

const StyledSelector = styled.div`
  /* width: 150px; */
  min-width: 150px;
  height: 50px;
  position: relative;
  user-select: none;
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

  .icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
    line-height: 30px;
    /* @media only screen and (min-width: 768px) {
      width: 30px;
      height: 30px;
      line-height: 30px;
    } */
  }
  .name {
    height: 30px;
    border: 0px;
    border-radius: 10px;
    line-height: 30px;
    /* @media only screen and (min-width: 768px) {
      line-height: 30px;
      height: 30px;
    } */
  }

  &:hover {
    box-shadow: var(--shadow-bar-focus);
  }
`;

const StyledOptionList = styled.div`
  background-color: var(--color-grey-200);
  position: absolute;
  right: ${(props) => (props["data-isright"] ? "0" : "initial")};
  border-radius: 20px;
  box-shadow: var(--shadow-bar-focus);
  padding: 5px 0;
  display: grid;
  top: 55px;
  grid-template-columns: repeat(3, max-content);
  z-index: 1000;
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, max-content);
  }
`;

const StyledOption = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  align-items: center;
  border-radius: inherit;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#f3f3f4" : "transparent")};
  @media only screen and (min-width: 768px) {
    padding: 10px;
  }
  .icon {
    width: 15px;
    height: 15px;
    object-fit: contain;
    line-height: 15px;
    @media only screen and (min-width: 768px) {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }
  .name {
    height: 15px;
    border: 0px;
    border-radius: 10px;
    line-height: 15px;
    @media only screen and (min-width: 768px) {
      line-height: 30px;
      height: 30px;
    }
  }

  &:hover {
    background-color: rgb(243, 243, 244, 0.5);
  }
`;

function TypeSelector({ selectedType, other, setter, isRight }) {
  const [showList, setShowList] = useState(false);
  const { types } = useContext(AppContext);
  const dropdownRef = useRef(null);
  const barRef = useRef(null);
  useEffect(() => {
    if (showList) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showList]);

  if (types === null) return null;

  const handleOnClickBar = () => {
    // console.log(`Log from handleOnClickBar`);
    setShowList((show) => !show);
  };

  const handleOnClickOption = (type) => {
    setter(type);
    setShowList(false);
  };

  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      barRef.current &&
      !barRef.current.contains(event.target)
    ) {
      // console.log(`Log from handleOnClickOutSide`);
      setShowList(false);
    }
  }

  const handleOnMouseLeaveList = () => setShowList((show) => !show);

  return (
    <StyledSelector>
      <SelectionBar
        types={types}
        onClick={handleOnClickBar}
        selected={selectedType}
        ref={barRef}
      ></SelectionBar>
      {showList && (
        <OptionList
          types={types}
          onMouseLeave={handleOnMouseLeaveList}
          selected={selectedType}
          onClick={handleOnClickOption}
          other={other}
          isRight={isRight}
          ref={dropdownRef}
        />
      )}
    </StyledSelector>
  );
}

const SelectionBar = forwardRef(function SelectionBar(
  { types, onClick, selected },
  ref
) {
  const { lang } = useLanguage();
  return (
    <StyledSelectionBar onClick={onClick} ref={ref}>
      {selected === "null" ? (
        <div className="name">{translate("selectType", lang)}</div>
      ) : (
        <>
          <div className="icon">
            <img src={types[selected].img} />
          </div>
          <div className="name">{getName(types[selected].names, lang)}</div>
        </>
      )}
    </StyledSelectionBar>
  );
});
const OptionList = forwardRef(function OptionList(
  { types, selected, onClick, onMouseLeave, other, isRight },
  ref
) {
  const { lang } = useLanguage();
  const isSelected = (type_key) =>
    (type_key !== "null" && type_key === selected) || type_key === other;
  return (
    <StyledOptionList
      onMouseLeave={onMouseLeave}
      data-isright={isRight}
      ref={ref}
    >
      {Object.keys(types).map((type_key) =>
        type_key === "null" ? (
          <Option
            value={type_key}
            name={translate("selectType", lang)}
            key="null"
            onClick={onClick}
            selected={false}
          />
        ) : (
          <Option
            value={type_key}
            name={getName(types[type_key].names, lang)}
            image={types[type_key].img}
            key={type_key}
            onClick={onClick}
            selected={isSelected(type_key)}
          />
        )
      )}
    </StyledOptionList>
  );
});

function Option({ value, name, image = null, selected = false, onClick }) {
  const handleOnClick = () => {
    if (!selected) onClick(value);
  };
  return (
    <StyledOption selected={selected} onClick={handleOnClick}>
      {image !== null && (
        <div className="icon">
          <img src={image} />
        </div>
      )}
      <div className="name">{name}</div>
    </StyledOption>
  );
}

export default TypeSelector;
