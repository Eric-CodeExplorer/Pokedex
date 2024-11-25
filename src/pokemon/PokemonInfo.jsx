import styled from "styled-components";
import SectionContainer from "./SectionContainer";
import VarietySlider from "./VarietySlider";
import { getGenera, getName } from "../util/helpers";
import InfoList from "./InfoList";
import TypeUI from "./TypeUI";
import AbilitySummary from "./AbilitySummary";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import EVGain from "./EVGain";
import EggGroups from "./EggGroups";
import GenderRate from "./GenderRate";
import { translateGrowthRate } from "../util/dictionary";

const Container = styled.div`
  width: 100%;
  padding: 0 30px;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }

  &.varieties {
    display: flex;
    align-items: center;
  }
`;

function NameTag({ names, forms, lang, is_default }) {
  return (
    <>
      <div>{getName(names, lang)}</div>
      {!is_default && forms.length > 0 && (
        <div className="form">{getName(forms[0].form_names, lang)}</div>
      )}
    </>
  );
}

function PokemonInfo({
  images,
  index,
  setIndex,
  dexId,
  capture_rate,
  gender_rate,
  genera = "",
  growth_rate,
  hatch_counter,
  names,
  egg_groups,
  variety,
  lang,
}) {
  const { gens, eggGroups: eggGroup_list } = useContext(AppContext);
  const generation = variety.forms[0].generation;

  const infoSectionData = [
    {
      name: "nationalNo",
      content: (
        <div>
          <span>{dexId}</span>
        </div>
      ),
    },
    {
      name: "types",
      content: (
        <TypeUI types={variety.types.map((t) => t.type.name)} lang={lang} />
      ),
    },
    {
      name: "abilities",
      content: <AbilitySummary abilities={variety.abilities} lang={lang} />,
    },
    { name: "height", content: `${variety.height / 10} m` },
    { name: "weight", content: `${variety.weight / 10} kg` },
    { name: "generation", content: getName(gens[generation].names, lang) },
    { name: "genera", content: getGenera(genera, lang) },
  ];

  const trainingSectionData = [
    { name: "captureRate", content: capture_rate },
    {
      name: "growthRate",
      content: translateGrowthRate(growth_rate.name, lang),
    },
    { name: "baseExperience", content: variety.base_experience },
    { name: "ev", content: <EVGain stats={variety.stats} lang={lang} /> },
  ];

  const breedingSectionData = [
    { name: "eggCycle", content: hatch_counter },
    {
      name: "eggGroups",
      content: <EggGroups egg_groups={egg_groups} lang={lang} />,
    },
    {
      name: "genderRate",
      content: <GenderRate rate={gender_rate} lang={lang} />,
    },
  ];

  return (
    <SectionContainer id="info">
      <Container className="varieties">
        <VarietySlider images={images} index={index} setIndex={setIndex} />
      </Container>
      <Container>
        <InfoList
          name={
            <NameTag
              names={names}
              lang={lang}
              forms={variety.forms}
              is_default={variety.is_default}
            />
          }
          data={infoSectionData}
          lang={lang}
        />
      </Container>
      <Container>
        <InfoList name="training" data={trainingSectionData} lang={lang} />
      </Container>
      <Container>
        <InfoList name="breeding" data={breedingSectionData} lang={lang} />
      </Container>
    </SectionContainer>
  );
}

export default PokemonInfo;
