import React, { useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { getYear } from 'date-fns';
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
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const SelectedWorksItem = ({ id, title, year, image }) => {
  return (
    <WorksGalleryItemWrapper
      variants={slideUpMotion}
      whileTap={{ scale: 0.96 }}
    >
      <Link to={`/work/${id}`}>
        <WorksGalleryImage fluid={image.fluid} />
        <Title>{title}</Title>
        <Year>{year}</Year>
      </Link>
    </WorksGalleryItemWrapper>
  );
};

const Works = () => {
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
    query Works {
      allPrismicImagecollection {
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

  const worksData = data.allPrismicImagecollection.nodes.map(
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

  const worksGallery = worksData.map(({ id, title, year, image }) => {
    return (
      <SelectedWorksItem
        key={id}
        id={id}
        title={title}
        year={year}
        image={image}
      />
    );
  });

  return (
    <Layout>
      <SEO title="Work" />
      <WorksSectionWrapper
        ref={ref}
        variants={slideUpContainerMotion}
        initial="hidden"
        animate={controls}
      >
        <WorksSectionTitle variants={slideUpMotion}>
          Featured Works
        </WorksSectionTitle>
        <WorksGallery>{worksGallery}</WorksGallery>
      </WorksSectionWrapper>
    </Layout>
  );
};

export default Works;

const WorksSectionWrapper = styled(motion.section)`
  padding-top: 5rem;
`;

const WorksSectionTitle = styled(motion.h1)`
  font-size: 5rem;
  text-transform: uppercase;

  @media screen and (max-width: 700px) {
    & {
      font-size: 3rem;
    }
  }
`;

const WorksGallery = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 5rem;

  @media screen and (max-width: 700px) {
    & {
      grid-template-columns: 1fr;
    }
  }
`;

const WorksGalleryItemWrapper = styled(motion.li)`
  & a {
    color: inherit;
    text-decoration: none;
  }
`;

const Title = styled.p`
  font-size: 2.5rem;
  text-transform: uppercase;
`;

const Year = styled.p`
  font-size: 0.8rem;
  font-family: 'IBM Plex Sans';
`;

const WorksGalleryImage = styled(Img)`
  height: 320px;
  max-width: 320px;

  &:hover img {
    transform: scale(1.3) translate(-1%, -3%);
  }

  & img {
    transition: transform 1200ms ease-in !important;
    transform: scale(1.2) translate(5%, 0);
    will-change: transform;
  }
`;
