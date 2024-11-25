import styled from "styled-components";
import TypeSelector from "./TypeSelector";

const StyledSelectors = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

function DoubleTypeSelector({ type1, type2, setter1, setter2 }) {
  return (
    <StyledSelectors>
      <TypeSelector
        selectedType={type1}
        other={type2}
        setter={(value) => setter1(value)}
        isRight={false}
      />
      <TypeSelector
        selectedType={type2}
        other={type1}
        setter={(value) => setter2(value)}
        isRight={true}
      />
    </StyledSelectors>
  );
}

export default DoubleTypeSelector;
