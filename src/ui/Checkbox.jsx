import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
`;

const Label = styled.label`
  font-size: small;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid;
  border-radius: 3px;
  background-color: ${(props) =>
    props.checked ? "var(--color-blue-700)" : "transparent"};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 10px;
    height: 10px;
  }
`;

function Checkbox({ label, checked, setChecked }) {
  const handleCheckboxChange = () => setChecked((prev) => !prev);

  return (
    <Container>
      <Label htmlFor={label}>{label}</Label>
      <HiddenCheckbox
        id={label}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <StyledCheckbox onClick={handleCheckboxChange} checked={checked}>
        {checked && <img src="/src/assets/icons/checkmark.svg" />}
      </StyledCheckbox>
    </Container>
  );
}

export default Checkbox;
