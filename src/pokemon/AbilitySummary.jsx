import styled from "styled-components";
import { cleanText, getName } from "../util/helpers";
import translate from "../util/dictionary";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAbility = styled.div`
  display: flex;
  flex-direction: column;
`;

const AbilityTitle = styled.h4``;

const AbilityText = styled.div`
  font-size: small;
`;

const HiddenTag = styled.span`
  font-size: small;
  color: #737373;
  display: inline;
`;

function getText(textes, lang) {
  for (let i = textes.length - 1; i >= 0; i--) {
    if (textes[i].language.name === lang) {
      return cleanText(textes[i].flavor_text);
    }
  }

  if (lang !== "en") {
    for (let i = textes.length - 1; i >= 0; i--) {
      if (textes[i].language.name === "en") {
        return cleanText(textes[i].flavor_text);
      }
    }
  }

  console.error("Can't find description for the ability");
  return "";
}

function Ability({ ability, lang }) {
  const name = getName(ability.names, lang);
  const textes = ability.flavor_text_entries;
  const text = getText(textes, lang);

  // for (let i = textes.length - 1; i >= 0; i--) {
  //   if (textes[i].language.name === lang) {
  //     text = cleanText(textes[i].flavor_text);
  //     break;
  //   }
  // }
  // console.log(`Log from Ability: text=${text}`);
  const isHidden = ability.is_hidden;
  return (
    <StyledAbility>
      <AbilityTitle>
        <span>{name}</span>{" "}
        {isHidden && (
          <HiddenTag>--{translate("hiddenAbility", lang)}--</HiddenTag>
        )}
      </AbilityTitle>
      <AbilityText>{text}</AbilityText>
    </StyledAbility>
  );
}

function AbilitySummary({ abilities, lang }) {
  return (
    <Container>
      {abilities
        .sort((a, b) => a.slot - b.slot)
        .map((ability, i) => (
          <Ability ability={ability} key={i} lang={lang} />
        ))}
    </Container>
  );
}

export default AbilitySummary;
