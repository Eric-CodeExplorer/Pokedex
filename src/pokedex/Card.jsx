import styled from "styled-components";
import { Link } from "react-router-dom";
import { getName } from "../util/helpers";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 90px;
  width: 60px;

  @media only screen and (min-width: 768px) {
    height: 180px;
    width: 120px;
  }
  border: 1px solid var(--color-grey-300);
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  user-select: none;
  transition: all 0.2s linear;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-bar);

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.1);
  }
`;

const Image = styled.div`
  width: 48px;
  height: 48px;
  object-fit: contain;
  @media only screen and (min-width: 768px) {
    width: 96px;
    height: 96px;
  }
  border-radius: 50%;
  background-color: var(--color-grey-pokeball);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Name = styled.div`
  font-size: 8px;
  @media only screen and (min-width: 768px) {
    font-size: medium;
  }
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  img {
    width: 10px;
    height: 10px;
    @media only screen and (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`;

function Card({ data, lang }) {
  const pokemon_img = data.image;
  if (pokemon_img === null) return null;
  return (
    <Link to={`/${lang}/pokemon/${data.dexId}`}>
      <Container>
        <Image>
          <img src={pokemon_img} alt="img" />
        </Image>
        <Info>
          <Name>{getName(data.names, lang)}</Name>
          <Types>
            {data.types.map((type, i) => (
              <img key={i} src={`/src/assets/type_icons/${type}.png`} />
            ))}
          </Types>
        </Info>
      </Container>
    </Link>
  );
}

export default Card;
