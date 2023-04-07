import { useContext, useEffect, useState } from "react";
import { DataContext } from "./contexts/DataContext";

import Item from "./assets/Item";
import Filter from "./assets/Filter";

import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { SpinnerDiamond } from "spinners-react";

const Home = () => {
  const { items, companies } = useContext(DataContext);

  // Set array to contain items which have been filtered
  const [filteredItems, setFilteredItems] = useState("");

  // Initial render contains all items
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // item offset is used by react-paginate to determine starting item id.
  const [itemOffset, setItemOffset] = useState(0);

  // Set 51 items per page
  const itemsPerPage = 51;
  // End offset will determine which item to end page display at.
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredItems?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems?.length / itemsPerPage);

  //Function to change pages
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  return (
    <Wrapper>
      {!filteredItems ? (
        <Spinner>
          <SpinnerDiamond
            size={90}
            thickness={97}
            speed={102}
            color="rgba(172, 139, 57, 1)"
            secondaryColor="rgba(57, 131, 172, 1)"
          />
        </Spinner>
      ) : (
        <>
          { // Only display filter as column for bigger screens 
          window.screen.width  > 412 && (
            <Filter
              items={items}
              companies={companies}
              setFilteredItems={setFilteredItems}
            />
          )}
          <HomeContainer>
            <Grid>
              {currentItems.map((item) => {
                return <Item key={item._id} item={item} />;
              })}
            </Grid>
            <Pagination
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </HomeContainer>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 3vh 3vw;
  display: flex;
  height: 100vh;
`;

const Spinner = styled.span`
  font-size: 3rem;
  justify-self: center;
  align-self: center;
  padding-left: calc(50% - 3rem);

  @media (max-width: 412px) {
    flex-direction: column;
    padding-top: calc(100% - 3rem);
    padding-left: 0;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 3%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 2vh 2vw;
  margin-bottom: 3%;

  @media (max-width: 912px) {
    display: flex;
    flex-direction: column;
  }
`;

const Pagination = styled(ReactPaginate)`
  align-self: center;

  li {
    display: inline-block;
    box-shadow: 0 0 8px 0px var(--color-grey);
    cursor: pointer;
    margin: 0 1vh;
    border-radius: 50%;

    a {
      padding: 5px 4px;
      outline: none;
    }

    &:hover {
      background: var(--color-turquoise);
      outline: none;
    }

    &:active {
      background: var(--color-turquoise);
      outline: none;
    }
  }
`;

export default Home;
