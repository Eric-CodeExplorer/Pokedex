import styled, { keyframes, css } from "styled-components";
import SectionContainer from "./SectionContainer";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { getName } from "../util/helpers";
import { useInView } from "react-intersection-observer";
import translate from "../util/dictionary";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  @media only screen and (min-width: 1025px) {
    width: 75%;
  }
`;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 0.2fr 2fr;
  grid-template-rows: repeat(7, 1fr);
  border: 1px solid;
  font-size: 1.2em;
  line-height: 1.2em;
  align-items: center;
  border-radius: 15px;
  border-color: #737373;
`;

const TableCell = styled.div`
  padding: 0.5em;
  text-align: ${(props) => (props["data-left"] ? "right" : "left")};
`;

const expandWidth = (percent) => keyframes`
  from {
    width: 0%; /* Start width (x) */
  }
  to {
    width: ${percent}%; /* Final width (y) */
  }
`;

const StyledStatBar = styled.div`
  border-radius: 10px;
  background-color: ${(props) => `var(${props["data-color"]})`};
  /* width: ${(props) => `${props["data-percent"]}%`}; */
  height: 1em;
  /* animation: ${({ "data-percent": percent }) =>
    css`
      ${expandWidth(percent)} 1s ease forwards
    `}; */

  animation: ${({ "data-inview": inView, "data-percent": percent }) =>
    inView
      ? css`
          ${expandWidth(percent)} 0.7s ease forwards
        `
      : "none"};
`;

const StyledTitle = styled.h4`
  font-size: 1.5em;
  font-weight: normal;
  padding: 10px;
`;

function getBarColor(value) {
  if (value < 30) {
    return "--color-stat-1";
  } else if (value >= 30 && value < 60) {
    return "--color-stat-2";
  } else if (value >= 60 && value < 90) {
    return "--color-stat-3";
  } else if (value >= 90 && value < 120) {
    return "--color-stat-4";
  } else if (value >= 120) {
    return "--color-stat-5";
  } else {
    return "--color-stat-0";
  }
}

function StatBar({ value }) {
  const MAX = 250;
  const percentage = (value * 100) / MAX;
  // console.log(`${value},${percentage}`);

  const { ref, inView } = useInView();
  return (
    <StyledStatBar
      data-percent={percentage}
      data-inview={inView}
      ref={ref}
      data-color={getBarColor(value)}
    />
  );
}

function StatsRow({ stat, lang }) {
  const { stats } = useContext(AppContext);
  const value = stat.base_stat;
  // console.log(value);
  const name = getName(stats[stat.stat.name].names, lang);
  return (
    <>
      <TableCell data-left={true}>{name}</TableCell>
      <TableCell data-left={true}>{value}</TableCell>

      <TableCell data-left={false}>
        <StatBar value={value} />
      </TableCell>
    </>
  );
}

function StatsTable({ stats, lang }) {
  const stats_sum = stats.reduce((prev, cur) => cur.base_stat + prev, 0);
  return (
    <StyledTable>
      {stats.map((stat, i) => (
        <StatsRow key={i} stat={stat} lang={lang} />
      ))}
      <TableCell data-left={true}>{translate("total", lang)}</TableCell>
      <TableCell data-left={true}>{stats_sum}</TableCell>
    </StyledTable>
  );
}

function PokemonStats({ stats, lang }) {
  return (
    <SectionContainer id="basestats">
      <Container>
        <StyledTitle>{translate("basestats", lang)}</StyledTitle>
        <StatsTable stats={stats} lang={lang} />
      </Container>
    </SectionContainer>
  );
}

export default PokemonStats;
