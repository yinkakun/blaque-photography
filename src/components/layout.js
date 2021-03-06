import React, { Fragment } from 'react';
import styled from 'styled-components';
import GlobalStyles from '../global-styles';
import Header from './header';
import Footer from './footer';
import Wrapper from './wrapper';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <GlobalStyles />
      <LayoutWrapper>
        <Header />
        <motion.main
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Wrapper>{children}</Wrapper>
        </motion.main>
        <Footer />
      </LayoutWrapper>
    </Fragment>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding-left: 1rem;
  padding-right: 1rem;
`;
