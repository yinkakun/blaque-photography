import React from 'react';
import Wrapper from './wrapper';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterWrapper>
        <NavList>
          <NavListItem>
            <Link to="/">Home</Link>
          </NavListItem>

          <NavListItem>
            <Link to="/about">About</Link>
          </NavListItem>

          <NavListItem>
            <Link to="/work">Work</Link>
          </NavListItem>

          <NavListItem>
            <Link to="/contact">Contact</Link>
          </NavListItem>
        </NavList>

        <p>&#169; {new Date().getFullYear()} Contrast Photography</p>
      </FooterWrapper>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  font-family: 'IBM Plex Sans';
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 0.8rem;
`;

const FooterWrapper = styled(Wrapper)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const NavListItem = styled.li`
  &:not(:last-of-type) {
    margin-right: 2rem;
  }

  & a {
    text-decoration: none;
    text-transform: uppercase;
    color: inherit;
    letter-spacing: 0.1rem;
  }
`;
