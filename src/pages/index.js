import React, { useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import SelectedWorks from '../components/selected-works';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const slideUpMotion = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hidden: { opacity: 0, y: 50 },
};

const slideUpContainerMotion = {
  show: {
    transition: {
      ease: 'easeOut',
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const HomePage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroSection />
      <SelectedWorks />
      <CTASection />
    </Layout>
  );
};

export default HomePage;

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  const data = useStaticQuery(graphql`
    query {
      prismicHomepage {
        data {
          hero_title {
            text
          }
          hero_subtitle {
            text
          }
        }
      }
    }
  `);

  const result = data.prismicHomepage.data;

  return (
    <StyledHeroSection>
      <motion.div
        ref={ref}
        variants={slideUpContainerMotion}
        initial="hidden"
        animate={controls}
      >
        <HeroSectionTitle variants={slideUpMotion}>
          {result.hero_title.text}
        </HeroSectionTitle>
        <HeroSectionSubtitle variants={slideUpMotion}>
          {result.hero_subtitle.text}
        </HeroSectionSubtitle>
      </motion.div>
    </StyledHeroSection>
  );
};

const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  return (
    <CTAWrapper>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={slideUpContainerMotion}
      >
        <CTAHeading variants={slideUpMotion}>
          Let's take some amazing photos together
        </CTAHeading>

        <CTALinkWrapper variants={slideUpMotion}>
          <Link to="/contact">Get In Touch</Link>
        </CTALinkWrapper>
      </motion.div>
    </CTAWrapper>
  );
};

const StyledHeroSection = styled.section`
  padding-top: 6rem;
  padding-bottom: 9rem;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroSectionTitle = styled(motion.h1)`
  font-size: 6rem;
  text-transform: capitalize;
  line-height: 1;
  display: flex;
  flex-direction: column;
  max-width: 10ch;

  @media screen and (max-width: 700px) {
    & {
      font-size: 3rem;
    }
  }
`;

const HeroSectionSubtitle = styled(motion.p)`
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-top: 1rem;

  @media screen and (max-width: 700px) {
    & {
      font-size: 1rem;
    }
  }
`;

const CTAWrapper = styled.section`
  max-width: 40rem;
  padding-top: 9rem;
  padding-bottom: 6rem;
`;

const CTAHeading = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1.1;

  @media screen and (max-width: 700px) {
    & {
      font-size: 1.5rem;
    }
  }
`;

const CTALinkWrapper = styled(motion.div)`
  & a {
    font-size: 1.5rem;
    margin-top: 2rem;
    color: inherit;
    display: inline-block;
    text-decoration: none;
    padding: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border: 2px solid rgba(45, 51, 74, 0.796);
    transition-timing-function: ease-out;
    transition-property: color, background, border;
    transition-duration: 0.25s;
  }

  & a:hover {
    color: rgb(248, 248, 255);
    background: #2d334a;
    border: 2px solid #2d334a;
  }

  @media screen and (max-width: 700px) {
    & a {
      font-size: 1rem;
    }
  }
`;
