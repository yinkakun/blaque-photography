import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Wrapper from './wrapper';

const Header = () => {
  return (
    <StyledHeader>
      <HeaderWrapper>
        <HeaderTitle>
          <Link to="/">Blaqie</Link>
        </HeaderTitle>

        <HeaderNavList>
          <HeaderNavListItem>
            <Link to="/about">About</Link>
          </HeaderNavListItem>

          <HeaderNavListItem>
            <Link to="/work">Work</Link>
          </HeaderNavListItem>

          <HeaderNavListItem>
            <Link to="/contact">Contact</Link>
          </HeaderNavListItem>
        </HeaderNavList>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;

const HeaderNavList = ({ children }) => {
  return (
    <StyledNav>
      <StyledNavList>{children}</StyledNavList>
    </StyledNav>
  );
};

const HeaderNavListItem = ({ children }) => {
  return <StyledNavListItem>{children}</StyledNavListItem>;
};

const StyledHeader = styled.header`
  padding-top: 2rem;
`;

const HeaderWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  & a {
    text-transform: uppercase;
    text-transform: capitalize;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: 2rem;
    color: inherit;
  }

  @media screen and (max-width: 700px) {
    & a {
      font-size: 1.4rem;
    }
  }
`;

const StyledNav = styled.nav`
  position: static;
  padding: 0;
  background: transparent;
  backdrop-filter: unset;
`;

const StyledNavList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0;
  list-style-type: none;
`;

const StyledNavListItem = styled.li`
  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  @media screen and (max-width: 700px) {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }

  & a {
    color: inherit;
    font-family: 'IBM Plex Sans';
    text-transform: uppercase;
    font-size: 0.8rem;
    text-decoration: none;
    letter-spacing: 0.1rem;
  }

  @media screen and (max-width: 700px) {
    & a {
      font-size: 0.7rem;
    }
  }
`;
