import styled from "styled-components";

const Container = styled.div`
  border-radius: 50%;
  background-color: ${({ "data-bg_color": bg_color }) => bg_color};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 2.2em;
  height: 2.2em;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DamageIcon({ dmg_class }) {
  let image, bg_color;
  if (dmg_class === "physical") {
    image = "/src/assets/damage_class_icons/physical.png";
  } else if (dmg_class === "special") {
    image = "/src/assets/damage_class_icons/special.png";
  } else if (dmg_class === "status") {
    image = "/src/assets/damage_class_icons/status.png";
  } else {
    throw Error(`Unknown Damage Class: ${dmg_class}`);
  }

  bg_color = "#f9ffff";
  return (
    <Container data-bg_color={bg_color}>
      <img src={image} />
    </Container>
  );
}

export default DamageIcon;
