import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../pokedex/Card";
import PageButtons from "./PageButtons";

const ITEMS_PER_PAGE = 50;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media only screen and (min-width: 768px) {
    gap: 20px;
  }
`;

const ItemList = styled.ul`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  justify-items: center;
  gap: 15px;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 20px;
  }
`;

function Pages({ items, lang }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [paginatedItems, setPaginatedItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Reset to the first page
  }, [items]);

  useEffect(() => {
    setPaginatedItems(
      items.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    );
  }, [items, currentPage]);
  return (
    <Container>
      {totalPages > 1 && (
        <PageButtons
          currentPage={currentPage}
          totoalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <ItemList>
        {paginatedItems.map((item, i) => (
          <Card data={item} lang={lang} key={i} />
        ))}
      </ItemList>

      {totalPages > 1 && (
        <PageButtons
          currentPage={currentPage}
          totoalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Container>
  );
}

export default Pages;
