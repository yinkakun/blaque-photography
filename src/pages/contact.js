import React, { useEffect } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
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
      staggerChildren: 0.2,
      duration: 0.3,
    },
  },
};

const Contact = () => {
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
      prismicContact {
        data {
          email {
            text
          }
          heading {
            text
          }
          instagram_username {
            text
          }
          phone_number {
            text
          }
        }
      }
    }
  `);

  const result = data.prismicContact.data;

  return (
    <Layout>
      <SEO title="Contact" />
      <ContactWrapper
        ref={ref}
        variants={slideUpContainerMotion}
        initial="hidden"
        animate={controls}
      >
        <ContactTitle variants={slideUpMotion}>
          {result.heading.text}
        </ContactTitle>

        <ContactList>
          <ContactListItem variants={slideUpMotion}>
            <ContactListHeading>Whatsapp & Call</ContactListHeading>
            <ContactListLink href={`tel:${result.phone_number.text}`}>
              {result.phone_number.text}
            </ContactListLink>
          </ContactListItem>

          <ContactListItem variants={slideUpMotion}>
            <ContactListHeading>Email</ContactListHeading>
            <ContactListLink href={`mailto:${result.email.text}`}>
              {result.email.text}
            </ContactListLink>
          </ContactListItem>

          <ContactListItem variants={slideUpMotion}>
            <ContactListHeading>Instagram</ContactListHeading>
            <ContactListLink
              href={`https://instagram.com/${result.instagram_username.text}`}
            >
              @{result.instagram_username.text}
            </ContactListLink>
          </ContactListItem>
        </ContactList>
      </ContactWrapper>
    </Layout>
  );
};

export default Contact;

const ContactWrapper = styled(motion.section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const ContactTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  max-width: 25ch;

  @media screen and (max-width: 700px) {
    & {
      font-size: 2rem;
    }
  }
`;

const ContactList = styled.ul`
  display: flex;
  flex-flow: row;
  padding: 0;
  list-style-type: none;
  font-family: 'IBM Plex Sans';

  @media screen and (max-width: 700px) {
    & {
      flex-direction: column;
    }
  }
`;

const ContactListItem = styled(motion.li)`
  width: 100%;
  margin-right: 2rem;

  @media screen and (max-width: 700px) {
    & {
      margin-top: 3rem;
    }
  }
`;

const ContactListLink = styled.a`
  color: inherit;
  font-size: 1.7rem;
  text-decoration: none;
  border-bottom: 1px solid currentColor;

  @media screen and (max-width: 700px) {
    & {
      font-size: 1.3rem;
    }
  }
`;

const ContactListHeading = styled.h2`
  font-size: 0.8rem;
  text-transform: uppercase;
`;
