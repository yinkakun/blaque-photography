import React from 'react';
import styled from 'styled-components';

const ImageGrid = () => {
  return <ImageGridWrapper></ImageGridWrapper>;
};

const ImageGridItem = ({ children }) => {
  return (
    <div>
      <figure>
        {children}
        <figcaption>Nature</figcaption>
      </figure>
    </div>
  );
};

const ImageGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
`;

export default ImageGrid;
