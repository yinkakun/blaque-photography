import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { getYear } from 'date-fns';
import { XMasonry, XBlock } from 'react-xmasonry';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Work = ({ data }) => {
  const result = data.prismicImagecollection.data;

  const workData = {
    images: result.body[0].items,
    title: result.collection_title.text,
    year: getYear(new Date(result.date)),
  };

  const images = workData.images.map(({ image }) => {
    return (
      <XBlock>
        <Image fluid={image.fluid} />
      </XBlock>
    );
  });

  return (
    <Layout>
      <SEO title={workData.title} />
      <WorkWrapper>
        <Year>{workData.year}</Year>
        <Title
          initial={{ opacity: 0.5, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {workData.title}
        </Title>

        <Gallery>
          <XMasonry>{images}</XMasonry>
        </Gallery>
      </WorkWrapper>
    </Layout>
  );
};

export const query = graphql`
  query WorkQuery($uid: String!) {
    prismicImagecollection(uid: { eq: $uid }) {
      data {
        collection_title {
          text
        }
        body {
          ... on PrismicImagecollectionBodyGallery {
            items {
              image {
                alt
                fluid {
                  ...GatsbyPrismicImageFluid
                }
              }
            }
          }
        }
        date
      }
    }
  }
`;

export default Work;

const WorkWrapper = styled.section`
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1;

  @media screen and (max-width: 700px) {
    & {
      font-size: 3rem;
    }
  }
`;
const Year = styled.span`
  font-size: 1rem;
`;

const Gallery = styled.div`
  margin-top: 2rem;
`;

const Image = styled(Img)`
  margin: 0.5rem;
`;
