import React, { useEffect } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { getYear } from 'date-fns';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'gatsby';

const imageMotion = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
  hidden: { opacity: 0, scale: 0.9 },
};

const linkMotion = {
  visible: {
    opacity: 0.8,
    letterSpacing: '0.1em',
    transition: { duration: 0.6 },
  },
  hidden: { opacity: 1, letterSpacing: '-0.02em' },
};

const listItemMotion = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hidden: { opacity: 0, y: 50 },
};

const SelectedWorksListItem = ({ id, title, year, image }) => {
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
    <SelectedWorksListItemWrapper
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={listItemMotion}
    >
      <SelectedWorksYear>{year}</SelectedWorksYear>

      <SelectedWorksListLinkWrapper
        initial="hidden"
        animate="hidden"
        whileHover="visible"
        variants={linkMotion}
      >
        <Link to={`/work/${id}`}>{title}</Link>

        <SelectedWorksListImageWrapper>
          <motion.div variants={imageMotion}>
            <SelectedWorksListImage fluid={image.fluid} />
          </motion.div>
        </SelectedWorksListImageWrapper>
      </SelectedWorksListLinkWrapper>
    </SelectedWorksListItemWrapper>
  );
};

const SelectedWorks = () => {
  const data = useStaticQuery(graphql`
    query {
      allPrismicImagecollection(limit: 6) {
        nodes {
          data {
            collection_title {
              text
            }
            date
            main_image {
              alt
              fluid {
                ...GatsbyPrismicImageFluid
              }
            }
          }
          uid
        }
      }
    }
  `);

  const selectedWorksData = data.allPrismicImagecollection.nodes.map(
    ({ uid, data }) => {
      return {
        id: uid,
        title: data.collection_title.text,
        year: getYear(new Date(data.date)),
        image: {
          alt: data.main_image.alt,
          fluid: data.main_image.fluid,
        },
      };
    }
  );

  const selectedWorksListItem = selectedWorksData.map(
    ({ id, title, year, image }) => {
      return (
        <SelectedWorksListItem
          key={id}
          id={id}
          title={title}
          year={year}
          image={image}
        />
      );
    }
  );

  return (
    <section>
      <SelectedWorksHeader>Selected Work</SelectedWorksHeader>

      <SelectedWorksList>{selectedWorksListItem}</SelectedWorksList>

      <SelectedWorksLink to="/work">All Projects</SelectedWorksLink>
    </section>
  );
};

export default SelectedWorks;

const SelectedWorksHeader = styled.h1`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-family: 'IBM Plex Sans';
`;

const SelectedWorksList = styled.ul`
  padding: 0;
  list-style: none;
  width: fit-content;
`;

const SelectedWorksListItemWrapper = styled(motion.li)`
  font-size: 4rem;
  margin-top: 5rem;
  line-height: 1;
  display: flex;
  align-items: center;

  @media screen and (max-width: 700px) {
    & {
      font-size: 2rem;
    }
  }
`;

const SelectedWorksListLinkWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;

  & a {
    color: inherit;
    z-index: 1;
    position: relative;
    text-decoration: none;
  }
`;

const SelectedWorksListImageWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const SelectedWorksListImage = styled(Img)`
  width: 25vw;
  height: 25vw;
`;

const SelectedWorksLink = styled(Link)`
  text-transform: uppercase;
  text-decoration: underline;
  color: inherit;
  font-family: 'IBM Plex Sans';
  margin-top: 2.5rem;
  font-size: 0.8rem;
  display: inline-block;
  letter-spacing: 0.1em;
`;

const SelectedWorksYear = styled.span`
  font-size: 0.8rem;
  font-family: 'IBM Plex Sans';
  padding-right: 2rem;
`;
