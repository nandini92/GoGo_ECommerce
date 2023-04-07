import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <ItemContainer id="itemContainer" to={`/item/${item._id}`}>
      <Image src={item.imageSrc} alt="Product" />
      <TextWrapper>
        {item.numInStock >= 1 ? (
          <Price price={item.price}>{item.price}</Price>
        ) : (
          <OutOfStock>Out of Stock</OutOfStock>
        )}
        <Name>{item.name}</Name>
      </TextWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0px var(--color-grey);
  border-radius: 5%;
  padding: 10%;
  height: 30vh;
  text-decoration: none;

  @media (max-width: 912px) {
    flex-direction: row;
    height: 15vh;
    justify-content: space-between;

  }
`;

const Image = styled.img`
    max-height: 60%;
    width: 100%;
    max-width: 140px;

    @media (max-width: 820px) {
      width: 30%;
      max-height: 100%;
  }
`;

const TextWrapper = styled.div`
  text-align: center;

  * {
    margin: 1.5vh 0;
  }

  @media (max-width: 912px) {
      width: 70%;
      margin-left: 2vw;
  }
`;

const Name = styled.div`
  color: var(--color-dark-grey);
  text-align: center;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

const Price = styled.div`
  color: var(--color-dark-grey);
  font-style: italic;
`;

const OutOfStock = styled.p`
  color: var(--color-grey);
`;
export default Item;
