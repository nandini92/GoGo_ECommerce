import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignInContext } from "./contexts/SignInContext";

import styled from "styled-components";
import * as ThemifyIcons from "react-icons/tfi";

const Header = ({ setEmail, setPassword }) => {
  // const { signedIn, setSignedIn } = useContext(SignInContext);

  const navigate = useNavigate();

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setSignedIn(false);
  //   setEmail("");
  //   setPassword("");
  //   navigate("/");
  // };

  return (
    <Wrapper>
      <NavigationLink to="/" end>
        <Logo>GO</Logo>
        <LogoSpan>GO</LogoSpan>
      </NavigationLink>
      <NavigationLink className="Cart" to="/cart" end>
        <ThemifyIcons.TfiShoppingCart style={{ fontSize: "1.5em" }} />
      </NavigationLink>
      {/* Deprecated Sign in handler */
      /* <SignInCartWrapper id="signIn&Cart">
        {signedIn ? (
          <>
            <UserDiv>
              <SignedInUser>Welcome {signedIn.firstName}</SignedInUser>
              <SignOut onClick={handleClick}>Log out</SignOut>
            </UserDiv>
            <CartDivSignedIn>
              <NavigationLink className="Cart" to="/cart" end>
                <ThemifyIcons.TfiShoppingCart />
                <Cart> Cart</Cart>
              </NavigationLink>
                <NavigationLink to={`/orders/${signedIn._id}`} end>Order History</NavigationLink>
            </CartDivSignedIn>
          </>
        ) : (
          <>
            <NavigationLinkSignIn to="/sign-in">Sign In</NavigationLinkSignIn>
              <CartDiv>
                <NavigationLink className="Cart" to="/cart" end>
                  <ThemifyIcons.TfiShoppingCart />
                  <Cart> Cart</Cart>
                </NavigationLink>
              </CartDiv>
          </>
        )}
      </SignInCartWrapper> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-dark-turquoise);
  padding: 1vw 3vw;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-turquoise);
  display: flex;
`;
const CartDiv = styled.div`
  display: flex;
  margin-left: 50px;
  align-items: flex-start;
`;

const CartDivSignedIn = styled.div`
  display: flex;
  margin-left: 50px;
  align-items: flex-start;
  flex-direction: column;
`;

const Logo = styled.div`
  font-family: "Play", sans-serif;
  font-weight: bold;
  font-size: 3rem;
`;

const LogoSpan = styled.span`
  font-family: "Play", sans-serif;
`;

const SignInCartWrapper = styled.div`
  display: flex;
`;

const SignedInUser = styled.div`
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  color: var(--color-dark-grey);
`;

const NavigationLinkSignIn = styled(NavLink)`
  text-decoration: none;
  color: var(--color-dark-grey);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-turquoise);
  }

  &.active {
    color: var(--color-turquoise);
  }
`;
const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignOut = styled.button`
  display: flex;
  border: none;
  justify-content: flex-start;
  background-color: var(--color-dark-turquoise);
  color: var(--color-dark-grey);
  font-size: 1rem;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: var(--color-turquoise);
  }
`;
export default Header;
