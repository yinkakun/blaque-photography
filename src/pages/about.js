import React, { useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const slideUpMotion = {
  show: {
    opacity: 1,
    y: 0,
  },
  hidden: { opacity: 0, y: 50 },
};

const slideUpContainerMotion = {
  show: {
    transition: {
      ease: 'easeOut',
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: '-100px 0px',
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);

  const data = useStaticQuery(graphql`
    query {
      prismicAbout {
        data {
          heading {
            text
          }
          image {
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
          body {
            html
          }
        }
      }
    }
  `);

  const result = data.prismicAbout.data;

  return (
    <Layout>
      <SEO title="About" />
      <AboutSectionWrapper
        ref={ref}
        variants={slideUpContainerMotion}
        initial="hidden"
        animate={controls}
      >
        <AboutCopy>
          <AboutTitle variants={slideUpMotion}>
            {result.heading.text}
          </AboutTitle>
          <motion.div
            variants={slideUpMotion}
            dangerouslySetInnerHTML={{ __html: result.body.html }}
          />
        </AboutCopy>

        <AboutImageWrapper variants={slideUpMotion}>
          <Img fluid={result.image.fluid} />
        </AboutImageWrapper>
      </AboutSectionWrapper>
    </Layout>
  );
};

export default About;

const AboutSectionWrapper = styled(motion.section)`
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;

  & p {
    font-family: 'IBM Plex Sans';
  }

  @media screen and (max-width: 700px) {
    & {
      flex-direction: column-reverse;
      padding-bottom: 3rem;
    }
  }
`;

const AboutTitle = styled(motion.h1)`
  font-size: 3rem;
  line-height: 1;
  text-transform: uppercase;

  @media screen and (max-width: 700px) {
    & {
      font-size: 2rem;
    }
  }
`;

const AboutCopy = styled.div`
  max-width: 50ch;

  & * + * {
    margin-top: 1rem;
  }

  @media screen and (max-width: 700px) {
    & {
      margin-top: 3rem;
      font-size: 1.1rem;
    }
  }
`;

const AboutImageWrapper = styled(motion.div)`
  overflow: hidden;
  height: 100%;
  max-width: 250px;
  max-height: 300px;
  width: 100%;
  border-color: white;
  border-width: 0.5rem;
  border-style: solid;
  border-bottom-width: 2rem;

  @media screen and (max-width: 700px) {
    & {
      max-width: none;
      max-height: 60vh;
    }
  }
`;
