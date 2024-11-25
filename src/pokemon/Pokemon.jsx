import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { getDefaultVarietyIndex, isPromise } from "../util/helpers";
import getPokemonData from "./getPokemonData";
import { Suspense, useState } from "react";
import styled from "styled-components";
import PokemonInfo from "./PokemonInfo";
import PageNav from "../ui/PageNav";
import PokemonStats from "./PokemonStats";
import PokemonMoves from "./PokemonMoves";
import LoaderFullPage from "../ui/LoaderFullPage";
import useLanguage from "../hooks/useLanguage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap;
`;

function Pokemon() {
  const { dexId } = useParams();
  const { lang } = useLanguage();
  const [currentVarietyIndex, setCurrentVarietyIndex] = useState(null); // getDefaultVarietyIndex(varieties)
  const { pokedata } = useLoaderData();

  const sections = ["info", "basestats", "moves"];
  return (
    <Container>
      <Suspense fallback={<LoaderFullPage />}>
        <Await
          resolve={pokedata}
          errorElement={<p>Error when loading pokemon</p>}
        >
          {(pokedata) => {
            const varieties = pokedata.varieties;
            const defaultIndex = getDefaultVarietyIndex(pokedata.varieties);
            const index =
              currentVarietyIndex === null ? defaultIndex : currentVarietyIndex;

            // const images = varieties.map((v) => v.forms[0].front_default);
            const images = varieties.map((v) => {
              // console.log(v.forms);
              const image = v.forms[0].front_default;
              if (image === null) {
                return varieties[getDefaultVarietyIndex(varieties)].forms[0]
                  .front_default;
              }
              return image;
            });
            return (
              <>
                <PageNav sections={sections} />
                <PokemonInfo
                  images={images}
                  index={index}
                  setIndex={setCurrentVarietyIndex}
                  dexId={dexId}
                  capture_rate={pokedata.capture_rate}
                  gender_rate={pokedata.gender_rate}
                  genera={pokedata.genera}
                  growth_rate={pokedata.growth_rate}
                  hatch_counter={pokedata.hatch_counter}
                  names={pokedata.names}
                  egg_groups={pokedata.egg_groups}
                  variety={varieties[index]}
                  lang={lang}
                />
                <PokemonStats stats={varieties[index].stats} lang={lang} />

                <PokemonMoves data={varieties[index].moves} lang={lang} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </Container>
  );
}

export async function loader({ params }) {
  const { dexId } = params;
  return defer({
    pokedata: getPokemonData(dexId),
  });
}

export default Pokemon;
