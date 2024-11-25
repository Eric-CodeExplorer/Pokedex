import styled from "styled-components";
import translate from "../util/dictionary";

const StyledTable = styled.table`
  display: table;
  margin: 0 auto 1rem;
  border-collapse: collapse;
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  border-color: gray;
`;

const StyledTitle = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  padding: 10px;
  align-items: baseline;

  & .form {
    font-size: 0.7em;
    color: #737373;
  }
`;

const StyledTBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  unicode-bidi: isolate;
`;

const StyledTR = styled.tr`
  display: table-row;
  vertical-align: inherit;
  unicode-bidi: isolate;
  border-color: inherit;
`;

const StyledTH = styled.th`
  color: #737373;
  font-size: 0.875rem;
  font-weight: normal;
  text-align: right;
  border-width: 1px 0;
  border-style: solid;
  border-color: #ccc;
  padding: 4px 10px;

  @media only screen and (min-width: 620px) {
    width: 1px;
    white-space: nowrap;
  }
`;

const StyledTD = styled.td`
  border-width: 1px 0;
  border-style: solid;
  border-color: #ccc;
  padding: 4px 10px;
`;
function InfoList({ name, data, lang }) {
  const title = typeof name === "string" ? translate(name, lang) : name;

  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledTable>
        <StyledTBody>
          {data.map((row_data, i) => (
            <StyledTR key={i}>
              <StyledTH>{translate(row_data.name, lang)}</StyledTH>
              <StyledTD>{row_data.content}</StyledTD>
            </StyledTR>
          ))}
        </StyledTBody>
      </StyledTable>
    </>
  );
}

export default InfoList;
