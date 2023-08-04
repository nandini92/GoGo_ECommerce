import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./contexts/CartContext";
import { DataContext } from "./contexts/DataContext";
import SimilarItems from "./assets/SimilarItems";
import { SpinnerDiamond } from "spinners-react";

const ItemPage = () => {
  // ID is item id received from home page
  const id = useParams().id;

  // States to be used
  const [item, setItem] = useState();
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [cartCount, setCartCount] = useState(1);

  // Variables pulled from Contexts
  const { companies } = useContext(DataContext);
  const {
    cart,
    actions: { createNewCart, addItemToCart },
  } = useContext(CartContext);

  // GET Item information based on item id
  useEffect(() => {
    companies &&
      fetch(`/item/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Set Company Name
          let companyName = null;
          companies.forEach((company) => {
            company._id === data.data.companyId && (companyName = company.name);
          });
          setItem({ ...data.data, company: companyName });
        })
        .catch((err) => console.log(err));
  }, [id, companies]);

  // Create an array with quantity to be selected
  let stockArr = [];
  for (let i = 1; i <= item?.numInStock; i++) {
    stockArr.push(i);
  }

  // Function to determine if there are enough Items in stock to sell
  const handleItemCount = () => {
    if (cartCount + quantitySelected <= item.numInStock) {
      setCartCount((cartCount) => cartCount + quantitySelected);
    }
  };

  // Function to handle cart creation and to add items to cart
  const handleCart = () => {
    if (!cart) {
      createNewCart().then((res) =>
        addItemToCart({
          product: item._id,
          quantity: quantitySelected,
          cartId: res,
        })
      );
    } else {
      addItemToCart({
        product: item._id,
        quantity: quantitySelected,
        cartId: cart,
      });
    }
  };

  console.log(window.innerWidth);

  return (
    <Body>
      {!item ? (
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
          <ItemWrapper>
            <Image src={item.imageSrc} alt={item.name} />
            <Details>
              <Title>{item.name}</Title>
              <Line>
                <Label>Company</Label>
                <span>{item.company}</span>
              </Line>
              <Line>
                <Label>Category</Label>
                <span>{item.category}</span>
              </Line>
              <Line>
                {item.numInStock ? (
                  <Availability inStock>In Stock</Availability>
                ) : (
                  <Availability>Out of Stock</Availability>
                )}
              </Line>
              <Line>
                <Label htmlFor="quantity">Quantity:</Label>
                <Select
                  name="quantity"
                  id="quantity"
                  onChange={(e) => setQuantitySelected(Number(e.target.value))}
                >
                  {stockArr.map((i) => i <= 5 && <option key={i}>{i}</option>)}
                </Select>
              </Line>
              <Error
                errorDisplay={
                  quantitySelected + cartCount > item.numInStock ? true : false
                }
              >
                Insufficient stock to add to cart
              </Error>
              <Button
                type="submit"
                inStock={
                  quantitySelected + cartCount > item.numInStock ? false : true
                }
                onClick={() => {
                  handleItemCount();
                  handleCart();
                }}
                disabled={
                  quantitySelected + cartCount > item.numInStock ? true : false
                }
              >
                Add to cart
              </Button>
            </Details>
          </ItemWrapper>
          {
            window.screen.width > 412  && 
            <SimilarItems category={item.category} displayedItem={item} />
          }
        </>
      )}
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3vh 3vw;
  height: 100vh;
`;

const Spinner = styled.span`
  font-size: 3rem;
  justify-self: center;
  align-self: center;

  @media (max-width: 412px) {
    padding: 0;
  }
`;

const ItemWrapper = styled.div`
  box-shadow: 0 0 20px 5px var(--color-grey);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3vh 3vw;
  width: 50%;
  margin-bottom: 3vh;

  @media (max-device-width: 412px) {
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    max-width: 100%;
    box-shadow: none;
  }
`;
const Image = styled.img`
  max-height: 12rem;
  object-fit: cover;
  border-radius: 10px;
  cursor: zoom-in;
`;
const Details = styled.div`
  background-color: var(--color-light-grey);
  border-radius: 10px;
  padding: 3vh 3vw;
  max-width: 65%;

  @media (max-device-width: 412px) {
    max-width: 100%;
  }
`;
const Title = styled.div`
  color: var(--color-dark-grey);
  font-weight: 400;
  text-align: left;
  padding-bottom: 15px;
  font-size: 1.2rem;
`;
const Line = styled.div`
  display: flex;
  text-align: left;
  align-items: baseline;
`;
const Label = styled.span`
  font-weight: bold;
  width: 100px;
  padding: 5px 0;
  align-items: baseline;
`;
const Select = styled.select`
  cursor: pointer;
`;
const Availability = styled.div`
  color: ${(props) => (props.inStock ? "green" : `var(--color-dark-grey)`)};
  font-size: 1rem;
  padding: 15px 0 15px 0;
`;
const Error = styled.div`
  color: red;
  padding: 10px 0px;
  visibility: ${(props) => !props.errorDisplay && "hidden"};
`;
const Button = styled.button`
  visibility: ${(props) => !props.inStock && "hidden"};
  color: white;
  border: none;
  border-radius: 15px;
  background-color: var(--color-dark-turquoise);
  font-size: 1rem;
  line-height: 18px;
  padding: 5px 30px;
  cursor: pointer;

  &:hover {
    border-radius: 15px;
    background-color: var(--color-turquoise);
    color: var(--color-dark-grey);
  }
`;

export default ItemPage;
