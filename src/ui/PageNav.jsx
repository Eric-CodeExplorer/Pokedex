import styled from "styled-components";
import { HashLink } from "react-router-hash-link";
import translate from "../util/dictionary";
import useLanguage from "../hooks/useLanguage";

const Container = styled.div`
  margin: 25px;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 5px;
  background-color: #e3f5fd;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
`;

const MyLink = styled.div`
  padding: 5px 15px;
  border-right: ${(props) =>
    props["data-last"] ? "unset" : "1px solid #dbdbdb"};
  cursor: pointer;
  color: var(--color-blue-700);
`;

function PageNav({ sections }) {
  const { lang } = useLanguage();
  return (
    <Container>
      <div style={{ padding: "5px 15px", fontWeight: "bold" }}>
        {translate("content", lang)}
      </div>
      {sections.map((section, i) => (
        <HashLink key={i} to={`#${section}`} smooth>
          <MyLink data-last={i === sections.length - 1}>
            {translate(section, lang)}
          </MyLink>
        </HashLink>
      ))}
    </Container>
  );
}

export default PageNav;
